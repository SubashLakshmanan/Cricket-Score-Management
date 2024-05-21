import React from 'react'
import {Link} from 'react-router-dom'


function Navbar() {
    return (
        <div>
            <nav class="bg-white border-gray-200  border rounded-full">
                <div class="flex justify-center p-8">
                    <div class="" id="navbar-default">
                        <ul class="font-medium flex   border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Home</Link>
                            </li>
                            <li>
                                <Link to="/new_tournament" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">New Tournament</Link>
                            </li>
                            <li>
                                 <Link to="/tournament" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 ">Tournaments</Link>
                            </li>
                            <li>
                                 <Link to="/history" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">History</Link>
                            </li>
                            <li>
                                 <Link to="/history" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Players</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar