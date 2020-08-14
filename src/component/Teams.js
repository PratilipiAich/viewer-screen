import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from "@material-ui/core/CardMedia";
import Typography from '@material-ui/core/Typography';
import {Container,Grid,Divider, CardActionArea} from '@material-ui/core/';
import axios from 'axios';
import Australia from '../assests/Flags/australia.jpg'
import India from '../assests/Flags/Indian.png'

const styles = {
  card: {
    width: 200,
    backgroundColor : "#e3f2fd",
    color : "black"
  },
  node: {
    display: "flex",
    float: "left",
  },
  media: {
    objectFit: 'cover',
},
 
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
        <Container align = "center" >
        <Typography  aria-labelledby = "Teams" align = "center" gutterBottom variant="h5" component="h1" style={{marginTop : 50}}>TEAMS</Typography>
        <Divider/>
        <br></br>
        <br></br>
        <Container align = "center" className={classes.node} >
        {this.state.teams.map((team) =>{
           if(team.tname === "Australia"){
            return(  
            <Grid container spacing = {8}  alignItems="flex-start" justify = "center" direction = "direction-xs-row" alignContent = "flex-start">
            <Grid item xs = {4} sm = {6}>
            
            <Card className={classes.card} align = "center">
            <CardActionArea onClick={() => this.handleTeamPlayerDisplay(team.team_id)}>
                <CardContent>
                <CardMedia
                component="img"
                className={classes.media}
                height="200"
                image= {Australia}
                aria-label = "Team Australia"
                 />
                <Typography gutterBottom variant="h5" component="h2" align = "center">
                  Team {team.tname}
                </Typography>
                </CardContent>
            </CardActionArea>
            </Card>
      
        </Grid>
        </Grid>
            )}
            if(team.tname === "India"){
                console.log(team)
                return(  
                <Grid container spacing = {8}  alignItems="flex-start" justify = "center" direction = "direction-xs-row" alignContent = "flex-start">
                <Grid item xs = {4} sm = {6}>
                
                <Card className={classes.card} align = "center">
                <CardActionArea onClick={() => this.handleTeamPlayerDisplay(team.team_id)}>
                    <CardContent>
                    <CardMedia
                    component="img"
                    className={classes.media}
                    height="200"
                    image= {India}
                    aria-label = "Team India"
                     />
                    <Typography gutterBottom variant="h5" component="h2" align = "center">
                      Team {team.tname}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
          
            </Grid>
            </Grid>
                )}
            else{
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
                    )
            }
        
        
        })}
           

           
           </Container>
    
        </Container>
        );
}
}
Teams.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Teams);