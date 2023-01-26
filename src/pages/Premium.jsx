import { useContext, useState } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { Context } from "../context/Context";
import { SpinningCircles } from "react-loading-icons";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../components/ScholarshipCard";
import logo from '../images/logo.jpg'
import wretch from "wretch";
import { Link } from "react-router-dom";
import { DeployedURL } from '../components/Constants';

function Premium() {
    const { user } = useContext(Context);
    const authToken = user?.accessToken;

    const { data: myData, isLoading, error } = useQuery(["PremiumScholarships"], () =>
        wretch(`${DeployedURL}/scholarship/premium`)
            .headers({ token: `Bearer ${authToken}` })
            .post({ premium_tier: user.premium_tier_available })
            .json()
            .then((data) => { return data; })
            .catch((error) => { return error; }), { retry: false }
    );

    return (
        <div className="flex flex-row mt-60px h-fit bg-base-200 ">
            <UserProfileSidebar />
            <main className="container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center h-fit mx-2 mb-3">
                {isLoading && (
                    <SpinningCircles
                        stroke="#98ff98"
                        strokeOpacity={0.125}
                        speed={0.75}
                    />
                )}
                {
                    myData?.status ? (
                        <div className="mockup-code w-fit">
                            <pre data-prefix="😊" className="bg-info text-info-content">
                                <code>Hello! Welcome..</code>
                            </pre>
                            <pre data-prefix="🎇" className=" text-sm ">
                                <code className="text-info">{myData?.message}</code>
                            </pre>
                            <pre data-prefix=">" className="text-warning text-wrap">
                                <code>Upgrade your account...</code>
                            </pre>
                            <pre data-prefix=">" className="text-warning text-wrap">
                                <code>to view Premium Scholarships</code>
                            </pre>
                            <pre data-prefix=">" className="text-success">
                                <code>
                                    <Link className="btn btn-outline btn-sm mt-2 btn-accent" to="/profile/pay"> Upgrade Your </Link>

                                </code>

                            </pre>
                        </div>
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
