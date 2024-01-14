import React from 'react';
import './Backgrounds.scss';
const BackgroundAbout = () => {


    return(
        <div className="container">
            <section>
                <div className='air air1'></div>
                <div className='air air2'></div>
                <div className='air air3'></div>
                <div className='air air4'></div>
            </section>

            {[...Array(100)].map((_, i) => (
                <div className="circle-container" key={i}>
                    <div className="circle"></div>
                </div>
            ))}

        </div>
    );
};

export default BackgroundAbout;

