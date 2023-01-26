import { useContext, useState } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import imagePlaceholder from "../images/placeholder.png";
import { Context } from "../context/Context";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { ThreeDots } from "react-loading-icons";
import wretch from "wretch";
import "../index.css";
import { DeployedURL, PF } from '../components/Constants';
import axios from "axios";

function Profile() {
  const { user, dispatch } = useContext(Context);
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [success, setSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState(null);
  const [file, setFile] = useState(null);
  const [imgUploadMsg, setImgUploadMsg] = useState(null);

  const updateRegisterMutation = useMutation({
    mutationFn: async (data) => {
      return wretch(`${DeployedURL}/users/update/${user._id}`)
        .headers({ token: `Bearer ${user?.accessToken}` })
        .put(data)
        .json().then((data) => {
          if (data._id) {
            data.accessToken = user?.accessToken;
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            setSuccessMsg(true);
            setTimeout(() => setSuccessMsg(false), 3000);
          }
        })
        .catch(error => {
          setError(error)
          setTimeout(() => setError(false), 3000);
        })
    }
  })
  const onSubmit = async (data) => {
    if (file) {
      let filename = Date.now() + file.name;
      let formData = new FormData();
      formData.append("name", filename);
      formData.append("file", file);
      data.photo = filename;
      axios.delete(`${DeployedURL}/imageDelete/${user?.photo}`).then(response => console.log(response.message)).catch(error => console.log(error.message))
      axios.post(`${DeployedURL}/upload`, formData)
        .then(response => {
          setImgUploadMsg(response?.data);
          formData = null;
        })
        .catch(error => { console.log(error.message) })
    }
    updateRegisterMutation.mutate(data);
  };
  return (
    <>
      <div className="flex flex-row mt-60px sm:h-fit md:h-full bg-base-200 ">
        <UserProfileSidebar />
        <label htmlFor="my-modal-3" className="btn bg-warning text-dark updates" id={user._id} onClick={() => setFormData(
          user)
        }>
          UPDATE DATA
        </label>
        <main className="container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center h-full mx-2 mb-3">
          {
            updateRegisterMutation.isLoading ?
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
                        <span>User Updated Successfully</span>
                      </div>
                    </div>
                  )
                )
              )
          }
          <>
            <div className="avatar bg-base-100 rounded-box p-2 mt-2">
              <div className="w-3/4 mask mask-hexagon grid mx-auto">
                {user.photo ? (
                  <img src={PF + user.photo} className="w-full h-full object-cover" alt="no pic" />
                ) : (
                  <img className="place-self-center" src={imagePlaceholder} alt="no pic" />
                )}
                <div>
                  <button className="btn btn-accent">Edit Profile</button>
                </div>
              </div>
            </div>
            <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl">
              <li><a href="#">Full Names : {user?.fullname}</a> </li>
              <li><a href="#">Age : {user?.age}</a></li>
              <li><a href="#">Gender : {user?.gender}</a> </li>
              <li><a href="#">Email : {user?.email}</a></li>
              <li><a href="#">G.P.A : {user?.gpa}</a></li>
              <li><a href="#">Education Level : {user?.education_level}</a></li>
              <li><a href="#">Country of Residence : {user?.country}</a></li>
            </ul>
            <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl justify-center">
              <li><a>Username : {user?.username}</a></li>
              <li><a>Password : ******</a></li>
            </ul>
          </>
        </main>
      </div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal" data={formData}>
        <div className="modal-box relative">
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="text-3xl text-center font-bold">Update Details</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="avatar bg-base-100 rounded-box p-1 mt-2">
              <div className="w-1/4 mask mask-hexagon grid mx-auto">
                <label htmlFor="fileInput">
                  {
                    file ? (
                      <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="no pic" />

                    ) : (
                      user.photo ? (
                        <img src={PF + user.photo} className="w-full h-full object-cover" alt="no pic" />
                      ) : (
                        <img className="place-self-center" src={imagePlaceholder} alt="no pic" />
                      )
                    )

                  }
                </label>
                <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />

              </div>
              <span className="label-text text-xl text-info  h-fit self-center">{imgUploadMsg}</span>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Name</span>
              </label>
              <input type="text" className="input input-warning"
                value={formData?.fullname} {...register("fullname", { required: true })} onChange={e => setFormData({ ...formData, fullname: e.target.value })}
              />
            </div>
            <div className="form-control">
              <label className="label"><span className="text-xl text-warning">Gender</span></label>
              <select value={formData?.gender} {...register("gender", { required: true })} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="select select-warning">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Education Level</span>
              </label>
              <select value={formData?.education_level}{...register("education_level", { required: true })} onChange={e => setFormData({ ...formData, education_level: e.target.value })} className="select select-warning">
                <option value="postgraduate">Postgraduate</option>
                <option value="undergraduate">Undergraduate</option>
                <option value="seniorsecondaryschool">Senior Secondary School</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Email</span>
              </label>
              <input type="text" className="input input-warning "
                value={formData?.email} {...register("email", { required: true })} onChange={e => setFormData({ ...formData, email: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">GPA</span>
              </label>
              <input type="text" className="input input-warning input-bordered"
                value={formData?.gpa} {...register("gpa", { required: true })} onChange={e => setFormData({ ...formData, gpa: e.target.value })} />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">country</span>
              </label>
              <select value={formData?.country} {...register("country", { required: true })} onChange={e => setFormData({ ...formData, country: e.target.value })} className="select select-warning">
                <option value="kenya">Kenya</option>
                <option value="uganda">Uganda</option>
                <option value="tanzania">Tanzania</option>
              </select>

            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Username</span>
              </label>
              <input type="text" className="input input-warning"
                value={formData?.username} {...register("username", { required: true })} onChange={e => setFormData({ ...formData, username: e.target.value })} />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-warning">Password</span>
              </label>
              <input type="text" className="input input-warning"
                value={formData?.password} {...register("password", { required: true })} onChange={e => setFormData({ ...formData, password: e.target.value })} />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn w-3/4 btn-outline btn-info mx-auto">Update</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Profile;
