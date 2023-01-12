import { useContext, useState } from 'react';
import UserProfileSidebar from '../components/UserProfileSidebar';
import imagePlaceholder from '../images/placeholder.png';
import { Context } from '../context/Context';
import userpic from '../images/kevin profile.jpg'

function Profile() {
  const PF = "https://udhaminiapi.azurewebsites.net/images/";
  const { user } = useContext(Context);


  return (
    <div className='flex flex-row mt-60px md:h-full bg-base-200 '>
      <UserProfileSidebar />
      <main className='container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center md:h-full sm:h-full mx-2 mb-3'>
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

      </main>
    </div>
  )
}

export default Profile