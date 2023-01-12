import { useContext } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import { Context } from '../context/Context';
import { SpinningCircles } from 'react-loading-icons'
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function Premium() {
    const { user } = useContext(Context);
    const authToken = user?.accessToken;

    const { data, isLoading, isError, error: myerror } = useQuery(["PremiumScholarships"], () =>
        axios.post("https://udhamini-api.azurewebsites.net/api/scholarship/premium", {
            premium_tier: user?.premium_tier_available
        }, {
            headers: {
                'Content-Type': 'application/json',
                "token": `Bearer ${user?.accessToken}`
            }
        },
        ).then(response => response.data).catch(error => error)
        , { retry: false });
    console.log(data)


    return (
        <div className='flex flex-row mt-60px md:h-full bg-base-200 '>
            <UserProfileSidebar />
            <main className='container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center md:h-full sm:h-full mx-2 mb-3'>
                <h2>scholarships</h2>
                {
                    isLoading ? (<SpinningCircles stroke="#98ff98" strokeOpacity={.125} speed={.75} />) :
                        (isError && <div>{myerror}</div>

                        )


                }
            </main>
        </div>
    )
}

export default Premium