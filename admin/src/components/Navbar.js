import React from 'react';
import Logo from './Logo';

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full bg-black px-4">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <button
                            type="button"
                            className="inline-block md:hidden text-teal-400 focus:outline-none"
                            data-toggle="collapse"
                            data-target="#navbarContent"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="block w-6 h-0.5 bg-white mb-1"></span>
                            <span className="block w-6 h-0.5 bg-white mb-1"></span>
                            <span className="block w-6 h-0.5 bg-white"></span>
                        </button>
                        <div className="text-white mr-12 text-2xl">
                            <Logo />
                        </div>
                    </div>
                    <div className="hidden md:flex md:items-center md:space-x-4" id="navbarContent">
                        <ul className="flex space-x-10 mr-6 text-white">
                            <li><a className="hover:text-blue-600" href="/">About</a></li>
                            <li><a className="hover:text-blue-600" href="/">Services</a></li>
                            <li><a className="hover:text-blue-600" href="/">Portfolio</a></li>
                            <li><a className="hover:text-blue-600" href="/">Team</a></li>
                            <li><a className="hover:text-blue-600" href="/">Contact</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;