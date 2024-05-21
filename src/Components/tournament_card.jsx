import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function TournamentCard({team1,team2,matchcode,over}) {
  const t1 = team1;
  const t2 = team2;
  const id1 = matchcode;
  const overCount = over;


  const navigate = useNavigate();

  const [team, setTeam] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8802/teamwithcode/${t1}/${t2}`)
      .then((response) => {
        const list = response.data;
        // Construct team object with code and name
        const teamsData = list.map(team => ({
          code: team.team_code,
          name: team.team_name
        }));
        // Update the team state with the constructed team object
        setTeam(teamsData);
      })
      .catch((error) => console.error(error));
  }, [t1, t2]); // Include t1 and t2 in the dependency array to fetch data on component mount and when t1 or t2 change

  const redirect = () => {
    window.open(`/match/${t1}/${t2}/${id1}/${overCount}`);
  };

  // Find the corresponding team name based on team code
  const teamName1 = team.find(team => team.code === t1)?.name || "";
  const teamName2 = team.find(team => team.code === t2)?.name || "";

  return (
    <div>
      <a href="#" onClick={redirect} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <p className="text-center"> {teamName1} vs {teamName2} </p>
      </a>
    </div>
  );
}

export default TournamentCard;
