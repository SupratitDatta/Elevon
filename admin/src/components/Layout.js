import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav";
import { useState } from "react";
import Navbar from "./Navbar";
import Logo from "@/components/Logo";
import Head from "next/head";

export default function Layout({ children }) {
    const [showNav, setShowNav] = useState(false);
    const { data: session } = useSession();
    if (!session) {
        return (
            <>
                <Head>
                    <link href="https://fonts.googleapis.com/css?family=Londrina+Outline&display=swap" rel="stylesheet" />
                </Head>
                <div className="overflow-hidden">
                    <div id="scene" className=" justify-center items-center w-screen h-screen bg-cover relative">
                        <div className="px-20 py-10 mb-20 text-3xl font-extrabold text-gray-300">
                            <div className="font-extrabold text-4xl text-center text-white">Welcome to the Admin Panel</div>
                        </div>
                        <h1 id="welcome" className="absolute font-londrina-outline font-extrabold text-[160px] text-nowrap animate-go text-blue-100 text-center w-full" style={{ animationDelay: "2s" }}>Login to continue...</h1>
                        <div id="star1" className="absolute h-1 w-1 border-2 border-white rounded-full top-1/2 left-0 animate-star1" style={{ animationDelay: "2s" }}></div>
                        <div id="star2" className="absolute h-1 w-1 border-2 border-white rounded-full top-0 left-0 animate-star2" style={{ animationDelay: "1s" }}></div>
                        <div id="star3" className="absolute h-1 w-1 border-2 border-white rounded-full top-0 left-1/2 animate-star3" style={{ animationDelay: "4s" }}></div>
                        <div id="star4" className="absolute h-1 w-1 border-2 border-white rounded-full bottom-0 right-0 animate-star4" style={{ animationDelay: "5s" }}></div>
                        <div id="star5" className="absolute h-1 w-1 border-2 border-white rounded-full bottom-0 left-30 animate-star5" style={{ animationDelay: "5.5s" }}></div>
                        <div id="star6" className="absolute h-1 w-1 border-2 border-white rounded-full bottom-0 left-0 animate-star6" style={{ animationDelay: "4.5s" }}></div>
                        <div id="star7" className="absolute h-1 w-1 border-2 border-white rounded-full bottom-30 left-0 animate-star7" style={{ animationDelay: "3.5s" }}></div>
                        <div id="star8" className="absolute h-1 w-1 border-2 border-white rounded-full top-0 left-10 animate-star8" style={{ animationDelay: "2.5s" }}></div>
                        <div id="star9" className="absolute h-1 w-1 border-2 border-white rounded-full bottom-0 right-0 animate-star9" style={{ animationDelay: "3s" }}></div>
                        <div id="star10" className="absolute h-1 w-1 border-2 border-white rounded-full bottom-0 left-1/2 animate-star10" style={{ animationDelay: "4s" }}></div>
                        <div id="star11" className="absolute h-1 w-1 border-2 border-white rounded-full top-30 left-0 animate-star11" style={{ animationDelay: "4s" }}></div>
                        <div className="text-center w-full mt-44">
                            <button onClick={() => signIn('google')} className="inline-block mx-auto w-60 h-16 py-1 px-3 border-2 border-white rounded-lg bg-transparent text-white text-xl font-semibold uppercase tracking-wide transition duration-400 ease-in-out hover:bg-indigo-500 cursor-pointer">
                                Login with Google
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    return (
        <div className="bg-gray-200 min-h-screen ">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className="md:hidden flex items-center p-4">
                <button onClick={() => setShowNav(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                </button>
                <div className="flex grow justify-center mr-6">
                    <Logo />
                </div>
            </div>
            <div className="flex pt-16">
                <div className="fixed top-0 left-0 w-56 h-full bg-indigo-800 z-0">
                    <Nav show={showNav} />
                </div>
                <div className="ml-64 flex-grow p-4 pb-8 scrollbar-hide z-30">
                    {children}
                </div>
            </div>
        </div>
    );
}