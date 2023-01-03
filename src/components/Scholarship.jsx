import scholar1 from '../images/scholar1.jpg'
import { Link } from 'react-router-dom';

function Scholarship({ data }) {

    return (
        <div className="card w-80 bg-base-200 shadow-xl">
            <figure className='w-30 justify-center mx-auto pt-2 '><img className='object-fill' src={scholar1} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {data?.name}
                    <div className="badge badge-secondary max-w-fit">{data?.amount}</div>
                </h2>
                <p>Deadline : {data?.deadline_day}</p>
                <div className="card-actions justify-end">
                    <div className="btn btn-outline btn-sm py-2"><Link to={`/profile/scholarship/single/${data?._id}`}>View</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Scholarship