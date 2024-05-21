import React, { useRef, useState } from 'react'
import Navbar from '../Components/Navbar'
import Team from '../Components/Team_name_form'
import { Link } from 'react-router-dom'
import Match from '../Pages/Match'

function New_tournament() {
    const [teamDetails, setTeamDetails] = useState({
        teamCount: 0,
        playerCount: 0,
        overCount: 0
    })

    const [teamCount, setTeamCount] = useState(0);
    const playerref = useRef();
    const countref = useRef();
    const overref = useRef();
    const [noOfOvers,setNoOfOvers] = useState(0);




    const handleSubmit = (e) => {
        e.preventDefault()
        const validationErrors = {}
        if (teamDetails.teamCount < 2) {
            validationErrors.teamcount = "Enter team count greater than 2 "
        }

        if (teamDetails.overCount == 0) {
            validationErrors.overcount = "\nMinimum over count is 1"
        }

        if (teamDetails.playerCount < 3) {
            validationErrors.playercount = "\nPlayer count must be greater than 3"
        }

        let objectlength = Object.keys(validationErrors).length


        if (objectlength == 0) {
            handleCreate()
        }
        else {
            alert(Object.values(validationErrors))
        }

        document.getElementById("next_button").hidden = false;
        const a = parseInt(overref.current.value);
        setNoOfOvers(a);
       
        

    }

    const handleCreate = () => {

        event.preventDefault();

        const teaminput = parseInt(playerref.current.value)
        setTeamCount(teaminput);

        
    }
    const renderInput = () => {
        try {
            const pc = parseInt(countref.current.value);
            
          
            const ibox = [];
            for (let i = 1; i <= teamCount; i++) {
                ibox.push(
                    <fieldset className='border mb-5 p-5'>
                        <legend>Team : {i}</legend>
                        <Team key={i} id={i} nop={pc} />
                    </fieldset>
                )
            }
            return ibox;

        } catch (error) {

        }

    }


    return (
        <div className='px-20'>
            <Navbar />
            <div>
                <form>
                    <div class="grid gap-6 mb-6 md:grid-cols-2 items-center">
                        <div>
                            <label htmlFor="teams" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No of Teams</label>
                            <input onChange={(e) => {
                                setTeamDetails({
                                    ...teamDetails, teamCount: e.target.value
                                })
                            }} ref={playerref} type="number" id="teams" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                        </div>
                        <div>
                            <label htmlFor="players" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No of Players</label>
                            <input onChange={
                                (e) => {
                                    setTeamDetails({
                                        ...teamDetails, playerCount: e.target.value
                                    })
                                }
                            } ref={countref} type="number" id="players" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                        </div><div>
                            <label htmlFor="overs" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">No of Overs</label>
                            <input onChange={(e) => {
                                setTeamDetails({
                                    teamDetails, overCount: e.target.value
                                })
                            }} type="number" ref={overref} id="overs" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" />
                        </div>
                    </div>
                    <button onClick={handleSubmit} type='submit' class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
                <br />

                <div>
                    {renderInput()}
                </div>
            </div>
         
            <Link to = {`/tournament/${noOfOvers}`}   >
                <button type='submit' id = 'next_button' hidden = {true} class="text-white bg-lime-500 hover:bg-lime-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Next</button>
            </Link>


        </div>

    )
}

export default New_tournament