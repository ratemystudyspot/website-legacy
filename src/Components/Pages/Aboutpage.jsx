import React from 'react'
import './Aboutpage.css'
import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/linkedin'
import LogoComponent from '../LogoComponent'

const Aboutpage = () => {
  return (
    <div>  
      <LogoComponent />    
      <div className="about-section">
        <h1 className="title">About us</h1>
        <h6 className="subtitle">We made a website to find study spots at UBC. Enjoy!</h6>
      </div>  

      <h2 className="title">The Two Friends</h2>
      <div className="contact">
        <div className="column">
          <div className="card">
            <img src={require("../Assets/ray.jpg")} alt="Ray"/>
              <div className="container">
                <h2>Ray Zhou</h2>
                <p className="title">Co-Founder</p>
                <p>Made this website because IKB is always full. Feel free to reach out!</p>
                <SocialIcon url="https://www.linkedin.com/in/ray-zhou4/" style={{width:20,height:20}}/>
              </div>
          </div>
        </div>

        <div className="column">
          <div className="card">
            <img src={require("../Assets/leo.jpg")} alt="Leo"/>
              <div className="container">
                <h2>Leo Shang</h2>
                <p className="title">Co-Founder</p>
                <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                <SocialIcon url="https://www.linkedin.com/in/leo-shang-604911267/" style={{width:20,height:20}}/>
              </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Aboutpage