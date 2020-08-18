import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Container } from '@material-ui/core';
//import MatchSelectionService from "../service/MatchSelectionService"
import axios from 'axios'
import moment from 'moment';

const useStyles = theme => ({
  root: {
    width: 250,
    height: 225,   
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(4),
    
  },
  node: {
    display: "flex",
    float: "left"
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  typo:{
    variant:'h4',
    color:'textSecondary',
    align:'center',
  }

});

var date = new Date();
var todayDate = moment(date).format('YYYY-MM-DD')
var time = moment(date).format('HH:mm:ss')


/*function Message(props) 
{ 
    if (props.Ongoing) 
        return <h5>On Going Matches</h5>; 
    else
        return null; 
} 
*/

class LiveScore extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fixtures:[],
      Ongoing: false
      };

    }
   

    componentDidMount(){
      axios.get("http://localhost:8080/cricket-tournament/fixtures")
          .then(response => response.data)
          .then((data) => {
            this.setState({fixtures:data});
          });
    }

    handleSelect = e => {
       
      this.props.history.push(`/viewer/ScoreCard/${e}`)
      
  }
  render(){
    const {classes} = this.props;
    return (
      <Container>
       
    <Typography variant="h5" align="left" >Ongoing Match </Typography> 
        {this.state.fixtures.map((fixture) => {if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time<fixture.fixture_end_time) 
        {
        return(
         
          //alert(time,fixture.fixture_time);
          <div className={classes.node}>
               <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" color="primary" align="center">{fixture.team1} vs {fixture.team2}</Typography>
              <Divider />
              <Typography variant="body1" align="center" color="textSecondary">{fixture.description} at {fixture.venue} scheduled on {fixture.fixture_date} {fixture.fixture_start_time}</Typography>
              </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
            </CardActions>
            </Card>
            </div>
          );
        }
        {/*else{
          return(
            <Typography variant="h6">No live matches</Typography>
          );
        }*/}
  })}
      
  <br />
       
      <Typography variant="h5" align="left" >Past Matches</Typography> 
        
     {this.state.fixtures.map((fixture) => {if (moment(todayDate).isAfter(fixture.fixture_date)) 
        {
        
        return(
         
        <div className={classes.node}>
               
               <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" color="primary" align="center">{fixture.team1} vs {fixture.team2}</Typography>
              <Divider />
              <Typography variant="body1" align="center" color="textSecondary">{fixture.description} at {fixture.venue} scheduled on {fixture.fixture_date} {fixture.fixture_start_time}</Typography>
              </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
            </CardActions>
            </Card>
          
        </div>
            
        );
      }
     }
    )
  }
   {this.state.fixtures.map((fixture) =>{if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time>fixture.fixture_end_time) 
            { 
              return(<div className={classes.node}>
               
               <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" color="primary" align="center">{fixture.team1} vs {fixture.team2}</Typography>
              <Divider />
              <Typography variant="body1" align="center" color="textSecondary">{fixture.description} at {fixture.venue} scheduled on {fixture.fixture_date} {fixture.fixture_start_time}</Typography>
              </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
            </CardActions>
            </Card>
              
            </div>
             );
            }
           }
          )
        }
        

    </Container> 

  );
}
}

export default withStyles(useStyles)(LiveScore);



