import { useContext, useState } from "react";
import UserProfileSidebar from "../components/UserProfileSidebar";
import imagePlaceholder from "../images/placeholder.png";
import { Context } from "../context/Context";
import userpic from "../images/kevin profile.jpg";
import { useForm } from "react-hook-form";
import "../index.css";

function Profile() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const PF = "https://udhaminiapi.azurewebsites.net/images/";
  const { user } = useContext(Context);
  const [userData, setuserDate] = useState(false);
  console.log(userData);
  return (
    <div className="flex flex-row mt-60px h-screen bg-base-200 ">
      <UserProfileSidebar />
      <main className="container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center h-screen mx-2 mb-3">
        <button
          onClick={() => setuserDate(userData ? false : true)}
          className="updates btn btn-warning"
        >
          Update Data
        </button>
        {userData ? (
          <div className="bg-base-200 w-screen h-full mt-20">
            <form>
              <div className="hero-content flex-col ">
                <div className="card ">
                  <div className="card-header ">
                    <div className="avatar grid">
                      <div className="w-14 rounded place-self-center">
                        <label htmlFor="fileInput">
                          {file ? (
                            <img
                              className="cursor-pointer"
                              src={URL.createObjectURL(file)}
                              alt="invalid Imagefile😒"
                            />
                          ) : (
                            <img
                              className="cursor-pointer"
                              src={imagePlaceholder}
                              alt="nopic"
                            />
                          )}
                        </label>
                        <input
                          type="file"
                          id="fileInput"
                          style={{ display: "none" }}
                          onChange={(e) => setFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-body md:flex-row sm:flex-col lg:flex-row">
                    <div>
                      <label className="label">
                        <span className="label-text">Scholarship Name</span>
                      </label>
                      <input
                        type="text"
                        {...register("fullname", { required: true })}
                        placeholder="Scholarship"
                        className="input input-bordered "
                      />
                      <label className="label">
                        <span className="label-text">Study level</span>
                      </label>
                      <select
                        {...register("education_level", { required: true })}
                        className="select select-bordered w-full max-w-xs"
                      >
                        <option selected disabled value="">
                          Select Study level
                        </option>
                        <option value="phd">PHD</option>
                        <option value="postgraduate">Master</option>
                        <option value="undergraduate">Degree</option>
                      </select>
                      {errors.education_level?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          study level is required 😶
                        </p>
                      )}

                      <label className="label">
                        <span className="label-text">Link</span>
                      </label>
                      <input
                        type="text"
                        {...register("age", { required: true })}
                        placeholder="Enter url"
                        className="input input-bordered"
                      />
                      {errors.age?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Link is required 😶
                        </p>
                      )}
                    </div>
                    <div className="md:ml-4 lg:ml-4">
                      <label className="label">
                        <span className="label-text">Deadline</span>
                      </label>
                      <input
                        type="text"
                        {...register("gpa", { required: true })}
                        placeholder="Deadline"
                        className="input input-bordered"
                      />
                      {errors.gpa?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Location is required 😶
                        </p>
                      )}
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        {...register("gpa", { required: true })}
                        placeholder="Location"
                        className="input input-bordered"
                      />
                      {errors.gpa?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Location is required 😶
                        </p>
                      )}
                      {errors.email?.type === "pattern" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          invalid email😶
                        </p>
                      )}
                      <label className="label">
                        <span className="label-text">Location</span>
                      </label>
                      <input
                        type="text"
                        {...register("gpa", { required: true })}
                        placeholder="Enter Location"
                        className="input input-bordered"
                      />
                      {errors.gpa?.type === "required" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          Location is required 😶
                        </p>
                      )}
                      {errors.email?.type === "pattern" && (
                        <p className="label-text-alt text-red-400 pt-2">
                          invalid email😶
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-control mt-3 grid">
                    <button
                      type="submit"
                      className="btn btn-outline max-w-md place-self-center w-full"
                    >
                      Add Scholarship
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <>
            <div className="avatar bg-base-100 rounded-box p-2 mt-2">
              <div className="w-3/4 mask mask-hexagon grid mx-auto">
                {user.profilepic ? (
                  <img
                    src={userpic}
                    className="w-full h-full object-cover"
                    alt="no pic"
                  />
                ) : (
                  <img
                    className="place-self-center"
                    src={imagePlaceholder}
                    alt="no pic"
                  />
                )}
                <div>
                  <button className="btn btn-accent">Edit Profile</button>
                </div>
              </div>
            </div>
            <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl">
              <li>
                <a href="#">Full Names : {user?.fullname}</a>
              </li>
              <li>
                <a href="#">Age : {user?.age}</a>
              </li>
              <li>
                <a href="#">Gender : {user?.gender}</a>
              </li>
              <li>
                <a href="#">Email : {user?.email}</a>
              </li>
              <li>
                <a href="#">G.P.A : {user?.gpa}</a>
              </li>
              <li>
                <a href="#">Education Level : {user?.education_level}</a>
              </li>
              <li>
                <a href="#">Country of Residence : {user?.country}</a>
              </li>
            </ul>
            <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl justify-center">
              <li>
                <a>Username : {user?.username}</a>
              </li>
              <li>
                <a>Password : ******</a>
              </li>
            </ul>
          </>
        )}
      </main>
    </div>
  );
}

export default Profile;
