import React from 'react'
import axios from "axios";
import { useParams } from "react-router-dom";
import scholar2 from '../images/scholar2.jpg'
import UserProfileSidebar from '../components/UserProfileSidebar';
import { useQuery } from "@tanstack/react-query";
import { SpinningCircles } from 'react-loading-icons'
import { DeployedURL } from '../components/Constants';
import { PF } from '../components/Constants';

function Scholarship() {

    const redirect = (link) => { window.open(`${link}`, "_blank"); }
    const { id } = useParams();
    const { data, isLoading, error } = useQuery(["oneScholarships"], () =>
        axios.post(`${DeployedURL}/scholarship/oneNonPremium`, {
            id: id
        }), { retry: false });
    const scholarshipData = data?.data[0];
    return (
        <div className='flex flex-row mt-60px md:h-full bg-base-200 '>
            <UserProfileSidebar />
            <main className='container  ml-3 my-3 justify-center items-center h-full mt-6'>
                {
                    isLoading && <SpinningCircles stroke="#98ff98" strokeOpacity={.125} speed={.75} />
                }
                <div className="mockup-window border bg-base-300">
                    <div className="flex justify-center px-4 py-16 bg-base-200">
                        <div className="hero  bg-base-200">
                            <div className="hero-content flex-col lg:flex-row">
                                {scholarshipData?.photo ? (
                                    <img src={PF + scholarshipData?.photo} className="w-1/2 rounded h-full object-cover" alt="no pic" />
                                ) : (
                                    <img className="place-self-center w-1/2 rounded" src={scholar2} alt="no pic" />
                                )}
                                <div>
                                    <h1 className="text-5xl uppercase font-bold">{scholarshipData?.name}</h1>
                                    <div className="badge badge-secondary badge-lg my-2 text-xl">Scolarship Amount :{scholarshipData?.amount}</div>
                                    <div className="py-2 md:text-lg lg:text-xl justify-center">
                                        <p>👉Study-Level : {scholarshipData?.study_level}</p>
                                        <p>👉Origin-Country : {scholarshipData?.origin_country}</p>
                                        <p>👉Deadline : {scholarshipData?.deadline_day}</p>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => redirect(scholarshipData?.link)} >Visit Application Page</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    )
}

export default Scholarship