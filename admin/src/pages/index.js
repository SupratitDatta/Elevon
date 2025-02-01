import React from 'react';
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faYoutube, faSquareXTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import avatar from "../assets/avatar.png";

export default function Dashboard() {
    const { data: session } = useSession();

    return (
        <Layout>
            <div className="bg-gray-100 min-h-auto p-8">
                <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">

                    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold">
                                Welcome, <span className="text-blue-300">{session?.user?.name}</span>
                            </h2>
                        </div>
                        <div className="flex items-center space-x-4 cursor-pointer">
                            <span className="my-auto ml-2 mr-2 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                            </svg></span>
                            <span className="my-auto mr-2 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg></span>
                            <span className="my-auto mr-4 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg></span>
                            <img
                                src={session?.user?.image || avatar}
                                alt="Profile"
                                className="w-12 h-12 rounded-full border-2 border-blue-300"
                            />
                        </div>
                    </div>

                    <div className="flex justify-evenly items-center p-6">
                        <div className="flex justify-center items-center">
                            <img src={session?.user?.image || avatar} alt="Profile"
                                className="w-44 h-44 object-cover rounded-lg border-4 border-black shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                            />
                        </div>
                        <div>
                            <div className="bg-gray-700 text-white text-center p-4 pt-1 rounded-t-lg">
                                <h3 className="text-3xl font-bold">{session?.user?.name}</h3>
                                <h6 className="text-red-400 font-semibold">Admin Manager</h6>

                                <div className="mt-2 flex justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                    <span className="text-center">{session?.user?.email}</span>
                                </div>
                            </div>

                            <div className="bg-black text-white p-2 text-center rounded-b-lg">
                                <p className="my-2">Manage, monitor, and control all administrative tasks efficiently in one place.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-200 p-6">
                        <div className="grid grid-cols-5 gap-4">
                            {[
                                { icon: faLinkedin, bg: 'bg-indigo-500' },
                                { icon: faFacebook, bg: 'bg-indigo-500' },
                                { icon: faGoogle, bg: 'bg-indigo-500' },
                                { icon: faSquareXTwitter, bg: 'bg-indigo-500' },
                                { icon: faYoutube, bg: 'bg-indigo-500' }
                            ].map((social, index) => (
                                <div
                                    key={index}
                                    className={`${social.bg} hover:bg-indigo-600 rounded-lg flex justify-center items-center p-4 transition-colors`}
                                >
                                    <FontAwesomeIcon
                                        className="h-8 w-8 text-white hover:text-red-500 cursor-pointer"
                                        icon={social.icon}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}