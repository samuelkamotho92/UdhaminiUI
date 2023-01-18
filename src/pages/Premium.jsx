import { useContext } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { Context } from "../context/Context";
import { SpinningCircles } from "react-loading-icons";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../components/ScholarshipCard";
import logo from '../images/logo.jpg'
import wretch from "wretch";
import { Link } from "react-router-dom";

function Premium() {
    const { user } = useContext(Context);
    const authToken = user?.accessToken;

    const { data: myData, isLoading, error } = useQuery(["PremiumScholarships"], () =>
        wretch("https://udhamini-api.azurewebsites.net/api/scholarship/premium")
            .headers({ token: `Bearer ${authToken}` })
            .post({ premium_tier: user.premium_tier_available })
            .json()
            .then((data) => { return data; })
            .catch((error) => { return error; }), { retry: false }
    );

    return (
        <div className="flex flex-row mt-60px h-fit  bg-base-200 ">
            <UserProfileSidebar />
            <main className="container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center h-full mx-2 mb-3">
                {isLoading && (
                    <SpinningCircles
                        stroke="#98ff98"
                        strokeOpacity={0.125}
                        speed={0.75}
                    />
                )}
                {
                    myData?.status ? (
                        <>
                            <div className="mockup-code md:w-1/2 md:ml-auto mx-auto ">
                                <pre data-prefix="😊" className="bg-info text-info-content">
                                    <code>Hello! Welcome..</code>
                                </pre>
                                <pre data-prefix="1" className="bg-warning text-warning-content">
                                    <code>{myData?.message}</code>
                                </pre>

                                <pre data-prefix=">" className="text-warning">
                                    <code>click the button below to upgrade your tier...</code>
                                </pre>
                                <pre data-prefix=">" className="text-success">
                                    <code>
                                        <Link className="btn btn-outline btn-sm mt-2 btn-accent" to="/profile/pay"> Upgrade Your </Link>

                                    </code>

                                </pre>
                            </div>

                        </>
                    ) : (
                        <>
                            {
                                myData?.map((scholarship, key) => (
                                    <ScholarshipCard key={key} data={scholarship} />
                                ))
                            }
                        </>

                    )}
            </main >
        </div >
    );
}

export default Premium;
