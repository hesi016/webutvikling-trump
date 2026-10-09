import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
    return(
    <header className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white text-center py-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold uppercase tracking-widest drop-shadow-lg">
              Trump's World
          </h1>
        </div>
        
      <nav className="mt-6">
        <ul className="navbar__menu flex justify-center space-x-4 font-bold ">
          <li><Link to = "/staffMembers" className="px-6 py-2 text-lg rounded-md bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-indigo-600 hover:to-red-600 transition-all duration-300 shadow hover:shadow-lg transform hover:scale-105 text-white tracking-wide"> Staff</Link></li>
          <li><Link to = "/addMember" className="px-6 py-2 text-lg rounded-md bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-indigo-600 hover:to-red-600 transition-all duration-300 shadow hover:shadow-lg transform hover:scale-105 text-white tracking-wide"> Add member </Link></li>
        </ul>
      </nav>
    </header>
    )
}
export default Header;