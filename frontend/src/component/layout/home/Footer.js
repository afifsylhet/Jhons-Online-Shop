import React from "react";
import playStoreDownloadBage from "../../../images/playStoreDownloadBage.png";
import appStoreDownloadBage from "../../../images/appStoreDownloadBage.png";


const Footer = () => {
  return (
    <div className="bg-secondary text-white d-flex flex-column align-items-center flex-lg-row justify-content-between">
      <div className="p-4 text-center"> 
        <p className="fw-semibold"> DOWNLOAD OUR APP</p>
        <p className="fw-semibold"> Downoad app for ios and Andriod mobile phone</p>
        <img
          src={playStoreDownloadBage}
          alt="Play store downlade bage"
          height="80px"
          className="d-inline-block align-top text-center"
        />
        <br/>
        <img
          src={appStoreDownloadBage}
          alt="app store downlade bage"
          height="80px"
          className="d-inline-block align-top text-center"
        />
      </div>
      <div className="p-4 text-center "> 
        <h3 className="fw-semibold">JHONS ONLINE SHOP</h3>
        <p>High Quality is our first priority</p>
        <p> Copyright &copy; 2023 Afif Ahmed</p>
      </div>
      
      <div className="p-4 text-center"> 
        <h3 style={{textDecoration: "underline"}}>Follow Us</h3>
        <p>Facebook</p>
        <p>Instagram</p>
        <p>YouTube</p>
      </div>
    </div>
  );
};

export default Footer;
