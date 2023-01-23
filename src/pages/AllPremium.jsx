import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import wretch from "wretch";
import { Context } from "../context/Context";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SpinningCircles } from "react-loading-icons";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function AllPremium() {
  const { formState: { errors }, handleSubmit } = useForm();
  const { user } = useContext(Context);
  const authToken = user?.accessToken;
  const { data: myData, isLoading, error } = useQuery(["AllPremium"], () =>
    wretch("https://udhamini-api.azurewebsites.net/api/scholarship/premium")
      .headers({ token: `Bearer ${authToken}` })
      .post({ premium_tier: true })
      .json()
      .then((data) => { return data; })
      .catch((error) => { return error; }), { retry: false }
  );
  return (
    <>
      <div className="flex flex-row  md:h-full bg-base-200 ">
        <AdminProfileSidebar />
        <main className="container mx-3 my-3 justify-center items-center h-full ">
          {isLoading && (
            <SpinningCircles
              stroke="#98ff98"
              strokeOpacity={0.125}
              speed={0.75}
            />
          )}
          <div className="overflow-x-auto">
            <table className="table table-responsive w-full">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Study Level</th>
                  <th>Amount</th>
                  <th>Link</th>
                  <th>location</th>
                  <th>Deadline</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {myData?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.study_level}</td>
                    <td>{item.amount}</td>
                    <td>{item.link}</td>
                    <td>{item.origin_country}</td>
                    <td>{item.deadline_day}</td>
                    <td >
                      <label htmlFor="my-modal-3" className="btn">
                        <FaPencilAlt />
                      </label>

                    </td>
                    <td>
                      <label className="btn  bg-orange-600">
                        <FaTrashAlt />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg text-center font-bold">Update Details</h3>
          <form  >
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Name</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered" />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline btn-warning">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AllPremium;
