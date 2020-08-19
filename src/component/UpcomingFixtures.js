import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
//import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
//import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider, Container } from '@material-ui/core';
import axios from 'axios'
import moment from 'moment';


const useStyles = theme => ({
  root: {
    width: 250,
    height: 250,
    backgroundColor : "#EDEEEE",
    marginLeft:100,
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


class UpcomingFixtures extends React.Component{
    constructor(props){
      super(props);
      this.state={
        fixtures:[]
      };
      

    }
   

    componentDidMount(){
      axios.get("http://localhost:8080/cricket-tournament/fixtures")
          .then(response => response.data)
          .then((data) => {
            this.setState({fixtures:data});
          });
    }
    
      
  
  render(){
    const {classes} = this.props;
    return (
      <Container>
        
        <Typography variant="h5" align="left" style={{marginTop:20, marginLeft: 80}} >Upcoming Match </Typography> 
        {this.state.fixtures.map((fixture) => {if (moment(todayDate).isBefore(fixture.fixture_date)) 
        {
        return(
         
          //alert(time,fixture.fixture_time);
          <div className={classes.node}>
              
              <Card className = {classes.root} variant="outlined">
              <CardContent>
              <Typography variant="h5" color="primary" align="center" style={{color: "black"}}>
                {fixture.team1} <br />

                <span style={{color: "red"}}> vs </span>
                 <br /> {fixture.team2}
                 <br /></Typography>
              <Divider />
              <Typography variant="body1" align="left" color="textSecondary" style={{fontSize: "15px"}}>{fixture.description} at {fixture.venue} scheduled on {fixture.fixture_date} {fixture.fixture_start_time}</Typography>
             </CardContent>
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

    </Container> 
  );
}
}


export default withStyles(useStyles)(UpcomingFixtures);
