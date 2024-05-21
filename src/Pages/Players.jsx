import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Players() {
  const { id } = useParams();
  const { name } = useParams();
  const { nop } = useParams();
  

  const [count,setCount] = useState(0);
  const [nullPlayers, setNullPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [teamPlayers, setTeamPlayers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.post("http://localhost:8801/addteam", { id, name })
      .then((response) => console.log(response.data))
      .catch((error) => console.error('Error adding team:', error));
  }, [id, name]);


  useEffect(() => {
    axios.get("http://localhost:8801/nullplayers").then((response) => {
      setNullPlayers(response.data);
    })
  })

  useEffect(() => {
    axios.get('http://localhost:8801/teamplayers/' + id).then((response) => {
      setTeamPlayers(response.data);
    })
  })


  function addOn(player_id) {
    axios.put("http://localhost:8801/inserttoteam", { player_id, id }).then((response) => {
      if (response.data) console.log(response.data)
      
    })



  }

  function deleteOn(player_id) {
    axios.put("http://localhost:8801/inserttonull", { player_id }).then((response) => {
      if (response.data) console.log(response.data)
        
      
    })

  }






  return (
    <div>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
      <h1 class='text-center text-7xl uppercase pt-12 pb-2'>{name}</h1>
      <form class="max-w-md mx-auto pt-3">
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input onChange={(e) => { setSearch(e.target.value) }} type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />

        </div>
      </form>
      <br />
      <div class="flex justify-center align-middle gap-3">
        <table>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr class="border-b-4 border-slate-400">
                  <th class="px-6 py-3 text-center" colSpan={3}>All Players</th>
                </tr>
                <tr>

                  <th scope="col" class="px-3 py-3">Player ID</th>

                  <th scope="col" class="px-6 py-3">
                    Player Name
                  </th>


                </tr>
              </thead>
              <tbody>
                {
                  nullPlayers.filter((values) => {
                    return search.toLowerCase() === "" ? values : values.player_name.toLowerCase().includes(search);
                  }).map((values, index) => {
                    return (
                      <tr class="hover:bg-gray-50">
                        <th scope="row" class="px-7 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                          {values.player_id}
                        </th>
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                          {values.player_name}
                        </th>

                        <td class="px-6 py-4">
                          <button onClick={() => addOn(values.player_id)}>
                            <span class="material-symbols-outlined hover:scale-125">
                              add_circle
                            </span>
                          </button>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
          </div>

        </table>


        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr class="border-b-4 border-slate-400">
                <th class="px-6 py-3 text-center" colSpan={3}>Team Players</th>
              </tr>
              <tr>
                <th scope="col" class="px-3 py-3">Player ID</th>
                <th scope="col" class="px-6 py-3">
                  Player Name
                </th>
              </tr>
            </thead>
            <tbody>

              {
                teamPlayers.map((name, id) => {
                  return (
                    <tr key={id}>
                      <th scope="row" class="px-7 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white capitalize">
                        {name.player_id}
                      </th>
                      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white  hover:bg-gray-50 capitalize">
                        {name.player_name}
                      </th>


                      <td class="px-6 py-4">
                        <button onClick={() => deleteOn(name.player_id)}>
                          <span class="material-symbols-outlined hover:scale-125">
                            cancel
                          </span>
                        </button>
                      </td>
                    </tr>
                  )
                })
              }




            </tbody>
          </table>
        </div>


      </div>

    </div>
  )
}

export default Players