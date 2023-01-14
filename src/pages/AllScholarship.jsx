import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import scholar2 from "../images/scholar2.jpg";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { useQuery } from "@tanstack/react-query";
import { SpinningCircles } from "react-loading-icons";
import AdminProfileSidebar from "../components/AdminProfileSidebar";

function AllScholarship() {
  const { id } = useParams();
  const { data, isLoading, error } = useQuery(
    ["oneScholarships"],
    () =>
      axios.post(
        "https://udhamini-api.azurewebsites.net/api/scholarship/oneNonPremium",
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
      <main className="container mx-2 my-3 justify-center items-center h-full ">
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
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Zemlak, Daniel and Leannon</td>
                <td>United States</td>
                <td>12/5/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Carroll Group</td>
                <td>China</td>
                <td>8/15/2020</td>
                <td>Red</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Marjy Ferencz</td>
                <td>Office Assistant I</td>
                <td>Rowe-Schoen</td>
                <td>Russia</td>
                <td>3/25/2021</td>
                <td>Crimson</td>
              </tr>
              <tr>
                <th>5</th>
                <td>Yancy Tear</td>
                <td>Community Outreach Specialist</td>
                <td>Wyman-Ledner</td>
                <td>Brazil</td>
                <td>5/22/2020</td>
                <td>Indigo</td>
              </tr>
              <tr>
                <th>6</th>
                <td>Irma Vasilik</td>
                <td>Editor</td>
                <td>Wiza, Bins and Emard</td>
                <td>Venezuela</td>
                <td>12/8/2020</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>7</th>
                <td>Meghann Durtnal</td>
                <td>Staff Accountant IV</td>
                <td>Schuster-Schimmel</td>
                <td>Philippines</td>
                <td>2/17/2021</td>
                <td>Yellow</td>
              </tr>
              <tr>
                <th>8</th>
                <td>Sammy Seston</td>
                <td>Accountant I</td>
                <td>O'Hara, Welch and Keebler</td>
                <td>Indonesia</td>
                <td>5/23/2020</td>
                <td>Crimson</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AllScholarship;
