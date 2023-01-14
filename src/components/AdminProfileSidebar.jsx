import { useContext } from 'react'
import { FaUser, FaCog, FaMoneyCheckAlt } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { Context } from '../context/Context';

function AdminProfileSidebar() {
    const { user } = useContext(Context);
    return (
        <ul className="menu bg-base-300  items-start justify-start text-xl mt-20px h-full userprofile">
            <li className='w-full'><Link to={`/adminprofile/`}><FaUser /> Profile</Link></li>
            <li><Link to={`/admin/allscholarships`}><FaMoneyCheckAlt />All Scholarships</Link></li>     
            <li><Link to={`/admin/addscholarships`}><FaMoneyCheckAlt /> Add Scholarships</Link></li>                     
            <li><Link to={`/profile/premium`}><FaMoneyCheckAlt />Premium Tier</Link></li>            
        </ul>
    )
}

export default AdminProfileSidebar