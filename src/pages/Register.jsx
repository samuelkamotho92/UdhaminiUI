import { useState } from 'react'
import { useMutation } from '@tanstack/react-query';
import imagePlaceholder from '../images/placeholder.png'
import { useForm } from "react-hook-form";
import wretch from "wretch";
import { ThreeDots } from 'react-loading-icons'
import axios from 'axios';
import { DeployedURL } from '../components/Constants';

function Register() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [imgUploadMsg, setImgUploadMsg] = useState(null);
  const [successMgs, setSuccessMgs] = useState(null);
  const [file, setFile] = useState(null);

  const RegisterMutation = useMutation({
    mutationFn: async (data) => {
      wretch(`${DeployedURL}/users/register`)
        .post(data).json()
        .then((data) => {
          setSuccessMgs(data);
          setTimeout(() => setSuccessMgs(false), 4000);
        })
        .catch(error => { setError(error); setTimeout(() => setError(false), 3000); })
    }
  })

  const onSubmit = async (data) => {
    if (file) {
      let filename = Date.now() + file.name;
      let formData = new FormData();
      formData.append("name", filename);
      formData.append("file", file);
      data.photo = filename;
      // console.log(file);
      axios.post(`${DeployedURL}/upload`, formData)
        .then(response => {
          setImgUploadMsg(response?.data);
          formData = null;
        })
        .catch(error => { console.log(error.message) })
    }

    RegisterMutation.mutate(data);
  };
  return (
    <main className='bg-base-200 mt-60px'>
      {
        RegisterMutation.isLoading ?
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
                    <span>User registered Successfully</span>
                  </div>
                </div>
              )
            )
          )
      }
      <div className="hero-content">
        <h1 className="text-5xl font-bold xs:text-4xl registerHeader">✍️  Register now!</h1>
      </div>
      <div className="hero  bg-base-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <div className="card">
                <div className="card-body">
                  <label className="label"> <span className="label-text">Username</span></label>
                  <input type="text" {...register("username", { required: true })} placeholder="Enter username" className="input input-bordered input-md w-full max-w-xs" />
                  {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
                  <label className="label"><span className="label-text">Password</span></label>
                  <input {...register("password", { required: true })} type="password" placeholder="Enter password**" className="input input-bordered input-md w-full max-w-xs" />
                  {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}
                  <label className="label"><span className="label-text">Country of residence</span></label>
                  <input {...register("country", { required: true })} type="text" placeholder="Enter your Country" className="input input-bordered input-md w-full max-w-xs" />

                  {errors.country?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">country is required😶</p>}
                </div>
              </div>
            </div>
            <div className="card ">
              <div className='card-header'>
                <div className="avatar grid">
                  <div className="w-24 mask mask-hexagon place-self-center" >
                    <label htmlFor="fileInput">
                      {
                        file ? (
                          <img
                            className="cursor-pointer"
                            src={URL.createObjectURL(file)}
                            alt="invalid ImageFile😒"
                          />
                        ) : (
                          <img className='cursor-pointer' src={imagePlaceholder} alt="nopic" />
                        )
                      }
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />

                  </div>
                  <label htmlFor="">{imgUploadMsg}</label>


                </div>
              </div>
              <div className="card-body md:flex-row sm:flex-col lg:flex-row">
                <div>
                  <label className="label"><span className="label-text">Full Names</span></label>
                  <input type="text" {...register("fullname", { required: true })} placeholder="Enter your names" className="input input-bordered " />
                  {errors.fullname?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">fullname is required 😶</p>}
                  <label className="label"><span className="label-text">Age</span></label>
                  <input type="text" {...register("age", { required: true })} placeholder="Enter your age" className="input input-bordered" />
                  {errors.age?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">age is required 😶</p>}
                  <label className="label"><span className="label-text">GPA</span></label>
                  <input type="text" {...register("gpa", { required: true })} placeholder="Enter your gpa" className="input input-bordered" />
                  {errors.gpa?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">gpa is required 😶</p>}
                </div>
                <div className='md:ml-4 lg:ml-4'>
                  <label className="label"><span className="label-text">Gender</span></label>
                  <select {...register("gender", { required: true })} className="select select-bordered w-full max-w-xs">
                    <option selected disabled value="" >Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">gender is required 😶</p>}
                  <label className="label"><span className="label-text">Email</span></label>
                  <input {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} type="text" placeholder="Enter your email" className="input input-bordered" />
                  {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}{errors.email?.type === 'pattern' && <p className="label-text-alt text-red-400 pt-2">invalid email😶</p>}
                  <label className="label"><span className="label-text">Education level</span></label>
                  <select {...register("education_level", { required: true })} className="select select-bordered w-full max-w-xs">
                    <option selected disabled value="">Select education level</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="seniorsecondaryschool">Senior Secondary School</option>
                  </select>
                  {errors.education_level?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">education level is required 😶</p>}
                </div>
              </div>
              <div className="form-control mt-3 grid">
                <button type="submit" className="btn btn-outline max-w-md place-self-center w-full">Register</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main >
  )
}

export default Register