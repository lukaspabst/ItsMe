import React from 'react';
import './BarIcon.scss';

const CustomBarsIcon = ({ onIconClick, isActive, setIsActive }) => {


    const handleClick = () => {
        setIsActive(!isActive);
        onIconClick();
    }

    return (
        <div
            className={`custom-bars-icon ${isActive ? 'active' : ''}`}
            onClick={handleClick}
        >
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default CustomBarsIcon;
