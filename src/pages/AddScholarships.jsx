import React from "react";
import AdminProfileSidebar from "../components/AdminProfileSidebar";
import { useState } from "react";
import imagePlaceholder from "../images/placeholder.png";
import { useForm } from "react-hook-form";
import axios from "axios";
function AddScholarships() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const onSubmit = async (data) => {
    try {
      const newUser = {
        fullname: data.fullname,
        age: data.age,
        gender: data.gender,
        education_level: data.education_level,
        gpa: data.gpa,
        country: data.country,
        username: data.username,
        email: data.email,
        password: data.password,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        newUser.profilepic = filename;
        try {
          await axios.post("/upload", data);
        } catch (err) {}
      }

      const res = await axios.post("/auth/register", newUser);
      setSuccess(true);
      setTimeout(() => setError(false), 3000);
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(true);
      setTimeout(() => setError(false), 4000);
    }
  };
  return (
    <div className="flex flex-row mt-60px md:h-full bg-base-200 ">
      <AdminProfileSidebar />
      <main className="container my-3 justify-center items-center h-full m-auto">
        <main className="bg-base-200 mt-60px">
          <div className="hero  bg-base-200">
            <form>
              <div className="hero-content flex-col ">
                <div className="card ">
                  <div className="card-header">
                    <div className="avatar grid">
                      <div className="w-24 rounded place-self-center">
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
                      {errors.location?.type === "required" && (
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
                        <span className="label-text">Schorlaship Tier</span>
                      </label>
                      <select
                        {...register("education_level", { required: true })}
                        className="select select-bordered w-full max-w-xs"
                      >
                        <option selected disabled value="">
                          Select Schorlashp Plan
                        </option>
                        <option value="premium tier">Premium</option>
                        <option value="free tier">Free</option>
                      </select>
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
        </main>
      </main>
    </div>
  );
}

export default AddScholarships;
