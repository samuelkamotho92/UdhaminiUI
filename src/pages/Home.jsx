import React from 'react';
import slider2 from "../images/slider2.jpg"
import slider1 from "../images/kevin.png"
import slider3 from "../images/slider3.jpg"
import slider4 from "../images/Charity.png"
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='justify-center align-center h-full   bg-base-150'>
      <div className="carousel w-full md:h-fit ">
        <div id="1" className="carousel-item relative w-full h-fit ">
          <div className="hero h-fit ">
            <div className="hero-content flex-col lg:flex-row-reverse ">
              <img src={slider2} className="max-w-2xl rounded-lg shadow-2xl" alt='no pic' />
              <div className='hero1'>
                <h1 className="text-5xl font-bold">Welcome to Udhamini Community</h1>
                <p className="py-6">Udhamini is a platform where students can get  access to huge collection of Scholarships and apply for them.This bridges the gap between students searching for scholarships online and missing opportunities some of them due to the deadline</p>
                <button className="btn btn-outline btn-warning"><Link to="/register">Register To Get Started</Link></button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows">
            <a href="#4" className="btn btn-circle text-3xl">👈</a>
            <a href="#2" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="2" className="carousel-item relative w-full h-fit">
          <div className="hero ">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider3} className="max-w-2xl rounded-lg shadow-2xl" alt='no pic' />
              <div className='hero2'>
                <h1 className="text-5xl font-bold">Our Goals 🤝</h1>
                <div className="py-6 text-xl">
                  <ul>
                    <li>🎇 To increase accessibility of scholarships</li>
                    <li>🎇 Help Students achieve their dreams</li>
                    <li>🎇 Create a thriving community</li>
                  </ul>
                </div>
                <button className="btn btn-info btn-outline"><Link to="/register">Register To Get Started</Link></button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows">
            <a href="#1" className="btn btn-circle text-3xl">👈</a>
            <a href="#3" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="3" className="carousel-item relative w-full">
          <div className="hero h-fit  ">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider1} className="max-w-lg rounded-lg shadow-2xl" alt='no pic' />
              <div className='hero2 '>
                <h1 className="text-5xl font-bold">Confession 🤝</h1>
                <div className="py-6 text-xl">
                  <h1 className="text-xl font-bold">Hear from Kevin Comba</h1>
                  <p className="py-6 text-md">I joined jan 2023 after hearing the benefits from a friend. I got <span className='badge text-lg text-yellow-500 font-bold mx-1 py-2'>$10,000 </span>funded my school fees</p>
                  <Link className="btn btn-info btn-sm btn-outline" to="/register">Get Started</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows">
            <a href="#2" className="btn btn-circle text-3xl">👈</a>
            <a href="#4" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="4" className="carousel-item relative w-full">
          <div className="hero h-fit  ">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider4} className="max-w-xl rounded-lg shadow-2xl" alt='no pic' />
              <div className='hero2'>
                <h1 className="text-5xl font-bold">Confession🤝</h1>
                <div className="py-6 text-xl">
                  <h1 className="text-xl font-bold">Hear from Charity Jelimo</h1>
                  <p className="py-6 text-md">I joined dec 2022 and got a <span className='badge text-lg text-yellow-500 font-bold mx-1 py-2'>Masters Scholarship </span>at KYU</p>
                  <Link className="btn btn-info btn-sm btn-outline" to="/register">Get Started</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows">
            <a href="#3" className="btn btn-circle text-3xl">👈</a>
            <a href="#1" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home