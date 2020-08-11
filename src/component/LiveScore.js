import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { Container } from "@material-ui/core";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

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

class SimpleTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Live Score"   
            aria-labelledby = "Live Score"
            aria-required="true" />
            <Tab label="Teams" />
            <Tab label="Series" />
            <Tab label="Upcoming Fixtures" />
            <AccessibilityIcon fontSize="large"/>
          </Tabs>
        </AppBar>
        
          <Container>
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
                      ScoreCard
                    </Button>
                  
                </CardActions>
              </Card>
            </Container>
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
                      ScoreCard
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
                      ScoreCard
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
                      ScoreCard
                    </Button>
                  </center>
                </CardActions>
              </Card>
            </Container>
          </Container>
     
      
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleTabs);
