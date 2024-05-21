import React, { useEffect, useState} from 'react';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Card from '../Components/tournament_card';
import { useParams } from 'react-router-dom';

function knockout(teams) {
  let matches = [];
  let matchcode = 1;

  // Make a copy of the teams array
  let shuffledTeams = teams.slice();

  // Shuffle the copied array
  shuffledTeams.sort(() => Math.random() - 0.5);

  while (shuffledTeams.length > 1) {
    let team1 = shuffledTeams.pop();
    let team2 = shuffledTeams.pop();

    let match = [team1, team2, matchcode];
    matches.push(match);

    matchcode++;
  }

  // If there's an odd number of teams, add the remaining team to a bye match
  if (shuffledTeams.length === 1) {
    let byeTeam = shuffledTeams[0];
    matches.push([byeTeam, null, `Bye-${matchcode}`]);
  }

  return matches;
}





function Tournament() {
  const { noOfOvers } = useParams(); 

  const [teams, Addteam] = useState([]);
  const [matches, setMatches] = useState([]);
  //sessionStorage.clear();
  useEffect(() => {
    const savedMatches = window.sessionStorage.getItem('matches');
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    } else {
      axios.get('http://localhost:8802/getteams').then((response) => {
        const teamCodes = response.data.map(team => team.team_code);
        console.log("teamcodes : ", teamCodes);
        Addteam(teamCodes);
      });
    }
  }, []);

  useEffect(() => {
    console.log(teams, matches)
    if (teams.length > 0 && matches.length === 0) {
      const generatedMatches = knockout([...teams]);
      console.log("generated matches : ", generatedMatches)
      setMatches(generatedMatches);
      // Save matches to localStorage
      window.sessionStorage.setItem('matches', JSON.stringify(generatedMatches));
    }
  }, [matches, teams]);
  console.log("teams : ", teams);
  return (
    <div>
      <Navbar />

      <div>
        <div>
          <h1>Matches</h1>
          {matches.map((match, index) => (
            <div key={index}>
              <Card team1={match[0]} team2={match[1]} matchcode={match[2]} over = {noOfOvers}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tournament;
