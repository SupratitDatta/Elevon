import React from 'react'
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

function settings() {
    const { data: session } = useSession();

    return (
        <div>
            <Layout>
                <h1 className="text-3xl text-blue-600 font-bold">Settings</h1>
                <div className="container mx-auto mt-2 text-black bg-gray-400 rounded-xl">
                    <div className="flex flex-wrap -mx-2">
                        <div className="w-full xl:w-1/4 lg:w-1/4 md:w-full sm:w-full px-2 mb-4">
                            <div className="bg-gray-200 rounded-lg shadow-lg h-full p-5 mt-2 ml-2">
                                <div className="account-settings">
                                    <div className="user-profile text-center mb-8">
                                        <div className="user-avatar mb-4">
                                            <img className="w-24 h-24 rounded-md mx-auto" src={session?.user?.image} alt="Maxwell Admin"></img>
                                        </div>
                                        <h5 className="user-name text-2xl mb-1 text-blue-600">{session?.user?.name}</h5>
                                        <h6 className="user-email text-base font-medium">{session?.user?.email}</h6>
                                    </div>
                                    <div className="about mt-4 text-center">
                                        <h5 className="mb-2 font-medium text-blue-600">About</h5>
                                        <p className="text-sm">I'm {session?.user?.name}, the Head Admin of this company, responsible for overseeing and managing all operations efficiently.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full xl:w-3/4 lg:w-3/4 md:w-full sm:w-full px-2 mt-2 mb-2 ml-[-5px]">
                            <div className="bg-gray-200 rounded-lg shadow-lg h-full p-5 pb-2">
                                <div className="mb-3 text-blue-600">
                                    <h6 className="text-lg">Personal Details</h6>
                                </div>
                                <div className="flex flex-wrap -mx-2">
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="text" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="fullName" placeholder="Enter full name"></input>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="email" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="eMail" placeholder="Enter email ID"></input>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="text" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="phone" placeholder="Enter phone number"></input>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="url" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="website" placeholder="Website url"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 mt-2 text-blue-600">
                                    <h6 className="text-lg">Address</h6>
                                </div>
                                <div className="flex flex-wrap -mx-2">
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="text" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="Street" placeholder="Enter Street"></input>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="text" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="ciTy" placeholder="Enter City"></input>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="text" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="sTate" placeholder="Enter State"></input>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 px-2 mb-2">
                                        <div className="form-group">
                                            <input type="text" className="text-black placeholder-black form-control w-full p-2 bg-gray-300 border border-gray-600 rounded" id="zIp" placeholder="Zip Code"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end space-x-4">
                                    <button type="button" className="btn bg-red-400 hover:bg-red-600 text-white duration-200 py-2 px-4 rounded-md">Cancel</button>
                                    <button type="button" className="btn bg-blue-500 hover:bg-blue-700 text-white duration-200 py-2 px-4 mr-10 rounded-md">Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default settings