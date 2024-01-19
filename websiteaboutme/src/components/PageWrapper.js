import React, {useEffect, useRef} from 'react';
import LandingPage from './Landing/LandingPage';
import AboutPage from './About/About';
import './PageWrapper.scss'
import {CustomArrowIconDown, CustomArrowIconUP} from "../containerElements/CustomArrows/CustomArrows";
import {useGlobalDispatch, useGlobalState} from "../GlobalContext";
import SkillsPage from "./Skills/SkillsPage";
import ProjectsPage from "./Projects/Projects";
import ContactPage from "./Contact/Contact";



function PageWrapper() {
    const sectionRefs = {
        LandingPage: useRef(null),
        AboutPage: useRef(null),
        SkillsPage: useRef(null),
        ProjectsPage: useRef(null),
        ContactPage: useRef(null),
    };

    const state = useGlobalState();
    const dispatch = useGlobalDispatch();
    let disableBodyScroll = () => {
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100%';
    }
    disableBodyScroll();
    const sectionsOrder = ['LandingPage', 'AboutPage','SkillsPage','ProjectsPage','ContactPage'];

    const scrollToSection = (sectionKey,direction) => {
        const section = sectionRefs[sectionKey];
        if (section && section.current) {
            section.current.scrollIntoView({
                behavior: 'smooth'
            });
            if(direction==="next"){
                dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage + 1 });
            } else if(direction==="prev"){
                dispatch({ type: 'SET_CURRENT_PAGE', payload: state.currentPage - 1 });
            }
        }

    };
    console.log(state.currentPage);
    const handleNext = () => {
        if (state.currentPage < sectionsOrder.length) {
            const nextSection = sectionsOrder[state.currentPage];
            scrollToSection(nextSection, "next");

        }
    };

    const handlePrev = () => {
        if (state.currentPage > 1) {
            const prevSection = sectionsOrder[state.currentPage - 2];
            scrollToSection(prevSection,"prev");
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

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', () => {
                scrollToSection(sectionsOrder[0]);
                dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });
            });
        };
    }, [sectionsOrder, state.currentPage]);

    const touchStartY = useRef(null);
    const handleTouchStart = (event) => {
        touchStartY.current = event.touches[0].clientY;
    };
    const handleTouchMove = (event) => {
        if (touchStartY.current === null || !isTouchAllowed.current) {
            return;
        }

        const deltaY = touchStartY.current - event.touches[0].clientY;
        const swipeThreshold = 10;

        if (Math.abs(deltaY) > swipeThreshold) {
            event.preventDefault();
            isTouchAllowed.current = false;

            const targetElement = event.target.closest('.overflow-y');

            const hasVerticalOverflow = targetElement
                ? targetElement.scrollHeight > targetElement.clientHeight &&
                window.getComputedStyle(targetElement).overflowY !== 'visible'
                : false;

            if ((!targetElement && !hasVerticalOverflow) || (targetElement && !hasVerticalOverflow)) {
                if (deltaY > 0) {
                    handleNext();
                } else if (deltaY < 0) {
                    handlePrev();
                }
            }

            setTimeout(() => {
                isTouchAllowed.current = true;
            }, 750);
        }
    };

    const handleTouchEnd = () => {
        touchStartY.current = null;
    };

    const handleWheel = (event) => {
        if (!isWheelEventAllowed.current) {
            return;
        }
        isWheelEventAllowed.current = false;

        const targetElement = event.target.closest('.overflow-y');

        const hasVerticalOverflow = targetElement
            ? targetElement.scrollHeight > targetElement.clientHeight &&
            window.getComputedStyle(targetElement).overflowY !== 'visible'
            : false;

        if ((!targetElement && !hasVerticalOverflow) ||(targetElement && !hasVerticalOverflow))  {

                if (event.deltaY > 10) {
                    handleNext();
                } else if (event.deltaY < -10) {
                    handlePrev();
                }

        }

        setTimeout(() => {
            isWheelEventAllowed.current = true;
        }, 1000);
    };
    const isWheelEventAllowed = useRef(true);
    const isTouchAllowed = useRef(true);

    useEffect(() => {
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('wheel', handleWheel, { passive: false });
        return () => {
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [handleNext, handlePrev]);

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
            <div id="projects" ref={sectionRefs.ProjectsPage}>
                <ProjectsPage ref={sectionRefs.ProjectsPage}/>
            </div>
            <div id="contact" ref={sectionRefs.ContactPage}>
                <ContactPage ref={sectionRefs.ContactPage}/>
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