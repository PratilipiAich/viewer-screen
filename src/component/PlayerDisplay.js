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
import PlayerDataService from '../Service/PlayerDataService';
import ScoreCardDataService from '../Service/ScoreCardDataService';
import Male from '../assests/img_avatar.png';
import player from '../assests/player.png'; 
import player2 from '../assests/player2.png'; 

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: "white",
      color: "black",
    },
    body: {
        color:"blue",
      fontSize : 14,
    },
  }))(TableCell);

  const styles = theme => ({
   
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    width: 500,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
  },
 
  input: {
    display: 'none',
  },
});

class PlayerDisplay extends Component {

    constructor(props) {
        super(props)
        this.state = {
            player_id: this.props.match.params.id,
            teams:[],
            message: null,
            tname:"",
            first_name:'',
            last_name:'',
            player_initials:'',
            gender:'',
            player_dob:'',
            category:'',
            nationality:'',
            player_batting_style:'',
            player_bowling_style:'',
            player_role:'',
            player_status:'',
            Map1:new Map(),
            Map2:new Map(),
            list1:[],
            list2:[],
            list3:[],
            list4:[],
            list5:[],
            list6:[],
            list7:[],
            list8:[],
            batsmen:null,
            len1:0,
            len2:0,
            total_runs:0,
            highest_score:0,
            avg:0,
            s_r:0,
            total4:0,
            total6:0,
            total_balls:0,
            bowler_runs:0,
            bowler_wickets:0,
            econ:0

        }
        
        this.getTeamName=this.getTeamName.bind(this)
        this.getBattingStats=this.getBattingStats.bind(this)
        this.getBowlingStats=this.getBowlingStats.bind(this)
    }

