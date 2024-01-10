
import React from 'react';
import AbstractBackground from '../../containerElements/Backgrounds/AbstractBackground';
import './About.scss'

const About = () => (
    <div>
        <AbstractBackground />

       <div className="aboutMe-wrapper">
        <h1>About Me</h1>
        <p>This is where you can provide information about yourself.</p>
       </div>
    </div>
);

export default About;
