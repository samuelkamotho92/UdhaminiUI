import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

function About() {
  return (
    <div className='mt-60px'>
      <div className="mockup-window border bg-base-300 mt-8 mx-4">
        <div className="hero min-h-fit bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-screen">
              <h1 className="text-5xl font-bold">What is Udhamini?</h1>
              <p className="py-6 md:text-4xl sm:text-xl">Do you want to continue with your education and money is a problem? worry no more. Udhamini will continuously update you on scholarships from world-class universities all over the world. All you need is just to apply as you wait to be admitted to your dream institution and pursue the course of your dream that enables you to land a good job anywhere in the world.</p>
              <Link className="btn btn-info btn-outline gap-2 btn-sm" to="/register"><FaPencilAlt />Get Started</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About