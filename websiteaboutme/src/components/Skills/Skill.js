import React, { useEffect, useState } from 'react';

const Skill = ({ name, icon, percentage, index, inView }) => {
    const [animationClass, setAnimationClass] = useState('');
    const progressBarAnimation =
        inView &&   `progress-forward var(--time) linear forwards ${index * 0.5}s`;
    useEffect(() => {
        if (inView) {
            setAnimationClass(index % 2 === 0 ? 'fly-in-left' : 'fly-in-right');
        } else {
            setAnimationClass(index % 2 === 0 ? 'fly-out-left' : 'fly-out-right');
        }
    }, [inView, index]);

        return (
            <div className={`skill-container ${animationClass}`}  style={{animationDelay: animationClass.includes('fly-out') ? '0s' : `${index * 0.5}s`,
                opacity: animationClass.includes('fly-in') ? 0 : 1
            }}>
                <div className="skill-icon">
                    {icon}
                </div>
                <div className="skill-bar">
                    <div className="skill-progress-bar">
                        <div
                            className="skill-progress-bar-fill"
                            style={{
                                '--width': `${percentage}%`,
                                '--time': `${percentage * 3 / 100}s`,
                                animation: progressBarAnimation || 'none',
                                background: percentage > 75
                                    ? 'linear-gradient(\n' +
                                    '                  90deg,\n' +
                                    '                  rgba(34, 193, 195, 1) 0%,\n' +
                                    '                  var(--tertiary-color) 100%\n' +
                                    '  )'
                                    : (percentage > 50
                                            ? 'linear-gradient(\n' +
                                            '                  90deg,\n' +
                                            '                  rgba(34, 193, 195, 1) 0%,\n' +
                                            '                  var(--secondary-color) 100%\n' +
                                            '  )'
                                            : 'linear-gradient(\n' +
                                            '                  90deg,\n' +
                                            '                  rgba(34, 193, 195, 1) 0%,\n' +
                                            '                  var(--primary-color) 100%\n' +
                                            '  )'
                                    )
                            }}
                        />
                        <div className="skill-name">
                            {name}
                        </div>
                    </div>
                </div>
            </div>
        )
            ;
    };

export default Skill;