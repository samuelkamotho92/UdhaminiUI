import { useContext } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import imagePlaceholder from '../images/placeholder.png';
import { Context } from '../context/Context';
import userpic from '../images/kevin profile.jpg';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import '../index.css'

function Profile() {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const PF = "https://udhaminiapi.azurewebsites.net/images/";
  const { user } = useContext(Context);
  const [ userData,setuserDate] = useState(false);
console.log(userData)
  return (
    <div className='flex flex-row mt-60px h-screen bg-base-200 '>
      <UserProfileSidebar />
      <main className='container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center h-screen mx-2 mb-3'>
        
    
        <button
           onClick={()=>setuserDate(userData ? false : true )}
           className='updates btn btn-warning'>Update Data</button> 
{
  userData ? (

       <div className="bg-base-200 w-screen h-full">
        <form >
          <div className="hero-content flex-row lg:flex-row-reverse updateCol">
            <div className="">
              <div className="card ">
                <div className="card-body">
                  <label className="label"> <span className="label-text">Username</span></label>
                  <input type="text" {...register("username", { required: true })} placeholder="Enter username" className="input input-bordered input-md w-full max-w-xs" />
                  {errors.username?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">username is required 😶</p>}
                  <label className="label"><span className="label-text">Password</span></label>
                  <input {...register("password", { required: true })} type="password" placeholder="Enter password**" className="input input-bordered input-md w-full max-w-xs" />
                  {errors.password?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">password is required😶</p>}
                  <label className="label"><span className="label-text">Country of residence</span></label>
                  <select {...register("country", { required: true })} className="select select-bordered w-full max-w-xs">
                    <option selected disabled value="">Select country of residence</option>
                    <option value="kenya">Kenya</option>
                    <option value="uganda">Uganda</option>
                    <option value="tanzania">Tanzania</option>
                  </select>
                  {errors.country?.type === 'required' && <p className="label-text-alt text-red-400 pt-2">country is required😶</p>}
                </div>
              </div>
              <div className="card ">
              <div className='card-header'>
                <div className="avatar">
                  <div className="w-24 mask mask-hexagon place-self-center" >
                    <label htmlFor="fileInput" className='urlimage'>
                      {
                        file ? (
                          <img
                            className="cursor-pointer"
                            src={URL.createObjectURL(file)}
                            alt="invalid Imagefile😒"
                          />
                        ) : (
                          <img className='cursor-pointer' src={imagePlaceholder} alt="nopic" />
                        )
                      }
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                  </div>
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
          </div>
        </form>
      </div>
  
  ):(
 <>
          <div className="avatar bg-base-100 rounded-box p-2 mt-2">
            <div className="w-3/4 mask mask-hexagon grid mx-auto">
              {
                user.profilepic ? (
                  <img src={userpic} className="w-full h-full object-cover" alt='no pic' />
                ) : (
                  <img className='place-self-center' src={imagePlaceholder} alt='no pic' />
                )
              }
              <div>
                <button className='btn btn-accent'>Edit Profile</button>
              </div>

            </div>
          </div>
          <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl">
            <li><a href='#'>Full Names : {user?.fullname}</a></li>
            <li><a href='#'>Age : {user?.age}</a></li>
            <li><a href='#'>Gender : {user?.gender}</a></li>
            <li><a href='#'>Email : {user?.email}</a></li>
            <li><a href='#'>G.P.A : {user?.gpa}</a></li>
            <li><a href='#'>Education Level : {user?.education_level}</a></li>
            <li><a href='#'>Country of Residence : {user?.country}</a></li>
          </ul>
          <ul className="menu menu-vertical bg-base-100 rounded-box p-2 text-xl justify-center">
            <li><a>Username : {user?.username}</a></li>
            <li><a>Password  : ******</a></li>
          </ul>

         
        </> 
  )
}
       

      </main>
    </div>
  )
}

export default Profile