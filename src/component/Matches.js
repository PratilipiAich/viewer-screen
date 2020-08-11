import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Container } from "@material-ui/core";
import axios from 'axios'
import moment from 'moment';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  node: {
    width: 300,
    height: "auto",
    marginLeft: 100,
    marginTop: 20
  },
  stem: {
    display: "flex",
    float: "right"
  }
});

var date = new Date();
var todayDate = moment(date).format('YYYY-MM-DD')

var time = moment(date).format('hh:mm:ss')

class Matches extends React.Component {
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
  
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    {this.state.fixtures.map((fixture) => {if (moment(todayDate).isSame(fixture.fixture_date) && time>fixture.fixture_start_time && time<fixture.fixture_end_time) 
      {
    return (
      
      <div className={classes.root}>
        
        
         
            <Typography
              variant="h5"
              align="left"
              style={{ marginTop: 20, marginLeft: 80 }}
            >
              ONGOING MATCHES
            </Typography>
            <Container>
              <Card className={classes.node} variant="outlined">
                <CardContent>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team1 Vs Team2
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Series Name
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Venue
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Time
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                
                    <Button variant="contained" color="primary">
                    View ScoreCard
                    </Button>
                  
                </CardActions>
              </Card>
            </Container>
            </div>
        }
      }
      {this.state.fixtures.map((fixture) => {if (moment(todayDate).isAfter(fixture.fixture_date)) 
        {
        return(
          <div>
            <Typography
              variant="h5"
              align="left"
              style={{ marginTop: 20, marginLeft: 80 }}
            >
              PAST MATCHES
            </Typography>
            <Container className={classes.stem}>
              <Card className={classes.node} variant="outlined">
                <CardContent>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team1 Vs Team2
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Series Name
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team1 won by X runs
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <center>
                    <Button variant="contained" color="primary" >
                      View ScoreCard
                    </Button>
                  </center>
                </CardActions>
              </Card>
              <Card className={classes.node} variant="outlined">
                <CardContent>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team1 Vs Team2
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Series Name
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team2 won by X Wickets
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  
                    <Button variant="contained" color="primary">
                    View ScoreCard
                    </Button>
                  
                </CardActions>
              </Card>
              <Card className={classes.node} variant="outlined">
                <CardContent>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team1 Vs Team2
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Series Name
                  </Typography>
                  <Typography variant="body1" color="textSecondary" align="left">
                    Team2 won by X Wickets
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <center>
                    <Button variant="contained" color="primary">
                    View ScoreCard
                    </Button>
                  </center>
                </CardActions>
              </Card>
            </Container>
        
      
        
      </div>
        }}
    );
  }
}



export default withStyles(styles)(Matches);
