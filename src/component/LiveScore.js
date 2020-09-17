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
   width: 300,
   height: 'auto',  
   backgroundColor : "#e3f2fd",
   color : "black", 
   //marginTop: theme.spacing(2),
   //marginRight: theme.spacing(2),
   //padding: theme.spacing(2),
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
    marginBottom: "auto",
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
        Ongoing:[],

      };

    }
   

    componentDidMount(){
      axios.get("http://localhost:8080/cricket-tournament/fixtures")
          .then(response => response.data)
          .then((data) => {
            this.setState({fixtures:data});
            var live = []
            data.map((fixture) => {if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time<fixture.fixture_end_time)
                {
                  live.push(fixture)
                }
            }
            );
            this.setState({Ongoing: live})
            console.log(this.state.Ongoing)
            console.log("this is Ongoing")
          }
          );
    }

    handleSelect = e => {
       
      this.props.history.push(`/viewer/ScoreCard/${e}`)
      
  }
  render(){
    const {classes} = this.props;
    return (
      <Container >
        {this.state.Ongoing.length>0 && <Typography variant="h5" style={{marginTop:40, marginLeft: 120}} >Ongoing Matches </Typography>}
          
        {this.state.fixtures.map((fixture) => {if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time<fixture.fixture_end_time) 
       {
        return(
        //alert(time,fixture.fixture_time);
        <div style={{marginLeft: 100, marginRight: 5}}>
          
         
        
         <Card className = {classes.root} variant="outlined" variant="elevation" elevation={5}>
              <CardContent>
              <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                {fixture.team1} <br />
               <span style={{color: "red"}}> vs </span>
                 <br /> {fixture.team2}
                 <br /></Typography>
              <Divider />
              <Typography variant="body1" align="center"  style={{fontSize: "14px"}}><b>{fixture.description}</b> at <b>{fixture.venue}</b> <br /> scheduled on <b>{fixture.fixture_date} {fixture.fixture_start_time}</b></Typography>
             </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" style={{margin:'auto'}} onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
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
      <Typography variant="h5" style={{marginTop:20, marginLeft: 120}}>Past Matches</Typography> 
        
     {this.state.fixtures.map((fixture) => {if (moment(todayDate).isAfter(fixture.fixture_date)) 
        {
        
        return(
          <div style={{marginLeft: 100}}>
          <div className={classes.node}>
          
               <Card className = {classes.root} variant="outlined" variant="elevation" elevation={5}>
              <CardContent>
              <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                {fixture.team1} <br />
                <span style={{color: "red"}}> vs </span>
                 <br /> {fixture.team2}
                 <br /></Typography>
              <Divider />
              <Typography variant="body1" align="center" style={{fontSize: "14px"}}><b>{fixture.description}</b> at <b>{fixture.venue}</b> <br />scheduled on <b>{fixture.fixture_date} {fixture.fixture_start_time}</b></Typography>
             </CardContent>
            <Divider />
            <CardActions>
            <Button variant="contained" color="primary" style={{margin:'auto'}} onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
            </CardActions>
            </Card>
        </div>
        </div>
        );
      }
     }
    )
  }
   {this.state.fixtures.map((fixture) =>{if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time>fixture.fixture_end_time) 
            { 
              return(
                <div style={{marginLeft: 100}}>
                <div className={classes.node}>
                     <Card className = {classes.root} variant="outlined" variant="elevation" elevation={5}>
                    <CardContent>
                    <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                      {fixture.team1} <br />
      
                      <span style={{color: "red"}}> vs </span>
                       <br /> {fixture.team2}
                       <br /></Typography>
                    <Divider />
                    <Typography variant="body1" align="center" style={{fontSize: "14px"}}><b>{fixture.description}</b> at <b>{fixture.venue}</b> <br />scheduled on <b>{fixture.fixture_date} {fixture.fixture_start_time}</b></Typography>
                   </CardContent>
                  <Divider />
                  <CardActions>
                  <Button variant="contained" color="primary" style={{margin:'auto'}} onClick={() => this.handleSelect(fixture.fixture_id)}>View ScoreCard</Button>
                  </CardActions>
                  </Card>

              </div>
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
