import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Outlet } from 'react-router-dom';
import UseAdmin from '../Hooks/UseAdmin';
import UseUser from '../Hooks/UseUser';
import UseInstructor from '../Hooks/UseInstructor';


const Dashboard = () => {

    const [isInstructor] = UseInstructor();
    const [isUser] = UseUser()
    
    const [isAdmin] = UseAdmin(); 
   

    
    
    return (
        <div className=' '>
            <Helmet>
                <title>Dashboard</title>
            </Helmet>
            
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center ">
                    {/* Page content here */}
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open Dashboard</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 h-full bg-gradient-to-r from-cyan-300 to-pink-400 text-base-content font-bold">
                        {/* Sidebar content here */}
                        
                        
                        { isAdmin ?
                            <>
                                <h1 className='font-bold text-xl text-center mb-2'>Main Admin Dashboard</h1> <hr />
                                {/* <li><Link to="additem" className='mb-2'>Add Instructor</Link></li> */}
                                <li><Link to="manageclasses" className='mb-2'>Manage Classes</Link></li>
                                <li><Link to="manageusers" className='mb-2'>Manage Users</Link></li>
                                

                            </>
                            :
                            <> </>
                        }

                        { isInstructor ?
                            <>
                                <h1 className='font-bold text-xl text-center mb-2'> Instructor Dashboard</h1> <hr />
                                <li className='mb-1'><Link to="addclass">Add a Class</Link></li> 
                                <li><Link to="myclasses" className='mb-2'>My Classes</Link></li> 
                                <li><Link to="manageclasses" className='mb-2'>Manage Classes</Link></li>
                                <li><Link to="">Total Enrolled Students</Link></li> 
                                <li><Link to="">Feedback</Link></li> 
                            </>
                            :
                            <> </>
                        }
                        { isUser ?
                            <>
                             <h1 className='font-bold text-xl text-center mb-2'> Student Dashboard</h1> <hr />
                                <li><Link to="select-class">My Selected Classes</Link></li> 
                                <li><Link to="enrol-class">My Enrolled Classes</Link></li> 
                                <li><Link to="">Payments</Link></li> 
                            </>
                            :
                            <> </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;