import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import wretch from "wretch";
import { Context } from "../context/Context";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { SpinningCircles } from "react-loading-icons";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { DeployedURL } from '../components/Constants';

function AllPremium() {
  const { register, formState: { errors }, handleSubmit, setValues } = useForm();
  const onSubmit = (data) => console.log(data);
  const { user } = useContext(Context);
  const authToken = user?.accessToken;
  const [formData, setFormData] = useState(null);

  const { data: myData, isLoading, error } = useQuery(["AllPremium"], () =>
    wretch(`${DeployedURL}/scholarship/premium`)
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
                      <label htmlFor="my-modal-3" className="btn" id={item._id} onClick={() => setFormData(
                        item)
                      }>
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
      <div className="modal" data={formData}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-lg text-center font-bold">Update Details</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Name</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.name} {...register("name", { required: true })} onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">StudyLevel</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.study_level} {...register("study_level", { required: true })} onChange={e => setFormData({ ...formData, study_level: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">amount</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.amount} {...register("amount", { required: true })} onChange={e => setFormData({ ...formData, amount: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Link</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.link} {...register("link", { required: true })} onChange={e => setFormData({ ...formData, link: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Location</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.origin_country} {...register("origin_country", { required: true })} onChange={e => setFormData({ ...formData, origin_country: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Deadline</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.deadline_day} {...register("deadline_day", { required: true })} onChange={e => setFormData({ ...formData, deadline_day: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Teir</span>
              </label>
              <input type="text" className="input input-warning input-lg input-bordered"
                value={formData?.premium_tier} {...register("premium_tier", { required: true })} onChange={e => setFormData({ ...formData, premium_tier: e.target.value })} />
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
