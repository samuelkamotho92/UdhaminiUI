import { useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { Context } from '../context/Context';
import login from "../images/Login.png";
import background from "../images/background.jpg";
import { useMutation } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import wretch from 'wretch';



function AdminLogin() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const { dispatch } = useContext(Context);
  let navigate = useNavigate();
  const AdminLoginMutation = useMutation({
    mutationFn: async (data) => {
      return wretch("https://udhamini-api.azurewebsites.net/api/auth/adminLogin")
        .post(data)
        .json()
        .then((data) => {
          if (data.accessToken) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            navigate("/adminprofile");
          }
        })
        .catch(error => {
          dispatch({ type: 'LOGIN_FAILURE' });
          setError(true);
          setTimeout(() => setError(false), 3000);
        })
    }
  })
  const onSubmit = (data) => {
    AdminLoginMutation.mutate(data);
  }



  return (

    <div className="hero h-fit" >
      <img className="h-screen w-full" src={background} alt="" />
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content ">
        < div className="card flex-shrink-0 w-full  p-2  place-self-center" >
          <div className="card-header">
            <h1 className="text-5xl font-bold  px-2  text-center">Admin 🔐</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} >
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-warning">Username</span>
                </label>
                <input type="text" {...register("username", { required: true })} placeholder="Enter username" className="input input-warning input-lg input-bordered" />
                {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-xl text-warning">Password</span>
                </label>
                <input type="password" {...register("password", { required: true })} placeholder="Enter password" className="input input-warning input-lg input-bordered" />
                {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}
                <label className="label">
                  <Link className="label-text-alt link link-hover text-info" to="/reset">forgot password?</Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-outline btn-warning">Login</button>
              </div>
            </form>
          </div>
        </div >
      </div>
    </div>
    // <div className='grid mt-60px bg-base-200 loginPage'>
    //   {
    //     AdminLoginMutation.isLoading ? (
    //       <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
    //         <div><span className='text-2xl'>😒</span>
    //           <span>Loading!!!</span>
    //         </div>
    //       </div >
    //     ) : (
    //       error && (
    //         <div className="alert alert-error mt-60px shadow-lg w-fit z-50 text-center text-white absolute top-0 right-0" >
    //           <div><span className='text-2xl'>😒</span>
    //             <span>Error! Wrong credentials</span>
    //           </div>
    //         </div >
    //       )
    //     )

    //   }
    //   <div className="hero-content flex-col lg:flex-row-reverse justify-around ">
    //     <div className="hero-content ">
    //       < div className="card flex-shrink-0 w-full max-w-sm shadow-2xl p-2 bg-base-200 place-self-center" >
    //         <div className="card-header loginHeader">
    //           <h1 className="text-5xl font-bold  px-2  text-center">Login  🔐</h1>
    //         </div>
    //         <div className="card-body">
    //           <form onSubmit={handleSubmit(onSubmit)} >
    //             <div className="form-control">
    //               <label className="label">
    //                 <span className="label-text text-xl">Username</span>
    //               </label>
    //               <input type="text" {...register("username", { required: true })} placeholder="Enter username" className="input input-warning input-lg input-bordered" />
    //               {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
    //             </div>
    //             <div className="form-control">
    //               <label className="label">
    //                 <span className="label-text text-xl">Password</span>
    //               </label>
    //               <input type="password" {...register("password", { required: true })} placeholder="Enter password" className="input input-warning input-lg input-bordered" />
    //               {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}
    //               <label className="label">
    //                 <Link className="label-text-alt link link-hover" to="/reset">forgot password?</Link>
    //               </label>
    //             </div>
    //             <div className="form-control mt-6">
    //               <button type="submit" className="btn btn-outline btn-warning">Login</button>
    //             </div>
    //           </form>
    //         </div>
    //       </div >
    //     </div>
    //     <div className="hero-content">
    //       <img alt='no pic' src={login} className="loginImg xs:max-w-xs max-w-lg rounded-lg shadow-2xl" />
    //     </div>
    //   </div>
    // </div>
  )
}

export default AdminLogin

