import React, {useEffect, useRef} from 'react';
import LandingPage from './Landing/LandingPage';
import AboutPage from './About/About';
import './PageWrapper.scss'
import {CustomArrowIconDown, CustomArrowIconUP} from "../containerElements/CustomArrows/CustomArrows";
import {useGlobalDispatch, useGlobalState} from "../GlobalContext";
import SkillsPage from "./Skills/SkillsPage";


function PageWrapper() {
    const sectionRefs = {
        LandingPage: useRef(null),
        AboutPage: useRef(null),
        SkillsPage: useRef(null),
    };

    const state = useGlobalState();
    const dispatch = useGlobalDispatch();

    let disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
    }
    disableBodyScroll();
    const sectionsOrder = ['LandingPage', 'AboutPage','SkillsPage'];

    const scrollToSection = (sectionKey) => {
        const section = sectionRefs[sectionKey];
        if (section && section.current) {
            section.current.scrollIntoView({
                behavior: 'smooth'
            });
        }
    };

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
            const currentSectionRef = sectionRefs[sectionsOrder[state.currentPage - 1]];
            if (currentSectionRef && currentSectionRef.current) {
                currentSectionRef.current.scrollIntoView({
                    behavior: 'smooth',
                });
            }
        }
        window.addEventListener('load', () => {
            scrollToSection(sectionsOrder[0]);
            dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
        });

        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', () => {
                scrollToSection(sectionsOrder[0]);
                dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
            });
        };
    }, [sectionsOrder, state.currentPage]);


    return (
        <div>
            {
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
            <div id="skills" ref={sectionRefs.SkillsPage}>
                <SkillsPage ref={sectionRefs.SkillsPage}/>
            </div>
            {
                state.currentPage < sectionsOrder.length && (
                    <button
                        className={`pagewrapper-nextButton ${state.currentPage === 2 ? "about-next-button" : ""}`}
                        onClick={handleNext}
                    >
                        <CustomArrowIconDown/>
                    </button>
                )
            }
        </div>
    );
}

export default PageWrapper;