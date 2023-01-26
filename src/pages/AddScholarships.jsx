import React, { useContext } from "react";
import { Context } from "../context/Context";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { useState } from "react";
import filePlaceholder from "../images/filePlaceholder.png";
import { useForm } from "react-hook-form";
import wretch from "wretch";
import axios from "axios";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeployedURL } from '../components/Constants';

function AddScholarships() {
  const { user } = useContext(Context);
  const authToken = user?.accessToken;
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imgUploadMsg, setImgUploadMsg] = useState("Upload Image");
  const [successMgs, setSuccessMgs] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState(null);
  const queryClient = useQueryClient();

  const RegisterScholarshipMutation = useMutation({
    mutationFn: async (data) => {
      wretch(`${DeployedURL}/scholarship/register`)
        .headers({ token: `Bearer ${authToken}` })
        .post(data).json()
        .then((data) => {
          setSuccessMgs(data);
          setFile(null);
          reset();
          queryClient.invalidateQueries('AllPremium');
          setTimeout(() => setSuccessMgs(false), 4000);
          setTimeout(() => setImgUploadMsg("Upload Image"), 4000);
        })
        .catch(error => { setError(error); setTimeout(() => setError(false), 3000); })
    }
  })


  const onSubmit = async (data) => {
    if (file) {
      const filename = Date.now() + file.name;
      const formData = new FormData();
      formData.append("name", filename);
      formData.append("file", file);
      data.photo = filename;
      // console.log(file);
      await axios.post(`${DeployedURL}/upload`, formData)
        .then(response => { setImgUploadMsg(response?.data) })
        .catch(error => { console.log(error.message) })
    }
    RegisterScholarshipMutation.mutate(data);
  };


  return (
    <div className="flex flex-row mt-60px md:h-full bg-base-200 ">
      <AdminProfileSidebar />
      {
        RegisterScholarshipMutation.isLoading ? (
          <ThreeDots stroke="#98ff98" strokeOpacity={.125} speed={.75} />
        ) : (
          error ? (
            <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
              <div><span className='text-2xl'>😒</span>
                <span>Error!registering Scholarship</span>
              </div>
            </div >
          ) : (
            successMgs && (
              <div className="alert alert-success mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
                <div><span className='text-2xl'>😎</span>
                  <span>Scholarship registered Successfully</span>
                </div>
              </div >
            )
          )
        )

      }
      <main className="container my-3 justify-center items-center h-full m-auto">
        <main className="bg-base-200 mt-60px">
          <div className="hero  bg-base-200">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="hero-content flex-col ">
                <div className="card ">
                  <div className="card-header">
                    <div className="avatar grid">
                      <div className="w-24 rounded place-self-center">
                        <label htmlFor="fileInput">
                          {file ? (
                            <img className="cursor-pointer w-1/2" src={URL.createObjectURL(file)}
                              alt="invalid Imagefile😒"
                            />
                          ) : (
                            <img className="cursor-pointer " src={filePlaceholder} alt="nopic"
                            />
                          )}
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }}
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                  <span className="text-center">{imgUploadMsg}</span>
                  <div className="card-body md:flex-row sm:flex-col lg:flex-row">
                    <div >
                      <input type="hidden"  {...register("isAdmin", { required: false })} value={true}
                        placeholder="Name" className="input input-bordered"
                      />
                      <label className="label">  <span className="label-text">Scholarship Name</span> </label>
                      <input type="text"  {...register("name", { required: true })} onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name" className="input input-bordered"
                      />
                      {errors.name?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Name is required 😶
                        </p>
                      )}

                      <label className="label">  <span className="label-text">Amount in USD</span> </label>
                      <input type="text"  {...register("amount", { required: true })} onChange={e => setFormData({ ...formData, amount: "$" + e.target.value })}
                        placeholder="Amount" className="input input-bordered"
                      />
                      {errors.name?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Amount is required 😶
                        </p>
                      )}
                    </div>
                    <div >
                      <label className="label"> <span className="label-text">Study_level</span></label>
                      <select {...register("study_level", { required: true })} onChange={e => setFormData({ ...formData, study_level: e.target.value })}
                        className="select select-bordered w-full max-w-xs"
                      >
                        <option selected disabled value="">
                          Select Study level
                        </option>
                        <option value="phd">PHD</option>
                        <option value="postgraduate">Master</option>
                        <option value="undergraduate">Degree</option>
                      </select>
                      {errors.study_level?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          study level is required 😶
                        </p>
                      )}

                      <label className="label"><span className="label-text">Link</span> </label>
                      <input type="text" {...register("link", { required: true })} onChange={e => setFormData({ ...formData, link: e.target.value })}
                        placeholder="Provide Link" className="input input-bordered"
                      />
                      {errors.link?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Link is required 😶
                        </p>
                      )}

                      <label className="label"> <span className="label-text">Country</span>  </label>
                      <input type="text"  {...register("origin_country", { required: true })} onChange={e => setFormData({ ...formData, origin_country: e.target.value })}
                        placeholder="Enter Country" className="input input-bordered"
                      />
                      {errors.origin_country?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Country is required 😶
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="label"> <span className="label-text">Deadline</span></label>
                      <input type="text"  {...register("deadline_day", { required: true })} onChange={e => setFormData({ ...formData, deadline_day: e.target.value })}
                        placeholder="Deadline" className="input input-bordered"
                      />

                      <label className="label"> <span className="label-text">Tier</span> </label>
                      <select {...register("premium_tier", { required: true })} className="select select-bordered w-full max-w-xs"
                      >
                        <option selected disabled value="">
                          Select Premium Tier
                        </option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                      {errors.premium_tier?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          tier is required 😶
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-control mt-3 grid">
                    <button type="submit" className="btn btn-outline max-w-md place-self-center w-full" >
                      Add Scholarship
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </main>
    </div>
  );
}

export default AddScholarships;
