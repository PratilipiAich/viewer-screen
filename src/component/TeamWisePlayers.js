import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import '../PlayerDisplay.css';

import TeamDataService from '../Service/TeamDataService';

const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

const CustomTableCell = withStyles(theme => ({
    TableRow: {
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
      },
    head: {
      backgroundColor: "white",
      color: "black",
    },
    body: {
      fontSize : 14,
    },
  }))(TableCell);

  const styles = theme => ({
   
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table1: {
    width: 400,
    float:'left',
    marginBottom:"50px",
    marginLeft:"270px"
  },
  table2: {
    width: 400,
    float:'left',
    marginBottom:"50px",
    marginLeft:"170px"
  },
  row: {
    
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
  },
  button: {
    margin: theme.spacing.unit,
  },
 
  input: {
    display: 'none',
  },
 
});

class TeamWisePlayers extends Component {

    constructor(props) {
        super(props)
        this.state = {
            team_id: this.props.match.params.id,
            teamplayers: [],
            teams:[],
            message: null,
            tname:"",
            t_id:"",
            p_id:"",
            desc:"",
            count:0,
            first_half:[],
            second_half:[],
            x:0

        }
        
        this.refreshTeamPlayers = this.refreshTeamPlayers.bind(this)
        this.getTeamName=this.getTeamName.bind(this)
       
    }

    componentDidMount() {
        this.refreshTeamPlayers();
        this.getTeamName();
    }
    getTeamName(){
        TeamDataService.retrieveAllTeams()
        .then(
            response => {
                console.log(response);
                this.setState({ teams : response.data })
            }
        )
        

    }

    refreshTeamPlayers() {
        TeamDataService.retrieveAllTeamPlayers(this.state.team_id)
            .then(
                response => {
                    console.log(response);
                    this.setState({ teamplayers: response.data },()=>{
                        var l=this.state.teamplayers.length
                        var num=0
                        if(l %2 ===0){
                        num=l/2
                        }
                        else{
                        num=l/2+0.5
                        }
                        var i=1
                        this.state.teamplayers.map((tp)=>{
                            if(i<=num){
                                this.state.first_half.push(tp)
                                i=i+1
                            }
                            else{
                                this.state.second_half.push(tp)
                                i=i+1
                            }
                        })
                        this.setState({x:num})
                    })
                 
                    console.log(this.state.first_half)
                    console.log(this.state.second_half)
                }
            )
     



    }



    handleSelect = e => {
       
        this.props.history.push(`/viewer/Player/${e}`)
        
    }
   
   


    render() {
        let teamID=this.state.team_id
        let teamname=this.state.tname

        const { classes } = this.props;
              
        return (
            <div>
                
                {this.state.teams.map(team =>{
                    if(team.team_id==teamID){
                        teamname=team.tname
                        }
                }
                   
                )
                }
                <br/>
                <center>
                    <h2>Players in team {teamname}</h2>
                    <br/>
                   
                </center>
                <div className = "teamplayers">
                <center>
                <Paper className={classes.root}>
               
               
                    <div >
                    
            <Table className={classes.table1}>
                <TableHead>
                
                </TableHead>
                {
                this.state.first_half.map((tp,index)=>
                <TableBody>
                   
                    <TableRow  style ={ index % 2? { background : "#f2f2f2" }:{ background : "white" }}  className={classes.row} >
                   
                    <CustomTableCell align="center" tabIndex="0"  onClick={() => this.handleSelect(tp.player_id)}><button className="player_name_btn">{tp.player_first_name} {tp.player_last_name} {tp.player_initials}</button></CustomTableCell>
                  
                    </TableRow>
                     
                </TableBody>
                )}
            </Table>
            

<Table className={classes.table2}>
<TableHead>

</TableHead>
 {
                this.state.second_half.map((tp,index)=>
<TableBody>
   
    <TableRow  style ={ index % 2? { background : "#f2f2f2" }:{ background : "white" }}  className={classes.row} >
   
    <CustomTableCell align="center" tabIndex="0"  onClick={() => this.handleSelect(tp.player_id)}><button className="player_name_btn">{tp.player_first_name} {tp.player_last_name} {tp.player_initials}</button></CustomTableCell>
  
    </TableRow>
     
</TableBody>
                )}
</Table>

 
</div>
        <br/><br/>
        
            </Paper>
            </center>
                
                </div>
               
            </div>
        )
    }
    
}

TeamWisePlayers.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(TeamWisePlayers);

