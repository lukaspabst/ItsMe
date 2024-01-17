import React from 'react';
import './Backgrounds.scss';

const AbstractBackground = ({inView}) => {

    return (
        <div className="container">
            <img
                src="/assets/backgrounds/About_Background.png"
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

export default AbstractBackground;
