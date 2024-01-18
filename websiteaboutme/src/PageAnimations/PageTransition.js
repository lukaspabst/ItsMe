//PageTransition used if they scroll more than 1 side
import React, { useEffect, useState } from "react";
import './PageTransition.scss';


const PageTransition = () => {
    const columnDelays = [0.1, 0.2, 0.3, 0.2, 0.1];

    return (
        <div className={`animation-container-columns `}>
            {[...Array(5)].map((_, index) => (
                <div key={index} className="column"/>
            ))}
        </div>
    );
};

export default PageTransition;
