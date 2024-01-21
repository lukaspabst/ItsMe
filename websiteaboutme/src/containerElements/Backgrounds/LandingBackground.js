import React from 'react';
import './Backgrounds.scss';

const LandingBackground = () => {

    return (
        <div className="container">
            <img
                src="/assets/backgrounds/Landing_Background.webp"
                alt="Background"
                className="background"
            />

            {[...Array(100)].map((_, i) => (
                <div className="circle-container" key={i}>
                    <div className="circle"></div>
                </div>
            ))}
        </div>
    );
};

export default LandingBackground;
