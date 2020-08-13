import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Container,Grid,Divider, CardActionArea} from '@material-ui/core/';
import axios from 'axios'

const styles = {
  card: {
    width: 400,
    backgroundColor : "#3f51b5",
    color : "white"
  },
 
};

class Teams extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            teams : []
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
        
        {this.state.teams.map((team) =>{
            return(  
            <Grid container spacing = {8}  alignItems="flex-start" justify = "center" direction = "direction-xs-row" alignContent = "flex-start">
            <Grid item xs = {4} sm = {6}>
            <Card className={classes.card} align = "center">
            <CardActionArea onClick={() => this.handleTeamPlayerDisplay(team.team_id)}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2" align = "center">
                  Team {team.tname}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
        </Grid>
        </Grid>

            )})}
           

           
          
    
        </Container>
        );
}
}
Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);