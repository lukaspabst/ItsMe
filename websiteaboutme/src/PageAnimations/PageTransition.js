//PageTransition used if they scroll more than 1 side
import React from "react";
import './PageTransition.scss';


const PageTransition = () => {

    return (
        <div className={`animation-container-columns `}>
            {[...Array(5)].map((_, index) => (
                <div key={index} className="column"/>
            ))}
        </div>
    );
};

export default PageTransition;
