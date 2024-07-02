import React from "react"
import "./Aboutpage.scss"
import { SocialIcon } from "react-social-icons/component"
import "react-social-icons/linkedin"
import LogoComponent from "../Components/LogoComponent"
import Banner from "../Components/Banner/Banner"
import { Navigate } from "react-router-dom"
import { Button } from "react-bootstrap"

const Aboutpage = () => {
  return (
    <div className="about-box">
      <Banner showGoBackButton={true} additionalStyle={{boxShadow:"none"}}/>
      <div className="about-box__large-banner">
        <h1 className="about-box__title">
          About Us
        </h1>
        <h3 className="about-box__description">
          Welcome to Rate My Study Spot, built by students for students
        </h3>
      </div>
      <div className="about-box__card-box">
        <div className="about-box__developer-cards">
          <div className="about-box__developer-banner">
            
            <img className="about-box__pfp" src={require("../Components/Assets/ray.jpg")} alt="Ray"/>

            <div className="text">
                <h3 className="about-box__developer-username">
                  Ray Zhou
                </h3>
                <h5 className="about-box__developer-role">
                  Co-founder
                </h5>
            </div>

            <div className="about-box__social-media-directory">
              <img className="about-box__icon" onClick={() => {window.open("https://www.linkedin.com/in/ray-zhou4/")}} src={require("../Components/Assets/linkedInIcon.webp")} alt="LinkedIn"/>
              <img className="about-box__icon" onClick={() => {window.open("https://github.com/rayzhou4")}} src={require("../Components/Assets/GitHubIcon.webp")} alt="GitHub"/>
              <img className="about-box__icon" onClick={() => {window.open("https://www.instagram.com/ray.zhouuu/")}} src={require("../Components/Assets/InstagramIcon.webp")} alt="Instagram"/>
            </div>
          </div>
            <p className="about-box__developer-description">
              Hey! I'm Ray, a student at University of British Columbia. 
              I love playing basketball and programming, and so for this project I mainly worked on the back-end servers and front-end features development! 
              Feel free to reach out on LinkedIn!
            </p>
        </div>
        <div className="about-box__developer-cards">
          <div className="about-box__developer-banner">
              <img className="about-box__pfp" src={require("../Components/Assets/leo.jpg")} alt="Leo"/>
              
              <div className="text">
                  <h3 className="about-box__developer-username">
                    Leo Shang
                  </h3>
                  <h5 className="about-box__developer-role">
                    Co-founder
                  </h5>
              </div>
            <div className="about-box__social-media-directory">
              <img className="about-box__icon" onClick={() => {window.open("https://www.linkedin.com/in/leo-shang-604911267/")}} src={require("../Components/Assets/linkedInIcon.webp")} alt="LinkedIn"/>
              <img className="about-box__icon" onClick={() => {window.open("https://github.com/LeoShangTang")}} src={require("../Components/Assets/GitHubIcon.webp")} alt="GitHub"/>
              <img className="about-box__icon" onClick={() => {window.open("https://www.instagram.com/le.o.shang/")}} src={require("../Components/Assets/InstagramIcon.webp")} alt="Instagram"/>
            </div>
          </div>
            <p className="about-box__developer-description">
              Hi! I'm Leo, a student at the University of British Columbia. I love playing badminton and graphic design. 
              For this personal project, I mainly worked on the front-end development and the UI design! 
              Feel free to reach out to me on LinkedIn if you have any questions or suggestions!
            </p>
        </div>
      </div>
    </div>
  ) 
}

// const Aboutpage = () => {
//   return (
//     <div>     
//       <div className="about-section">
//         <h1 className="title">About us</h1>
//         <h6 className="subtitle">We made a website to find study spots at UBC. Enjoy!</h6>
//       </div>  

//       <h2 className="title">The Two Friends</h2>
//       <div className="contact">
//         <div className="column">
//           <div className="card">
//             <img src={require("../Components/Assets/ray.jpg")} alt="Ray"/>
//               <div className="container">
//                 <h2>Ray Zhou</h2>
//                 <p className="title">Co-Founder</p>
//                 <p>Made this website because IKB is always full. Feel free to reach out!</p>
//                 <SocialIcon url="https://www.linkedin.com/in/ray-zhou4/" style={{width:20,height:20}}/>
//               </div>
//           </div>
//         </div>

//         <div className="column">
//           <div className="card">
//             <img src={require("../Components/Assets/leo.jpg")} alt="Leo"/>
//               <div className="container">
//                 <h2>Leo Shang</h2>
//                 <p className="title">Co-Founder</p>
//                 <p>Some text that describes me lorem ipsum ipsum lorem.</p>
//                 <SocialIcon url="https://www.linkedin.com/in/leo-shang-604911267/" style={{width:20,height:20}}/>
//               </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   )
// }

export default Aboutpage