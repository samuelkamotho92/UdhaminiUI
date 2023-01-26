import { useContext } from "react";
import { Context } from "./context/Context";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import About from './pages/About';
import Profile from './pages/Profile';
import Premium from './pages/Premium';
import ResetPassword from './pages/ResetPassword';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './pages/AdminProfile';
import Scholarships from './pages/Scholarships';
import Scholarship from './pages/Scholarship';
import AddScholarships from './pages/AddScholarships';
import AllScholarship from './pages/AllScholarship';
import AllPremium from './pages/AllPremium';
import AllUsers from './pages/AllUsers'
import Pay from './pages/Pay';
import './App.css'
import PremiumScholarshipCard from './components/PremiumScholarshipCard';

function App() {
  const { user } = useContext(Context);
  const queryClient = new QueryClient()
  return (
    <BrowserRouter>
      <div className="flex flex-col justify-between h-screen">
        <Header />
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="about" element={<About />} />
            <Route path="reset" element={<ResetPassword />} />
            <Route path="profile" element={user ? <Profile /> : <Home />} />
            <Route path="profile/pay" element={user ? <Pay /> : <Home />} />
            <Route path="profile/scholarships" element={user ? <Scholarships /> : <Home />} />
            <Route path="profile/scholarships/single/:id" element={user ? <Scholarship /> : <Home />} />
            <Route path="profile/premium" element={user ? <Premium /> : <Home />} />
            <Route path="profile/premium/single/:id" element={user ? <PremiumScholarshipCard /> : <Home />} />
            <Route path="adminLogin" element={<AdminLogin />} />
            <Route path="adminprofile" element={<AdminProfile />} />
            <Route path="admin/allscholarships" element={<AllScholarship />} />
            <Route path="admin/addscholarships" element={<AddScholarships />} />
            <Route path="admin/all-premium-tier" element={<AllPremium />} />
            <Route path="admin/users" element={<AllUsers />} />
            <Route path="*"
              element={
                <div className="shadow-lg grid place-self-center mt-20 py-20 w-3/4 mx-auto text-white  justify-center text-center">
                  <p className="text-7xl pt-3 m-3">😮404😮</p>
                  <p className="text-lg  m-2">There's nothing here!</p>
                  <Link className="btn btn-accent text-2xl" to="/">
                    🏡Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </QueryClientProvider>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
