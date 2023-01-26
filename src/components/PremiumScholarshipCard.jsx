import { useContext } from 'react'
import { Context } from "../context/Context";
import { useParams } from "react-router-dom";
import scholar2 from '../images/scholar2.jpg'
import UserProfileSidebar from '../components/UserProfileSidebar';
import { useQuery } from "@tanstack/react-query";
import { SpinningCircles } from 'react-loading-icons'
import wretch from 'wretch';

function PremiumScholarshipCard() {
    const { id } = useParams();
    const { user } = useContext(Context);
    const redirect = (link) => { window.open(`${link}`, "_blank"); }

    const { data: FetchedPremiumData, isLoading, error } = useQuery(["OnePremiumScholarships"], () =>
        wretch(`https://udhamini-api.azurewebsites.net/api/scholarship/onePremium/${id}`)
            .headers({ token: `Bearer ${user?.accessToken}` })
            .post()
            .json()
            .then((data) => { return data; })
            .catch((error) => { return error; }), { retry: false }
    );
    const premiumData = FetchedPremiumData && FetchedPremiumData[0];
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
                                <img src={scholar2} className="max-w-lg rounded-lg shadow-2xl" />
                                <div>
                                    <h1 className="text-5xl uppercase font-bold">{premiumData?.name}</h1>
                                    <div className="badge badge-secondary badge-lg my-2 text-xl">Scolarship Amount :{premiumData?.amount}</div>
                                    <div className="py-2 md:text-lg lg:text-xl justify-center">
                                        <p>👉Study-Level : {premiumData?.study_level}</p>
                                        <p>👉Origin-Country : {premiumData?.origin_country}</p>
                                        <p>👉Deadline : {premiumData?.deadline_day}</p>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => redirect(premiumData?.link)} >Visit Application Page</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default PremiumScholarshipCard