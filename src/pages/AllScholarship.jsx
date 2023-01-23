import React from "react";
import axios from "axios";
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
  const scholarshipData = data?.data[0];
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
                <th></th>
                <th>Name</th>
                <th>Study Level</th>
                <th>Link</th>
                <th>location</th>
                <th>Deadline</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>
                  <Link>
                    <FaPencilAlt />
                  </Link>
                  <Link>
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>
                  <Link>
                    <FaPencilAlt />
                  </Link>
                  <Link>
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
              <tr>
                <th>3</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>
                  <Link>
                    <FaPencilAlt />
                  </Link>
                  <Link>
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
              <tr>
                <th>4</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>
                  <Link>
                    <FaPencilAlt />
                  </Link>
                  <Link>
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
              <tr>
                <th>5</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>
                  <Link>
                    <FaPencilAlt />
                  </Link>
                  <Link>
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
              <tr>
                <th>6</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Littel, Schaden and Vandervort</td>
                <td>Canada</td>
                <td>12/16/2020</td>
                <td>
                  <Link>
                    <FaPencilAlt />
                  </Link>
                  <Link>
                    <FaTrashAlt />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AllScholarship;
