import React, {useEffect, useRef, useState} from 'react';
import LandingPage from './Landing/LandingPage';
import AboutPage from './About/About';
import './PageWrapper.scss'
import {CustomArrowIconDown, CustomArrowIconUP} from "../containerElements/CustomArrows/CustomArrows";

function PageWrapper() {
    const sectionRefs = {
        LandingPage: useRef(null),
        AboutPage: useRef(null),
        // add more references as per your sections
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [activeIndex, setActiveIndex] = useState(0);
    let disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
    }
    disableBodyScroll();
    const sectionsOrder = ['LandingPage', 'AboutPage']; // maintain order of your sections

    const scrollToSection = (sectionKey) => {
        const section = sectionRefs[sectionKey];
        if (section && section.current) {
            section.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
    useEffect(() => {
        scrollToSection(sectionsOrder[0]);
    }, []);

    const handleNext = () => {
        if (currentPage < sectionsOrder.length) {
            const nextSection = sectionsOrder[currentPage];  // Use currentPage to get the next section.
            scrollToSection(nextSection);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {  // As your currentPage starts from 1
            const prevSection = sectionsOrder[currentPage - 2];  // Subtract 2 because array is 0-indexed
            scrollToSection(prevSection);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    }
    useEffect(() => {
        function handleResize() {
            const currentSectionIndex = sectionsOrder.findIndex(s => !sectionRefs[s].current.getBoundingClientRect().top);
            if(currentSectionIndex !== -1) {
                scrollToSection(sectionsOrder[currentSectionIndex]);
            }
        }

        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            {
                currentPage > 1 && (
                    <button className="pagewrapper-prevButton" onClick={handlePrev}>
                        <CustomArrowIconUP/>
                    </button>
                )
            }
            <div ref={sectionRefs.LandingPage}>
                <LandingPage ref={sectionRefs.LandingPage}/>
            </div>
            <div ref={sectionRefs.AboutPage}>
                <AboutPage ref={sectionRefs.AboutPage}/>
            </div>
            {
                currentPage < sectionsOrder.length && (
                    <button className="pagewrapper-nextButton" onClick={handleNext}>
                        <CustomArrowIconDown/>
                    </button>
                )
            }
        </div>
    );
}

export default PageWrapper;