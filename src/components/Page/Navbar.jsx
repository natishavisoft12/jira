import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Mobile menu icons
import { GrProjects } from "react-icons/gr"; // Project Icon
import { FaPlus } from "react-icons/fa"; // Add Project Icon

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gray-900 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    
                    {/* Logo & Home */}
                    <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                        <GrProjects className="text-yellow-400 text-3xl" /> Projects
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/" className="hover:text-yellow-400 transition">🏠 Home</Link>
                        <Link to="/addNewProject" className="hover:text-yellow-400 transition flex items-center gap-1">
                            <FaPlus /> Add Project
                        </Link>
                    
                    </div>

                    {/* Mobile Menu Icon */}
                    <button onClick={toggleMenu} className="md:hidden text-2xl">
                        {isMobileMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden flex flex-col items-center gap-4 py-4">
                        <Link to="/" className="hover:text-yellow-400 transition">🏠 Home</Link>
                        <Link to="/addNewProject" className="hover:text-yellow-400 transition flex items-center gap-1">
                            <FaPlus /> Add Project
                        </Link>
                     
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
