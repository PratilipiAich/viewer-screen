import axios from 'axios';
import React from 'react'

const FIXTURE_API_URL="http://8080/cricket-tournament"

class MatchSelectionService extends React.Component{

    retrievefixturebyid(id){
        return axios.get(`${FIXTURE_API_URL}/fixture/${id}`);
    }
    
    retrieveAllFixtures(){
        return axios.get(`${FIXTURE_API_URL}/fixtures`)
    }
}

export default new MatchSelectionService()