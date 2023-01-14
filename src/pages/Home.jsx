import React from 'react';
import slider2 from "../images/slider2.jpg"
import slider1 from "../images/slider1.png"
import slider3 from "../images/slider3.jpg"
import slider4 from "../images/slider4.jpg"
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='justify-center align-center h-full'>
      <div className="carousel w-full h-full">
        <div id="1" className="carousel-item relative w-full ">
          <div className="hero min-h-screen bg-base-200 ">
            <div className="hero-content flex-col lg:flex-row-reverse ">
              <img src={slider2} className="max-w-xl rounded-lg shadow-2xl" alt='no pic' />
              <div className='hero1'>
                <h1 className="text-5xl font-bold">Welcome to Udhamini Community</h1>
                <p className="py-6">Udhamini is a platform where students can get  access to huge collection of Scholarships and apply for them.This bridges the gap between students searching for scholarships online and missing opportunities some of them due to the deadline</p>
                <button className="btn btn-outline btn-warning"><Link to="/register">Register To Get Started</Link></button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows">
            <a href="#2" className="btn btn-circle text-3xl">👈</a>
            <a href="#2" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="2" className="carousel-item relative w-full">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider3} className="max-w-xl rounded-lg shadow-2xl" alt='no pic' />
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
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows1">
            <a href="#1" className="btn btn-circle text-3xl">👈</a>
            <a href="#3" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="3" className="carousel-item relative w-full">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider1} className="max-w-sm rounded-lg shadow-2xl" alt='no pic' />
              <div>
                <h1 className="text-5xl font-bold">Hear from Kevin Comba</h1>
                <p className="py-6 text-xl">I joined Udhamini community, 2022 january after hearing the benefits from a friend.I had a huge school balance which my parents were struggling with. Upon registering i was able to go through various available scolarships and luckily I was able to get <span className='badge text-lg text-yellow-500 font-bold mx-1 py-2'>$10,000 </span>funded my school fees</p>
                <button className="btn btn-info btn-outline"><Link to="/register">Register To Get Started</Link></button>
              </div>
            </div>
          </div>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2 arrows">
            <a href="#2" className="btn btn-circle text-3xl">👈</a>
            <a href="#4" className="btn btn-circle text-3xl">👉</a>
          </div>
        </div>
        <div id="4" className="carousel-item relative w-full">
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
              <img src={slider4} className="max-w-sm h-sm rounded-lg shadow-2xl" alt='no pic' />
              <div>
                <h1 className="text-5xl font-bold">Hear from Denis Wachira</h1>
                <p className="py-6 text-xl">‶ I joined Udhamini community, 2021 may after watching their advert on youtube.My parents were struggling with my fourth year school fees. Upon registering i was able aquire a scolarship worth <span className='badge text-lg text-yellow-500 font-bold mx-1 py-2'>$5,000 </span>funded my school fees. Currently am a software engineer in Microsoft. ″</p>
                <button className="btn btn-info btn-outline"><Link to="/register">Register To Get Started</Link></button>
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