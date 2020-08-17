import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Container,Grid,Divider, CardActionArea} from '@material-ui/core/';
import axios from 'axios';





const styles = {
  card: {
    width: 385,
    backgroundColor : "#e3f2fd",
    color : "black"
  },
  media: {
    objectFit: 'cover',
},
   node : {
       display : "flex",
       float : "left",
      
   },
//   
};

class Teams extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            teams : [],
            flag_image : null
        };
    }

    componentDidMount(){
        axios.get("http://localhost:8080/cricket-tournament/teams")
        .then(response => response.data)
        .then((data) => {
            this.setState({teams : data })
        })

    }

    handleTeamPlayerDisplay = (id)=>{
        this.props.history.push(`/viewer/TeamWisePlayers/${id}`)
    }

render(){
  const { classes } = this.props;
  return (
        <Container align = "center">
        <Typography  aria-labelledby = "Teams" align = "center" gutterBottom variant="h5" component="h1" style={{marginTop : 50}}>TEAMS</Typography>
        <Divider/>
        <br></br>
        <br></br>
        <Grid container spacing = {4} >
        {this.state.teams.map((team) =>{
         //  if(team.tname === "Australia"){
            return( 
                <Grid item> 
            <div className={classes.node}>
            <Card className={classes.card} align = "center">
            <CardActionArea onClick={() => this.handleTeamPlayerDisplay(team.team_id)}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align = "center">
                  Team {team.tname}
                </Typography>
                <Typography align = "center">{team.tcountry}</Typography>
            
                </CardContent>
            </CardActionArea>
            </Card>
      </div>
      </Grid>
         ) })}
         </Grid>
        
           
           
       
    
        </Container>
        );
}
}
Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);