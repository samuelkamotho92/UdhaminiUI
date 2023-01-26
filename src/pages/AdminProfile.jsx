import { useContext } from 'react';
import imagePlaceholder from '../images/placeholder.png';
import { Context } from '../context/Context';
import AdminProfileSidebar from '../components/AdminProfileSidebar';
import { DeployedURL, PF } from '../components/Constants';

function AdminProfile() {
  const { user } = useContext(Context);

  return (
    <div className='flex flex-row mt-60px md:h-full bg-base-200 '>
      <AdminProfileSidebar />
      <main className='container  grid md:grid-cols-3 sm:grid-cols-1 gap-5 justify-center items-center md:h-full sm:h-full mx-2 mb-3'>
        <div className="avatar ">
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
        <ul className="menu menu-vertical bg-base-200 rounded-box p-2 text-xl">
          <li><a href='#'>Full Names : {user?.fullname}</a></li>
          <li><a href='#'>Age : {user?.age}</a></li>
          <li><a href='#'>Gender : {user?.gender}</a></li>
          <li><a href='#'>Email : {user?.email}</a></li>
          <li><a href='#'>Country of Residence : {user?.country}</a></li>
        </ul>
        <ul className="menu menu-vertical bg-base-200 rounded-box p-2 text-xl justify-center">
          <li><a>Username : {user?.username}</a></li>
          <li><a>Password  : ******</a></li>
        </ul>
      </main>
    </div>
  )
}

export default AdminProfile