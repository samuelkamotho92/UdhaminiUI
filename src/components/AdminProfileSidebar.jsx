import { useContext } from "react";
import { FaUser, FaCog, FaMoneyCheckAlt, FaUsers, FaPlusSquare, FaShopify, FaReadme } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

function AdminProfileSidebar() {
  const { user } = useContext(Context);
  return (
    <ul className="menu bg-base-300 items-start justify-start text-xl mt-20px h-full userprofile">
      <li >
        <Link to={`/adminprofile/`}>
          <FaUser /> Profile
        </Link>
      </li>
      <li>
        <Link to={`/admin/allscholarships`}>
          <FaReadme />
          Non-Premiums
        </Link>
      </li>
      <li>
        <Link to={`/admin/all-premium-tier`}>
          <FaShopify />
          Premiums
        </Link>

        <Link to={`/admin/users`}>
          <FaUsers /> Users
        </Link>
      </li>
      <li>
        <Link to={`/admin/addscholarships`}>
          <FaPlusSquare /> Add Scholarship
        </Link>
      </li>
    </ul>
  );
}

export default AdminProfileSidebar;
