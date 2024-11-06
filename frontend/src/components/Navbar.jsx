import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import logo from '../Assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const location = useLocation();

    const handleSearch = (e) => {
        e.preventDefault();
        if (location.pathname === '/mutual-funds') {
            console.log(`Searching mutual funds for: ${searchTerm}`);
        } else if (location.pathname === '/stocks') {
            console.log(`Searching stocks for: ${searchTerm}`);
        }
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleCloseMenu = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (isOpen && e.target.closest('.navbar') === null) {
            handleCloseMenu();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isOpen]);

 
    useEffect(() => {
        handleCloseMenu();
    }, [location]);

    return (
        <nav className="navbar border-b border-yellow-400 bg-black h-18 ">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className='flex items-center space-x-3 rtl:space-x-reverse'>
                    <NavLink to="/" className="flex items-center">
                        <img
                            src={logo}
                            className="h-8"
                            alt="Logo"
                        />
                        <h6 className="self-center text-2xl font-semibold text-white ml-2 whitespace-nowrap">Mutual <span className='text-yellow-500 font-bold text-3xl'>MAX</span></h6>
                    </NavLink>
                </div>
                <div className="hidden md:flex items-center space-x-4"> 
                    <NavLink to="/stocks" className="text-white hover:bg-gray-700 py-1 px-3 bg-yellow-200 opacity-100 rounded-full"><p className='opacity-100 text-yellow-700 font-semibold'>Stocks</p></NavLink>
                    <NavLink to="/mutual-funds" className="text-white hover:bg-gray-700 py-1 px-3 bg-yellow-200 opacity-100 rounded-full"><p className='opacity-100 text-yellow-700 font-semibold'>Mutual Funds</p></NavLink>
                </div>
                <div className="flex items-center">
                    <form onSubmit={handleSearch} className="hidden md:flex justify-center"> {/* Hide on mobile */}
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                            className="border border-gray-900 pl-4 rounded-full bg-slate-700 text-white py-1 w-48 text-black"
                        />
                        <button type="submit" className="bg-yellow-200 text-yellow-700 rounded-full px-4 py-1 ml-2">Search</button>
                    </form>
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-500 rounded-lg md:hidden"
                        aria-controls="navbar-hamburger"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                {/* Mobile Dropdown Menu */}
                <div className={`absolute top-16 right-0 w-full bg-gray-900 rounded-b-2xl shadow-md z-50 ${isOpen ? 'block' : 'hidden'} md:hidden`} id="navbar-hamburger">
                    <ul className="flex flex-col font-medium mt-4 rounded-full bg-black z-30">
                        <li>
                            <NavLink to="/stocks" className="block py-2 px-3 text-white rounded-2xl hover:bg-gray-700" onClick={handleCloseMenu}>Stock List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/mutual-funds" className="block py-2 px-3 text-white rounded-2xl mb-2 hover:bg-gray-700" onClick={handleCloseMenu}>Mutual Fund List</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
