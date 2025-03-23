import React, { useState } from "react";
import { Link } from "react-router-dom";

import Sec1Light from "./section1-lightbg.png"
import Sec1Dark from "./section1-darkbg.png"

import "./Home.css";


import banner1 from "./Banner/banner1.png"
import banner2 from "./Banner/banner2.png"
import banner3 from "./Banner/banner3.png"
import banner4 from "./Banner/banner4.png"
import banner5 from "./Banner/banner5.png"

import FingerprintJS from '@fingerprintjs/fingerprintjs';





const Home = () => {

  const [showCommunityLogin,setShowCommunityLogin] = useState(false);

  const [mode, setMode] = useState(true);
  // const adminUniqueId = process.env.REACT_APP_ADMIN_UNIQUE_ID;

// const saveAdminIdentifier = async () => {
//   const fp = await FingerprintJS.load();
//   const result = await fp.get();
//   const visitorId = result.visitorId;

//   // Save the unique ID to local storage
//   localStorage.setItem("adminIdentifier", visitorId);

//   console.log("Unique Admin ID saved:", visitorId);
// };

// saveAdminIdentifier();

// const authenticateAdmin = async () => {
//   const storedId = localStorage.getItem("adminIdentifier");

//   if (!storedId) {
//     console.log("No ID found. Access denied.");
//     return false; // No ID saved; deny access
//   }

//   // Example: Fetch authorized IDs from your server
  
//   console.log("unique id from env: ",adminUniqueId)
//   // const authorizedIds = await response.json();

//   if (adminUniqueId == storedId) {
//     console.log("Access granted: Admin authenticated!");
//     setShowCommunityLogin(true);
//   } else {
//     console.log("Access denied: Unauthorized device.");
//   }
// };

// authenticateAdmin();

  
  return (
    <div className="home-bg">
      <div>
        <div className="section-1" style={{ background: `url(${(mode) ? Sec1Light : Sec1Dark})` }}>

          <div className="header-container">

            <div className="Desc-top-heading">
              <h2>Welcome to our website</h2>
              <h6>single wesbite for multple works</h6>
            </div>


            <div className="header-theme-name">
              <h1>Lightning your</h1>
              <h1>Lightning your</h1>
            </div>
            <div className="header-theme-name">
              <h1>Learning & Career</h1>
              <h1>Learning & Career</h1>
            </div>


            

            <div className="Desc-top">


              we are a community for enhancing learning experience of students and empowering them
              your comprehensive solution for overcoming web developer errors and mastering
              the art of website creation.we are a community not only providing error resolution but career also,
            </div>
          </div>
        </div>
        <div className="section-2">

          {/*    */}
          <h1 style={{marginInline:"150px",fontFamily:"cursive",  padding:"10px" }}>What we provide</h1>
          <div className="key-features">

            {
              // keyFeature.map((feature) => (
              //   <div className="key-feature" key={feature.title}>
              //     <h3>{feature.title}</h3>
              //     <div>{feature.detail}</div>
              //   </div>
              // ))

            }
            <div className="key-feature">
              <img style={{ width: "500px", borderRadius: "10px", height: "100%" }} src={banner1} alt="banner" />
            </div>
            <div className="key-feature">
              <img style={{ width: "500px", borderRadius: "10px", height: "100%" }} src={banner2} alt="banner" />

            </div>
            <div className="key-feature">
              <img style={{ width: "500px", borderRadius: "10px", height: "100%" }} src={banner3} alt="banner" />
            </div>
            <div className="key-feature">
              <img style={{ width: "500px", borderRadius: "10px", height: "100%" }} src={banner4} alt="banner" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
