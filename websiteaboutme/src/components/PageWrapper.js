import React, {useEffect, useRef, useState} from 'react';
import LandingPage from './Landing/LandingPage';
import AboutPage from './About/About';
import './PageWrapper.scss'
import {CustomArrowIconDown, CustomArrowIconUP} from "../containerElements/CustomArrows/CustomArrows";
import {useGlobalDispatch, useGlobalState} from "../GlobalContext";


function PageWrapper() {
    const sectionRefs = {
        LandingPage: useRef(null),
        AboutPage: useRef(null),
        // add more references as per your sections
    };
    const state = useGlobalState();
    const dispatch = useGlobalDispatch();

    const [currentPage, setCurrentPage] = useState(1);
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
    };

    useEffect(() => {
        scrollToSection(sectionsOrder[state.currentPage - 1]); // Adjust index
    }, [state.currentPage, sectionsOrder]);

    const handleNext = () => {
        if (state.currentPage < sectionsOrder.length) {
            const nextSection = sectionsOrder[state.currentPage];
            scrollToSection(nextSection);
            dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 });
        }
    };

    const handlePrev = () => {
        if (state.currentPage > 1) {
            const prevSection = sectionsOrder[state.currentPage - 2];
            scrollToSection(prevSection);
            dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage - 1 });
        }
    };

    useEffect(() => {
        function handleResize() {
            const currentSectionIndex = sectionsOrder.findIndex(s => !sectionRefs[s].current.getBoundingClientRect().top);
            if (currentSectionIndex !== -1) {
                scrollToSection(sectionsOrder[currentSectionIndex]);
            }
        }

        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
    }, [sectionsOrder]);


    return (
        <div>
                state.currentPage > 1 && (
                    <button className="pagewrapper-prevButton" onClick={handlePrev}>
                        <CustomArrowIconUP/>
                    </button>
                )
            }
            <div id="landingPage" ref={sectionRefs.LandingPage}>
                <LandingPage ref={sectionRefs.LandingPage}/>
            </div>
            <div id="about" ref={sectionRefs.AboutPage}>
                <AboutPage ref={sectionRefs.AboutPage}/>
            </div>
            {
                state.currentPage < sectionsOrder.length && (

                    <button className="pagewrapper-nextButton" onClick={handleNext}>
                        <CustomArrowIconDown/>
                    </button>
                )
            }
        </div>
    );
}

export default PageWrapper;