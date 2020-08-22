import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Router, Link, Redirect } from 'react-router-dom';

const useStyles = theme => ( {
  roots: {
    flexGrow: 1,
  },
  });
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}


class Navbar extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };
 

  render(){

  const { classes } = this.props;
  const { value } = this.state;

  return (
    <div className={classes.roots}>
     <AppBar position="static" style={{marginTop:0}}>
          <Tabs value={value} onChange={this.handleChange}>
          <Tab label="live score" />
           <Tab label="teams" />
            <Tab  label="upcoming fixtures" />
            <Tab label="donate" href = "https://www.samarthanam.org/donate/" target = "_blank" />
          </Tabs>
        </AppBar>
        {value === 0 && <Redirect to = "/viewer/LiveScore" />}
        {value === 1 && <Redirect to = "/viewer/Teams" />}
        {value === 2 && <Redirect to = "/viewer/UpcomingFixtures" />}
        {value === 3 && <Redirect to = 'https://www.samarthanam.org/donate/'/>}
    </div>
  );
}
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(Navbar);