    componentDidMount() {
        PlayerDataService.retrievePlayer(this.state.player_id)
        .then(response => this.setState({
            first_name: response.data.first_name,
            last_name:response.data.last_name,
            player_initials:response.data.player_initials,
            gender:response.data.gender,
            player_dob :response.data.player_dob,
            category:response.data.category,
            nationality:response.data.nationality,
            player_batting_style:response.data.player_batting_style,
            player_bowling_style :response.data.player_bowling_style,
            player_role :response.data.player_role,
            player_status :response.data.player_status,
            

        },()=>{
this.getBattingStats()
this.getBowlingStats()
;        }))
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

   
getBattingStats(){
ScoreCardDataService.retrieveAllBatsmen()
.then(
    response => {
        console.log(response);
        response.data.map((r)=>{
            if(r.batsman_name===(this.state.first_name+" "+this.state.last_name+" "+this.state.player_initials)){
                var list1=[]
                list1.push(r.runs)
                this.state.list2.push(r.runs)
                list1.push(r.strike_rate)
                this.state.list3.push(r.strike_rate)
                list1.push(r.fours)
                this.state.list4.push(r.fours)
                list1.push(r.sixes)
                this.state.list5.push(r.sixes)
                this.state.Map1.set(r.match_id,list1)
            }
            console.log(this.state.Map1)
            this.setState({len1:this.state.Map1.size})
            console.log(this.state.len1)
            console.log(this.state.list2)
            console.log(this.state.list3)
            console.log(this.state.list4)
            console.log(this.state.list5)
            var sum1=0
            this.state.list2.map((ele)=>{
                sum1=sum1+ele
            })
            this.setState({total_runs:sum1})
            this.state.list2.sort(function(a, b){return a-b});
            this.setState({highest_score:this.state.list2[this.state.list2.length-1]})
            this.setState({avg:sum1/this.state.list2.length})
            var sum2=0
            this.state.list3.map((ele)=>{
                sum2=sum2+ele
            })
            this.setState({s_r:sum2/this.state.list3.length})
            var sum3=0
            this.state.list4.map((ele)=>{
                sum3=sum3+ele
            })
            this.setState({total4:sum3})
            var sum4=0
            this.state.list5.map((ele)=>{
                sum4=sum4+ele
            })
            this.setState({total6:sum4})
        })
        
    }
)
}
getBowlingStats(){
    ScoreCardDataService.retrieveAllBowlers()
    .then(
        response => {
            console.log(response);
            response.data.map((r)=>{
                if(r.bowler_name===(this.state.first_name+" "+this.state.last_name+" "+this.state.player_initials)){
                    var list1=[]
                    list1.push(r.overs)
                    this.state.list6.push(r.overs)
                    list1.push(r.runs)
                    this.state.list7.push(r.runs)
                    list1.push(r.wickets)
                    this.state.list8.push(r.wickets)
                  
                    
                    this.state.Map2.set(r.match_id,list1)
                }
                console.log(this.state.Map2)
                this.setState({len2:this.state.Map2.size})
                console.log(this.state.len2)
                console.log(this.state.list6)
                console.log(this.state.list7)
                console.log(this.state.list8)
                
                var sum1=0
                this.state.list6.map((ele)=>{
                    sum1=sum1+ele
                })
                this.setState({total_balls:(sum1*6)})
               
                var sum2=0
                this.state.list7.map((ele)=>{
                    sum2=sum2+ele
                })
                this.setState({bowler_runs:sum2})
                var sum3=0
                this.state.list8.map((ele)=>{
                    sum3=sum3+ele
                })
                this.setState({bowler_wickets:sum3})
               console.log("sum2",sum2,"sum1",sum1)
                this.setState({econ:(sum2/sum1).toFixed(2)})
            })
            
        }
    )
    }
    
   


    render() {
        let teamID=this.state.team_id
        let teamname=this.state.tname

        const { classes } = this.props;
              
        return (
            <div>
                
                <center>
                <div className="PlayerDisplay">
                <Paper className={classes.root} style={{paddingLeft:"50px",marginBottom:"100px"}} >
               
                 <h2>{this.state.first_name} {this.state.last_name} {this.state.player_initials}</h2> 
                 <br/>
                
                 <div className="align_left">
                  Gender: <i className="change_font">{this.state.gender}</i><br/><br/>
                  Date of birth :<i className="change_font"> {this.state.player_dob}</i><br/><br/>
                  Nationality :<i className="change_font">  {this.state.nationality}</i> <br/><br/>
                  Category : <i className="change_font"> {this.state.category}</i><br/><br/>
                  Player batting style :<i className="change_font">  {this.state.player_batting_style}</i><br/><br/>
                  Player bowling style :<i className="change_font">  {this.state.player_bowling_style}</i><br/><br/>
                  Player role :<i className="change_font">  {this.state.player_role}</i><br/><br/>
                  
                </div>
                <div className="avatar_img">
                <img src={player2} alt="Avatar" className="avatar"></img>   
                </div>
                <br/><br/>
                <div className="stats">
                <h3>Batting Averages</h3>
                <Table className={classes.table}>
                <TableHead>
                <TableRow>
                <CustomTableCell align="center" tabIndex="0">Matches</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Total runs</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Highest Score</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Average runs</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">S/R</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">4s</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">6s</CustomTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                <CustomTableCell align="center" tabIndex="0">{this.state.len1}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.total_runs}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.highest_score}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.avg}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.s_r}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.total4}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.total6}</CustomTableCell>
                </TableRow>
                </TableBody>
            </Table>
            </div>
            <div className="stats">
                <h3>Bowling Averages</h3>
                <Table className={classes.table}>
                <TableHead>
                <TableRow>
                <CustomTableCell align="center" tabIndex="0">Matches</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Balls</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Runs</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Wickets</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">Econ</CustomTableCell>
               
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow>
                <CustomTableCell align="center" tabIndex="0">{this.state.len2}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.total_balls}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.bowler_runs}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{this.state.bowler_wickets}</CustomTableCell>
                <CustomTableCell align="center" tabIndex="0">{!isNaN(this.state.econ) && this.state.econ}</CustomTableCell>
                
                </TableRow>
                </TableBody>
            </Table>
            </div>
            <br/><br/>
                </Paper>
                </div>
                </center>
            
            </div>
        )
    }
    
}

PlayerDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(PlayerDisplay);
