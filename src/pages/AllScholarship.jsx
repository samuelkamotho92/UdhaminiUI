import React, { useContext, useState } from "react";
import wretch from "wretch";
import { Context } from "../context/Context";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import scholar2 from "../images/scholar2.jpg";
import UserProfileSidebar from "../components/UserProfileSidebar";
import { SpinningCircles } from "react-loading-icons";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { DeployedURL, PF } from '../components/Constants';
import { ThreeDots } from "react-loading-icons";

function AllScholarship() {
  const { user } = useContext(Context);
  const { register, formState: { errors }, handleSubmit, setValues } = useForm();
  const onSubmit = (data) => console.log(data);
  const [formData, setFormData] = useState(null);
  const [successMsg, setSuccessMg] = useState(null);
  const authToken = user?.accessToken;
  const [error, setError] = useState(false);
  const queryClient = useQueryClient();
  const { data: myData, isLoading, error: fetchError } = useQuery(["AllScholarships"], () =>
    wretch(`${DeployedURL}/scholarship/nonPremium`).get().json()
      .then((data) => { return data; })
      .catch((error) => { return error; }), { retry: false }
  );

  const UpdateScholarshipMutation = useMutation({
    mutationFn: async (data) => {
      wretch(`${DeployedURL}/scholarship/update`)
        .headers({ token: `Bearer ${authToken}` })
        .put(data).json()
        .then((data) => {
          queryClient.invalidateQueries('AllScholarships');
          setSuccessMg("Scholarship updated successfully");
          setTimeout(() => setSuccessMg(false), 3000);

        })
        .catch(error => { setError(error); setTimeout(() => setError(false), 3000); })
    }
  })

  const DeleteScholarshipMutation = useMutation({
    mutationFn: async (id) => {
      wretch(`${DeployedURL}/scholarship/delete/${id}`)
        .headers({ token: `Bearer ${authToken}` })
        .delete()
        .json()
        .then((data) => {
          setSuccessMg("Scholarship deleted successfully");
          setTimeout(() => setSuccessMg(false), 3000);
          queryClient.invalidateQueries('AllPremium');
          return data;
        })

        .catch((error) => { return error; }), { retry: false }

    }
  })

  const deleteImage = (id) => {
    axios.delete(`${DeployedURL}/imageDelete/${id}`)
      .then(response => console.log(response.message)).catch(error => console.log(error.message))
  }

  const handleDelete = (data) => {
    DeleteScholarshipMutation.mutate(data.id)
    deleteImage(data.photo);
  }
  const updateSubmit = (data) => {
    data.id = formData?._id;
    UpdateScholarshipMutation.mutate(data);
  }
  return (
    <>
      <div className="flex flex-row  md:h-fit bg-base-200 ">
        <AdminProfileSidebar />
        <main className="container mx-3 my-3 justify-center items-center h-full ">
          {
            UpdateScholarshipMutation.isLoading || DeleteScholarshipMutation.isLoading ?
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
                  successMsg && (
                    <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                      <div><span className='text-2xl'>😁</span>
                        <span>Scholarship has been Deleted!</span>
                      </div>
                    </div>
                  )
                )
              )
          }
          {
            UpdateScholarshipMutation.isLoading ?
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
                  successMsg && (
                    <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                      <div><span className='text-2xl'>😁</span>
                        <span>{successMsg}</span>
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
            {myData?.length === 0 ? (
              <div className="alert alert-error shadow-lg lg:w-1/2 md:w-1/2 sm:w-full">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>Error! No Scholarships Available😒.</span>
                </div>
              </div>
            ) : (
              <table className="table table-responsive w-full">
                <thead>
                  <tr>
                    <th>Photo</th>
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
                      <td>
                        <div className="avatar">
                          <div className="w-10 mask mask-hexagon">
                            <img src={PF + item.photo} alt="no pic" />
                          </div>
                        </div>
                      </td>
                      <td>{item.name}</td>
                      <td>{item.study_level}</td>
                      <td>{item.amount}</td>
                      <td>{item.link}</td>
                      <td>{item.origin_country}</td>
                      <td>{item.deadline_day}</td>
                      <td >
                        <label htmlFor="my-modal-3" className="btn btn btn-info btn-sm btn-outline" id={item._id} onClick={() => setFormData(
                          item)
                        }>
                          <FaPencilAlt />
                        </label>

                      </td>
                      <td>
                        <button className="btn  btn-error btn-outline  btn-sm" id={item._id} value={item._id} onClick={() => handleDelete({ "id": item._id, "photo": item.photo })}>
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
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal" data={formData}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg text-center font-bold">Update Details</h3>
          <form onSubmit={handleSubmit(updateSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Name</span>
              </label>
              <input type="text" className="input input-warning "
                value={formData?.name} {...register("name", { required: true })} onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">StudyLevel</span>
              </label>
              <select value={formData?.study_level} {...register("study_level", { required: true })} onChange={e => setFormData({ ...formData, study_level: e.target.value })}
                className="select select-warning"
              >
                <option defaultValue={"Select Study level"} disabled >
                  Select Study level
                </option>
                <option value="phd">PHD</option>
                <option value="postgraduate">Master</option>
                <option value="undergraduate">Degree</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">amount</span>
              </label>
              <input type="text" className="input input-warning "
                value={formData?.amount} {...register("amount", { required: true })} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Link</span>
              </label>
              <input type="text" className="input input-warning "
                value={formData?.link} {...register("link", { required: true })} onChange={e => setFormData({ ...formData, link: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Location</span>
              </label>
              <input type="text" className="input input-warning "
                value={formData?.origin_country} {...register("origin_country", { required: true })} onChange={e => setFormData({ ...formData, origin_country: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Deadline</span>
              </label>
              <input type="text" className="input input-warning "
                value={formData?.deadline_day} {...register("deadline_day", { required: true })} onChange={e => setFormData({ ...formData, deadline_day: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Premium Tier</span>
              </label>
              <select value={formData?.premium_tier} {...register("premium_tier", { required: true })} onChange={e => setFormData({ ...formData, premium_tier: e.target.value })}
                className="select select-warning"
              >
                <option defaultValue={"false"} disabled>
                  Select Premium Tier
                </option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline  btn-info w-3/4 mx-auto">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AllScholarship;
