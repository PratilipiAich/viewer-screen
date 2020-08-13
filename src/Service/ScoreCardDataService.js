import axios from 'axios'


const SCORECARD_API_URL = 'http://localhost:8080/cricket-tournament';
const PRE_MATCH_API_URL = 'http://localhost:8080/cricket-tournament'

class ScoreCardDataService {

        retrieveBatsmen(id) {
            return axios.get(`${SCORECARD_API_URL}/batsman-by-match/${id}`);
        }

        retrieveBowlers(id){
            return axios.get(`${SCORECARD_API_URL}/bowler-by-match/${id}`);
        }
        retrieveAllBatsmen() {
            return axios.get(`${SCORECARD_API_URL}/batsmen-by-match`);
        }
        retrieveAllBowlers() {
            return axios.get(`${SCORECARD_API_URL}/bowlers-by-match`);
        }
        getPreMatchData(id) {
            return axios.get(`${PRE_MATCH_API_URL}/pre-match/${id}`);
        }

        createBatsmanInAMatch(batsman){
            return axios.post(`${SCORECARD_API_URL}/batsman-by-match`,batsman);
        }

        updateBatsmanInAMatch(matchid, batsmanname, batsman) {
            return axios.put(`${SCORECARD_API_URL}/batsman-by-match/${matchid}/${batsmanname}`, batsman);
        }

        createBowlerInAMatch(bowler){
            return axios.post(`${SCORECARD_API_URL}/bowler-by-match`,bowler);
        }

        updateBowlerInAMatch(matchid, bowlername, bowler) {
            return axios.put(`${SCORECARD_API_URL}/bowler-by-match/${matchid}/${bowlername}`, bowler);
        }

        retrieveAllBatsmenInAMatch(matchid) {
            return axios.get(`${SCORECARD_API_URL}/batsman-by-match/${matchid}`);
        }
        retrieveAllBowlersInAMatch(matchid) {
            return axios.get(`${SCORECARD_API_URL}/bowler-by-match/${matchid}`);
        }

        retrieveBowlerByName(matchid,bowlername) {
            return axios.get(`${SCORECARD_API_URL}/bowler-by-match/${matchid}/${bowlername}`);
        }

	 createMatchResult(matchresult){
            return axios.post(`${SCORECARD_API_URL}/match-result`,matchresult);
        }

        updateMatchResult(matchid,matchresult) {
            return axios.put(`${SCORECARD_API_URL}/match-result/${matchid}`, matchresult);
        }

	retrieveMatchResult(matchid) {
            return axios.get(`${SCORECARD_API_URL}/match-result/${matchid}`);
        }
}

export default new ScoreCardDataService()