import React from 'react';
import './Backgrounds.scss';

const BackgroundAbout = () => {

    return(
        <div className="container">

            {[...Array(100)].map((_, i) => (
                <div className="circle-container" key={i}>
                    <div className="circle"></div>
                </div>
            ))}

        </div>
    );
};

export default BackgroundAbout;

