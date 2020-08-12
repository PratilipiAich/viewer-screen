import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Container } from '@material-ui/core';
//import MatchSelectionService from "../service/MatchSelectionService"
import Clock from './Clock';
import axios from 'axios'
import moment from 'moment';
//import Pagination from '@material-ui/lab/Pagination';


const useStyles = theme => ({
  root: {
    width: 400,
    height:'auto',
    marginLeft:100,
    marginTop:20,
    '& > *': {
      marginTop: theme.spacing(2),
    },
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

var time = moment(date).format('hh:mm:ss')


class LiveScore extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fixtures:[]
      };
      this.PrematchScreenClicked = this.PrematchScreenClicked.bind(this)

    }
   

    componentDidMount(){
      axios.get("http://localhost:8080/cricket-tournament/fixtures")
          .then(response => response.data)
          .then((data) => {
            this.setState({fixtures:data});
          });
    }
    PrematchScreenClicked(id) {
      this.props.history.push(`/scorer/PreMatch/${id}`)
  }

  render(){
    const {classes} = this.props;
    return (
      <Container>
       
        <Typography variant="h5" align="left" style={{marginTop:20,marginLeft:80}} >Ongoing Match {time}</Typography> 
        {this.state.fixtures.map((fixture) => {if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time<fixture.fixture_end_time) 
        {
        return(
          //alert(time,fixture.fixture_time);
              <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" align="center" color="primary">{fixture.team1} vs {fixture.team2}</Typography>
              <Divider />
              <Typography variant="body1" align="center" color="textSecondary"> {fixture.description} </Typography>
              <Typography variant="body1" align="left" color="textSecondary">Series: {fixture.series_name}  </Typography>
              <Typography variant="body1" align="left" color="textSecondary">Venue: {fixture.venue}  </Typography>
              <Typography variant="body1" align="left" color="textSecondary">Date: {fixture.fixture_date}</Typography>
              <Typography variant="body1" align="left" color="textSecondary">Time: {fixture.fixture_start_time}</Typography>
              
               </CardContent>
            <Divider />
            <CardActions>
              <Button variant="contained" color="primary" >View ScoreCard</Button>
            </CardActions>
            </Card>
          );
        }
        {/*else{
          return(
            <Typography variant="h6">No live matches</Typography>
          );
        }*/}
  })}
      
  
        <Typography variant="h5" align="left" style={{marginTop:20,marginLeft:80}} >Past Matches</Typography> 
        
     {this.state.fixtures.map((fixture) => {if (moment(todayDate).isAfter(fixture.fixture_date)) 
        {
        return(
        
        <Grid container spacing={6} direction="row" justify="flex-start" alignItems="flex-start">
          <Grid item >
            <Card className={classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" align="center" color="primary">{fixture.team1} vs {fixture.team2}</Typography>
              <Divider />
              <Typography variant="body1" align="center" color="textSecondary"> {fixture.description} </Typography>
              <Typography variant="body1" align="left" color="textSecondary">Series: {fixture.series_name}  </Typography>
              <Typography variant="body1" align="left" color="textSecondary">Venue: {fixture.venue}  </Typography>
              <Typography variant="body1" align="left" color="textSecondary">Date: {fixture.fixture_date}</Typography>
              <Typography variant="body1" align="left" color="textSecondary">Time: {fixture.fixture_start_time}</Typography>
              </CardContent>
            <Divider />
            <CardActions>
              <Button variant="contained" color="primary">View ScoreCard</Button>
            </CardActions>
            </Card>
          </Grid>
        </Grid>
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