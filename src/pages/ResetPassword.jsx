import { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
// import { Context } from '../context/Context';
import reset from "../images/reset.png";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Context } from '../context/Context';
import { Link } from 'react-router-dom';



function ResetPassword() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const { dispatch } = useContext(Context);

  const loginMutation = useMutation({
    mutationFn: async (data) => {
      return axios
        .post('https://udhamini-api.azurewebsites.net/api/auth/userLogin', data).then(
          (response) => {
            if (response.data.accessToken) {
              dispatch({ type: 'LOGIN_SUCCESS', payload: response?.data });
              window.location.replace(`/profile`);
            }
            return response.data;
          }
        ).catch(
          (error) => {
            dispatch({ type: 'LOGIN_FAILURE' });
            setError(true);
            setTimeout(() => setError(false), 3000);
          }
        )
    }

  })
  const onSubmit = (data) => {
    loginMutation.mutate(data);
  }



  return (
    <div className='grid mt-60px bg-base-200 h-fit resetPage'>
      {/* {
        loginMutation.isLoading ? (
          <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
            <div><span className='text-2xl'>😒</span>
              <span>Loading!!!</span>
            </div>
          </div >
        ) : (
          error && (
            <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
              <div><span className='text-2xl'>😒</span>
                <span>Error! Wrong credentials</span>
              </div>
            </div >
          )
        )

      } */}
      <div className="hero-content flex-col lg:flex-row-reverse justify-around ">
        <div className="hero-content ">
          < div className="card flex-shrink-0  max-w-sm shadow-2xl p-2  place-self-center" >
            <div className="card-header">
              <h3 className="text-4xl font-bold  px-2 xs:text-3xl">Reset Password 🔐 </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)} >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-3xl">Email</span>
                  </label>
                  <input type="email" {...register("email", { required: true })} placeholder="Enter Email" className="input input-warning input-lg input-bordered" />
                  {errors.email?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">email is required 😶</p>}
                </div>               
                <div className="form-control mt-6">
                  <button type="submit" className="btn btn-outline btn-warning">Reset </button>
                </div>
              </form>
            </div>
          </div >
        </div>
        <div className="hero-content ">
          <img alt='no pic' src={reset} className=" resetImg max-w-lg rounded-lg shadow-2xl" />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword

