import React, { useState } from 'react'
import {Link} from 'react-router-dom'


function team({id,nop}) {
    const [name,setName] = useState("")
    
    const checkEmpty = () =>{
        if (!name.trim()){
            alert("Please enter a team name");
        }
        else{
            window.open(`/players/${id}/${nop}/${name}`,'_blank')
            
        }
    }

    return (
        <div>
            <div></div>
            <form>
                <div>
                    <label htmlFor="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Team Name</label>
                    <input onChange={(e) =>{
                        setName(e.target.value);
                    }} type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"  />
                </div>
                <br />
                
               
                <a onClick ={checkEmpty} id = "play" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                    Players
                </a>
                

            </form>
            <br />
        </div>
    )
}

export default team