import { useContext, useState } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { Context } from "../context/Context";
import { SpinningCircles } from "react-loading-icons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import wretch from "https://cdn.skypack.dev/wretch/dist/bundle/wretch.all.min.mjs";

function Premium() {
  const { user } = useContext(Context);
  console.log(user);
  const authToken = user?.accessToken;
  const [check, setcheck] = useState(false);

  const {
    data: mydata,
    isLoading,
    error,
  } = useQuery(
    ["PremiumScholarships"],
    () =>
      wretch("https://udhamini-api.azurewebsites.net/api/scholarship/premium")
        .headers({ token: `Bearer ${authToken}` })
        .post({ premium_tier: user.premium_tier_available })
        .unauthorized((error) => {
          return error;
        })
        .json()
        .then((data) => {
          return data;
        })
        .catch((error) => {
          return error;
        }),
    { retry: false }
  );

  return (
    <div className="flex flex-row mt-60px md:h-full bg-base-200 ">
      {/* <UserProfileSidebar /> */}
      <AdminProfileSidebar />
      <main className="container  grid md:grid-cols-1 sm:grid-cols-1 gap-5 justify-center items-center md:h-full sm:h-full mx-2 mb-3">
        {isLoading && (
          <SpinningCircles
            stroke="#98ff98"
            strokeOpacity={0.125}
            speed={0.75}
          />
        )}
        {mydata?.status ? (
          <>
            <div className="mockup-code md:w-1/2 md:ml-auto mx-auto ">
              <pre data-prefix="1" className="bg-warning text-warning-content">
                <code>{mydata?.message}</code>
              </pre>
              <pre data-prefix="$">
                <code>Hello! Welcome..</code>
              </pre>
              <pre data-prefix=">" className="text-warning">
                <code>click the button below to upgrade your tier...</code>
              </pre>
              <pre data-prefix=">" className="text-success">
                <code>
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-outline btn-sm mt-2 btn-accent"
                  >
                    Upgrade Your Tier
                  </label>
                </code>
              </pre>
            </div>

            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
              <div className="modal-box relative">
                <label
                  htmlFor="my-modal-3"
                  className="btn btn-sm btn-circle absolute right-2 top-2"
                >
                  ✕
                </label>
                <h3 className="text-lg font-bold">
                  Congratulations random Internet user!
                </h3>
                <p className="py-4">
                  You've been selected for a chance to get one year of
                  subscription to use Wikipedia for free!
                </p>
              </div>
            </div>
          </>
        ) : (
          <div>{JSON.stringify(mydata)}</div>
        )}
      </main>
    </div>
  );
}

export default Premium;
