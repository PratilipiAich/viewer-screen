import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Container } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import {Grid} from '@material-ui/core/';

const useStyles = theme => ({
  root: {
   width: 225,
   height: 250,  
   backgroundColor : "#EDEEEE",
   color : "black", 
   marginTop: theme.spacing(2),
   //marginRight: theme.spacing(2),
   padding: theme.spacing(2),
  },
  node: {
    padding: theme.spacing(2),
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


class LiveScore extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fixtures:[],
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
      <Container style={{marginLeft: 100, marginRight: 100}}>
               
        {this.state.fixtures.map((fixture) => {if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time<fixture.fixture_end_time) 
       {
        return(
        //alert(time,fixture.fixture_time);
        <Grid container spacing = {4} >
           <Grid item >     
           <Typography variant="h5" style={{marginTop:20}} >Ongoing Match </Typography>
          <div className={classes.node}>
            
               <br />
               <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                {fixture.team1} <br />
               <span style={{color: "red"}}> vs </span>
                 <br /> {fixture.team2}
                 <br /></Typography>
              <Divider />
              <Typography variant="body1" align="left"  style={{fontSize: "14px"}}>{fixture.description} at {fixture.venue}<br /> scheduled on {fixture.fixture_date}, {fixture.fixture_start_time}</Typography>
             </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
            </CardActions>
            </Card>
        </div>
        </Grid>
        </Grid>
          );
        }
        {/*else{
          return(
            <Typography variant="h6">No live matches</Typography>
          );
        }*/}
  })}
      <br />
      <br />
      <Typography variant="h5" style={{marginTop:20}}>Past Matches</Typography> 
        
     {this.state.fixtures.map((fixture) => {if (moment(todayDate).isAfter(fixture.fixture_date)) 
        {
        
        return(
          <div className={classes.node}>
          <Grid container spacing = {4} >
          <Grid item > 
      
               <br />
               <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                {fixture.team1} <br />

                <span style={{color: "red"}}> vs </span>
                 <br /> {fixture.team2}
                 <br /></Typography>
              <Divider />
              <Typography variant="body1" align="left" style={{fontSize: "14px"}}>{fixture.description} at {fixture.venue} <br />scheduled on {fixture.fixture_date} {fixture.fixture_start_time}</Typography>
             </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
            </CardActions>
            </Card>
       
        </Grid>
        </Grid>
        </div>
        );
      }
     }
    )
  }
   {this.state.fixtures.map((fixture) =>{if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time>fixture.fixture_end_time) 
            { 
              return(
                <div className={classes.node}>
                <Grid container spacing = {4} >
                <Grid item > 
            
                     <br />
                     <Card className = {classes.root} variant="outlined">
                    <CardContent>
                    <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                      {fixture.team1} <br />
      
                      <span style={{color: "red"}}> vs </span>
                       <br /> {fixture.team2}
                       <br /></Typography>
                    <Divider />
                    <Typography variant="body1" align="left" style={{fontSize: "14px"}}>{fixture.description} at {fixture.venue} <br />scheduled on {fixture.fixture_date} {fixture.fixture_start_time}</Typography>
                   </CardContent>
                  <Divider />
                  <CardActions>
                  <Button variant="contained" color="primary" onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
                  </CardActions>
                  </Card>
             
              </Grid>
              </Grid>
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