import React, { useContext, useState } from "react";
import wretch from "wretch";
import { Context } from "../context/Context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SpinningCircles } from "react-loading-icons";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { DeployedURL, PF } from '../components/Constants';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

function AllUsers() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const { user } = useContext(Context);
  const authToken = user?.accessToken;
  const [successMgs, setSuccessMgs] = useState(null);
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);

  const { data: myData, isLoading } = useQuery(["AdminGetAllUsers"], () =>
    wretch(`${DeployedURL}/admin/allUsers`)
      .headers({ token: `Bearer ${authToken}` })
      .get().json().then((data) => { return data; })
      .catch((error) => { return error; }), { retry: false }
  );
  const deleteImage = (id) => {
    axios.delete(`${DeployedURL}/imageDelete/${id}`)
      .then(response => console.log(response?.message)).catch(error => console.log(error?.message))
  }
  const UpdateUserTierMutation = useMutation({
    mutationFn: async (data) => {
      wretch(`${DeployedURL}/admin/updateUser`)
        .headers({ token: `Bearer ${authToken}` })
        .put(data).json().then((data) => {
          queryClient.invalidateQueries('AdminGetAllUsers');
          setSuccessMgs("User Tier updated successfully");
          setTimeout(() => setSuccessMgs(false), 3000);

        })
        .catch(error => { setError(error); setTimeout(() => setError(false), 3000); })
    }
  })
  const handleDelete = async (data) => {
    DeleteUserMutation.mutate(data.id);
    deleteImage(data.photo);
  }

  const updateSubmit = (data) => {
    data.id = formData?._id;
    UpdateUserTierMutation.mutate(data);
  }

  const DeleteUserMutation = useMutation({
    mutationFn: async (id) => {
      wretch(`${DeployedURL}/admin/deleteUser/${id}`)
        .headers({ token: `Bearer ${authToken}` })
        .delete().json().then((data) => {
          queryClient.invalidateQueries('AdminGetAllUsers');
          setSuccessMgs("User Deleted");
          setTimeout(() => setSuccessMgs(false), 3000);
        }).catch((error) => { return error; }), { retry: false }

    }
  })
  return (

    <>
      <div className="flex flex-row  md:h-full bg-base-200 ">
        <AdminProfileSidebar />
        <main className="container mx-3 my-3 justify-center items-center h-full ">
          {
            DeleteUserMutation.isLoading ?
              (
                <ThreeDots stroke="#98ff98" strokeOpacity={.125} speed={.75} />
              ) : (
                error ? (
                  <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                    <div><span className='text-2xl'>😒</span>
                      <span>Error! {error?.message}</span>
                    </div>
                  </div >
                ) : (
                  successMgs && (
                    <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                      <div><span className='text-2xl'>😁</span>
                        <span>{successMgs}</span>
                      </div>
                    </div>
                  )
                )
              )
          }
          {isLoading && (
            <SpinningCircles
              stroke="#98ff98"
              strokeOpacity={0.125}
              speed={0.75}
            />
          )}
          <div className="overflow-x-auto">
            {myData?.length == 0 ? (
              <div className="alert alert-error shadow-lg lg:w-1/2 md:w-1/2 sm:w-full">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Error! No Scholarships Available😒.</span>
                </div>
              </div>
            ) : (
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Eduation Level</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>GPA</th>
                    <th>Country</th>
                    <th>Tier</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{myData?.map((item, index) => (

                  <tr key={index}>
                    <td>
                      {
                        item.premium_tier_available == true ? (
                          <div className=" avatar online">
                            <div className="w-10 rounded-full">
                              <img src={PF + item.photo} />
                            </div>
                          </div>
                        ) : (
                          <div className=" avatar ofline">
                            <div className="w-10 rounded-full">
                              <img src={PF + item.photo} />
                            </div>
                          </div>
                        )

                      }

                    </td>
                    <td>{item.username}</td>
                    <td>{item.fullname}</td>
                    <td>{item.email}</td>
                    <td>{item.education_level}</td>
                    <td>{item.gender}</td>
                    <td>{item.age}</td>
                    <td>{item.gpa}</td>
                    <td>{item.country}</td>
                    {item.premium_tier_available == false ? (
                      <td>Non-Premium</td>
                    ) : (
                      <td className="btn-ghost">✔Premium</td>
                    )
                    }
                    <td >
                      <label htmlFor="my-modal-4" className="btn btn-info btn-sm btn-outline" id={item._id} onClick={() => setFormData(item)} >
                        <FaPencilAlt />
                      </label>

                    </td>
                    <td>
                      <button className="btn btn-error btn-outline  btn-sm" id={item._id} value={item._id}
                        onClick={() => handleDelete({ "id": item._id, "photo": item.photo })}>
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            )}

          </div>
        </main>
      </div>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <div className="modal" data={formData}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-4" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg text-center font-bold">Update Details</h3>
          <form onSubmit={handleSubmit(updateSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Premium Tier</span>
              </label>
              <select value={formData?.premium_tier_available} {...register("premium_tier_available", { required: true })} onChange={e => setFormData({ ...formData, premium_tier_available: e.target.value })}
                className="select select-warning select-sm"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline btn-sm btn-info w-3/4 mx-auto">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AllUsers;
