import React from 'react';
import './CustomArrows.scss'

const CustomArrowIconUP = () => {
    return (
        <div className="chev-icon" style={{"--animation-direction": -1}}>
            <div className="chev-icon-first">
                <div className="chev-bar-left chev-up-left"></div>
                <div className="chev-bar-right chev-up-right"></div>
            </div>
            <div className="chev-icon-second">
                <div className="chev-bar-left chev-up-left"></div>
                <div className="chev-bar-right chev-up-right"></div>
            </div>
            <div className="chev-icon-third">
                <div className="chev-bar-left chev-up-left"></div>
                <div className="chev-bar-right chev-up-right"></div>
            </div>
        </div>
    );
};


const CustomArrowIconDown = () => {
    return (
        <div className="chev-icon" style={{"--animation-direction": 1}}>
            <div className="chev-icon-third" style={{"--animation-delay-multiplier": 1}}>
                <div className="chev-bar-left chev-down-left"></div>
                <div className="chev-bar-right chev-down-right"></div>
            </div>
            <div className="chev-icon-second"style={{"--animation-delay-multiplier": 1}}>
                <div className="chev-bar-left chev-down-left"></div>
                <div className="chev-bar-right chev-down-right"></div>
            </div>
            <div className="chev-icon-first"style={{"--animation-delay-multiplier": 1}}>
                <div className="chev-bar-left chev-down-left"></div>
                <div className="chev-bar-right chev-down-right"></div>
            </div>
        </div>
    );
};


export {CustomArrowIconUP, CustomArrowIconDown};