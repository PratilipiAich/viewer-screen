import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
 
};

class Navbar extends React.Component {
  render(){
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ marginTop: 0}}>
        <Toolbar  style={{ marginTop: 0 }}>
          <Button style={{ marginRight: 50 }} color="inherit" aria-labelledby="Live score" href = '/viewer/LiveScore'>LIVE SCORE</Button>
          <Button style={{ marginRight: 50 }} color="inherit" aria-labelledby="teams" href = '/viewer/Teams'>TEAMS</Button>
          <Button style={{ marginRight: 50 }} color="inherit" aria-labelledby="series" href = '/viewer/Series'>SERIES</Button>
          <Button style={{ marginRight: 50 }} color="inherit" aria-labelledby="upcoming fixtures" href = '/viewer/UpcomingFixtures'>UPCOMING FIXTURES</Button>
          <Button style={{ marginRight: 50 }} color="inherit" aria-labelledby="donate" href = 'https://www.samarthanam.org/donate/'>DONATE</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}
Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);