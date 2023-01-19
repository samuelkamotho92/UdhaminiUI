import { useContext } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import { Context } from '../context/Context';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from '../components/ScholarshipCard';
import { SpinningCircles } from 'react-loading-icons'


function Scholarships() {
    const { user } = useContext(Context);
    const { data, isLoading, error } = useQuery(["scholarships"], () =>
        axios.get("https://udhamini-api.azurewebsites.net/api/scholarship/nonPremium"), { retry: false });


    if (error) return <div>{error}</div>;
    return (
        <div className='flex flex-row mt-60px md:h-fit bg-base-200 '>
            <UserProfileSidebar />
            <main className='container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center md:h-full sm:h-full mx-2 mb-3'>
                {
                    isLoading && <SpinningCircles stroke="#98ff98" strokeOpacity={.125} speed={.75} />
                }
                {
                    data?.data?.map((scholarship, key) => (
                        <ScholarshipCard key={key} data={scholarship} />
                    ))
                }
            </main>
        </div>
    )
}

export default Scholarships
