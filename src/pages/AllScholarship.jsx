import React, { useContext } from "react";
import wretch from "wretch";
import { Context } from "../context/Context";
import { Link, useParams } from "react-router-dom";
import scholar2 from "../images/scholar2.jpg";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { useQuery } from "@tanstack/react-query";
import { SpinningCircles } from "react-loading-icons";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { DeployedURL } from '../components/Constants';

function AllScholarship() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ["oneScholarships"],
    () =>
      axios.post(
        `${DeployedURL}/scholarship/oneNonPremium`,
        {
          id: id,
        }
      ),
    { retry: false }
  );
  return (
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
                    <Link>
                      <FaPencilAlt />
                    </Link>
                    <Link>
                      <FaTrashAlt />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AllScholarship;
