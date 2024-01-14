import React, {useEffect, useState} from 'react';
import './Backgrounds.scss';
const BackgroundSkills = ({ triggerFireworks }) => {

    return (
        <div className="container">
            <div className="skills-background-container">





                {triggerFireworks && (
                    <div className="fireworks-container">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className={`pattern${i} fireworks fire${i}`}>
                                <div className="ring_1"></div>
                                <div className="ring_2"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BackgroundSkills;
