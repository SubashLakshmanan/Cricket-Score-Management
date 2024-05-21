import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Match() {
    let selectedRun = 0;

    const { t1, t2, id1, over } = useParams();
    const [totalScore, setTotalScore] = useState(0);
    const [ballNo, setBallNo] = useState(1);
    const [overNo, setOverNo] = useState(1);
    const [wickets, setWickets] = useState(0);
    const [playingTeam, setPlayingTeam] = useState(t1);
    const [innings, setInnings] = useState(1);
    const [players, setPlayers] = useState([]);
    const [array, setArray] = useState({
        t1: "",
        t2: ""
    });
    
    const [playerList, setPlayerList] = useState({
        id : 0,
        name : ""
    });

    const [playerIdList, setPlayerIdList] = useState([])
    const [currentPlayers, setCurrentPlayers] = useState({
        striker: "",
        non_striker: "",
    })



    //fetching team names
    useEffect(() => {
        axios.get(`http://localhost:8803/getteams/${t1}/${t2}`)
            .then((response) => {
                const team1 = response.data[0].team_name;
                const team2 = response.data[1].team_name;

                setArray({
                    t1: team1,
                    t2: team2
                });
            })
            .catch((err) => console.error(err));
    }, [t1, t2]);

    //fetching players of team 
    useEffect(() => {
        axios.get('http://localhost:8803/player_details/' + playingTeam)
            .then((response) => {
                //console.log(response.data.data);
                const newdata = response.data.data;
                setPlayers(newdata);
            })
        //console.log(players);
    }, [innings])

    //update players into list
    useEffect(() => {
        let dummyList = [];
        if (players.length) {
            for (var i = 0; i < players.length; i++) {
                playerList[(players[i].player_id)] = players[i].player_name;
                setPlayerList({...playerList,id : players[i].player_id});
                setPlayerList({...playerList,id : players[i].player_id});
                dummyList.push(players[i].player_id);
            }
        }
        if (dummyList.length) {
            setPlayerIdList(dummyList);
            const x = dummyList.pop();
            const y = dummyList.pop();
            setCurrentPlayers({ striker: x, non_striker: y });

        }
    }, [players])

    console.log(players);




    const wicketOut = () => {
        setWickets(wickets + 1);
        console.log("wicket");
    }

    const handleRunChange = (run) => {
        selectedRun = run;
        if (selectedRun == 'wd') {
            var getSelectedValue = document.querySelector('input[name ="default-radio-2"]:checked').value;
            if (getSelectedValue === 'wd+') {
                const value = document.getElementById('extra-1').value;
                if (!(value >= 1 && value <= 6)) {
                    alert("Enter valid run");
                }
                else {
                    setTotalScore(totalScore + parseInt(value));
                }
            }
            else {
                wicketOut();
            }
        }
        if (selectedRun == 'w') { wicketOut(); }
        if (selectedRun == 'nb') {
            var getSelectedValue = document.querySelector('input[name ="default-radio-3"]:checked').value;
            console.log('value :', getSelectedValue);
            if (getSelectedValue == 'nb+') {
                const value = document.getElementById('extra-2').value;
                if (!(value >= 1 && value <= 6)) {
                    alert("Enter valid run");
                }
                else {
                    setTotalScore(totalScore + parseInt(value));
                }
            }
            else {
                wicketOut();
            }
        }
        if (!(selectedRun === 'wd' || selectedRun === 'w' || selectedRun === 'nb')) {
            //console.log(selectedRun);
            setTotalScore(totalScore + parseInt(selectedRun));;

            document.getElementById("no-ball").hidden = true;
            document.getElementById("wide-ball").hidden = true;
        }
    };

    const changeHidden = (event) => {
        const check = event.target.value;
        //console.log(check);
        if (check === "wd+") {
            document.getElementById("WD+").hidden = false;
        }
        if (check === "wd+w") {
            document.getElementById("WD+").hidden = true;
        }
        if (check === "nb+") {
            document.getElementById("NB+").hidden = false;
        }
        if (check === "nb+w") {
            document.getElementById("NB+").hidden = true;
        }

    }

    const checkfornotrun = (event) => {
        const selected = event.target.value;
        //console.log(selected);
        if (selected === 'wd') {
            document.getElementById("no-ball").hidden = true;
            document.getElementById("wide-ball").hidden = false;
            setTotalScore(totalScore + 1);

        }
        if (selected === 'nb') {
            document.getElementById("wide-ball").hidden = true;
            document.getElementById("no-ball").hidden = false;
            setTotalScore(totalScore + 1);
        }
        if (selected === 'w') {
            document.getElementById("no-ball").hidden = true;
            document.getElementById("wide-ball").hidden = true;
        }

    }

    const goNextBall = () => {
        event.preventDefault();
        if (ballNo === 6) {
            setBallNo(1);
            setOverNo(overNo + 1);
            var getSelectedValue = document.querySelector('input[name ="default-radio"]:checked');
            if (getSelectedValue === null) {
                alert("Please select a value")
            }
            else {
                var run = (getSelectedValue.value);
                //console.log(run);
                handleRunChange(run);
            }

        }
        else {
            var getSelectedValue = document.querySelector('input[name ="default-radio"]:checked');
            if (getSelectedValue === null) {
                alert("Please select a value")
            }
            else {
                var run = (getSelectedValue.value);
                handleRunChange(run);
                setBallNo(ballNo + 1);
            }
        }
    }




    return (
        <div className="pt-10 flex-col justify-center items-center">
            <div className="flex justify-between px-10 mb-3 mx-110">
                <div>

                    <a className="flex items-center justify-center max-w-sm w-40 h-24 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{array.t1} <span className="font-normal">versus</span> {array.t2}</h5>

                    </a>

                </div>

                <a className="flex  items-center justify-center max-w-sm w-64 h-24 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Match {id1} <span className="font-normal font">INNINGS {innings}</span></h5>
                </a>



                <div>

                    <a className="flex flex-col items-center justify-center max-w-sm w-40 h-24 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="text-center font-normal text-gray-700 dark:text-gray-400">Score</p>
                        <h5 className="text-center mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{totalScore}-{wickets}</h5>
                    </a>


                </div>
            </div>
            <div className="flex justify-center gap-10 px-10 mb-3">
                <div id="enter_form">
                    <form className="max-w-sm w-full  p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <div className='flex justify-between'>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ball No.</label>
                                <p className="font-bold" id='ball_no_display'>{ballNo}</p>
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Over No.</label>
                                <p className="font-bold" id='ball_no_display'>{overNo}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4" id="run">
                            {["0", "1", "2", "3", "4", "6", "wd", "w", "nb"].map((value, index) => (
                                <div key={index} id='runs' className="mb-4 pr-2">
                                    <input
                                        id={`default-radio-${value}`}
                                        type="radio"
                                        value={value}
                                        name="default-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        onChange={checkfornotrun}
                                    />
                                    <label htmlFor={`default-radio-${value}`} className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{value.toUpperCase()}</label>
                                </div>
                            ))}
                        </div>


                        <div id="wide-ball" hidden={true}>

                            <a className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <div className="mb-4 pr-2 ">
                                    <input onChange={changeHidden} id="wide-run" type="radio" value="wd+" name="default-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WD+</label>
                                    <div id="WD+" hidden={true}>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customize</label>
                                        <input type="number" id="extra-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter runs" required />
                                    </div>
                                </div>

                                <div className="mb-4 pr-2 ">
                                    <input onChange={changeHidden} id="wide-run" type="radio" value="wd+w" name="default-radio-2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">WD+W</label>
                                </div>

                            </a>

                        </div>

                        <div id="no-ball" hidden={true}>

                            <a className="block max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <div className="mb-4 pr-2 ">
                                    <input onChange={changeHidden} id="default-radio-2" type="radio" value="nb+" name="default-radio-3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">NB+</label>
                                    <div id="NB+" hidden={true}>
                                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Customize</label>
                                        <input type="number" id="extra-2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter runs" required />
                                    </div>
                                </div>

                                <div className="mb-4 pr-2 ">
                                    <input onChange={changeHidden} id="default-radio-2" type="radio" value="nb+w" name="default-radio-3" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-transparent dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label htmlFor="default-radio-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">NB+W</label>
                                </div>

                            </a>

                        </div>


                        <button type="submit" onClick={goNextBall} className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next Ball</button>
                    </form>
                </div>
                <div id="Score_table">
                    <div className="relative overflow-y-auto shadow-md sm:rounded-lg max-h-96">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Player Id</th>
                                    <th scope="col" className="px-6 py-3">Player Name</th>
                                    <th scope="col" className="px-6 py-3">Runs</th>
                                    <th scope="col" className="px-6 py-3">Balls</th>
                                    <th scope="col" className="px-6 py-3">Strike Rate</th>

                                </tr>
                            </thead>
                            <tbody>

                                {
                                    players.map((p) => {
                                        return (
                                            <tr key={p.player_id}>
                                                <td className="px-6 py-4">{p.player_id}</td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {p.player_name}
                                                </th>
                                                <td className="px-6 py-4">0</td>
                                                <td className="px-6 py-4">{ballNo}</td>
                                                <td className='px-6 py-4'>0.0</td>

                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>




                </div>
            </div>
            <div className="flex justify-center px-10 gap-5">

                <div>
                    <a href="#" className="block max-w-sm p-6 w-64 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-gray-700 dark:text-gray-400">Batsman -1</p>
                        <div className='flex justify-between'>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{currentPlayers.striker}</h5>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ABC</h5>
                        </div>

                    </a>
                </div>

                <div>
                    <a href="#" className="block max-w-sm p-6 w-64 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-gray-700 dark:text-gray-400">Batsman - 2</p>
                        <div className='flex justify-between'>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{currentPlayers.non_striker}</h5>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">ABC</h5>
                        </div>
                    </a>
                </div>

                <div>
                    <a href="#" className="block max-w-sm p-6 w-64 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <p className="font-normal text-gray-700 dark:text-gray-400">Bowler</p>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">PQR</h5>
                    </a>
                </div>

            </div>
            <div className="flex justify-center mt-10">
                <button type='submit' id='next_button' className="text-white bg-lime-500 hover:bg-lime-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Next Innings </button>
            </div>


        </div>
    )
}

export default Match