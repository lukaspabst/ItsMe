import React, {useState} from "react";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import BackgroundSkills from "../../containerElements/Backgrounds/BackgroundSkills";
import './SkillsPage.scss';

import {FaFileDownload} from "react-icons/fa";
import Skill from "./Skill";

const SkillPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const [isClicked, setIsClicked] = useState(false);
    const { t } = useTranslation();
    const skillsContent = [
        { name: 'HTML', icon: <img src="/Icons/HTML5.svg" alt="HTML5"/>, percentage: 90},
        {name: 'Java', icon: <img src="/Icons/Java.svg" alt="Java"/>,  percentage: 85 },
        { name: 'React', icon: <img src="/Icons/React.svg" alt="React"/>, percentage: 85},
        {name: 'Maven', icon: <img src="/Icons/Apache%20Maven.svg" alt="Maven"/>, percentage: 85},
        {name: 'Spring', icon: <img src="/Icons/Spring.svg" alt="Spring" />, percentage: 85},
        {name: 'JavaScript', icon: <img src="/Icons/JavaScript.svg" alt="JavaScript"/>, percentage: 80},
        {name: 'Node.js', icon: <img src="/Icons/Node.js.svg" alt="NodeJS"/>, percentage: 75},
        {name: 'CSS', icon: <img src="/Icons/CSS3.svg" alt="CSS3"/>, percentage: 75},
        {name: 'Angular', icon: <img src="/Icons/Angular.svg" alt="Angular"/>, percentage: 70},
        {name: 'Jenkins + Groovy', icon: <img src="/Icons/Jenkins.svg" alt="Jenkins"/>, percentage: 70},
        {name: 'JUnit', icon: <img src="/Icons/JUnit.svg" alt="JUnit"/>, percentage: 65},
        {name: 'Python', icon: <img src="/Icons/Python.svg" alt="Python"/>, percentage: 45},
    ];

    const [countdown, setCountdown] = useState(null);
    const [triggerFireworks, setTriggerFireworks] = useState(false);
    const handleClick = (e) => {
        if (isClicked) {
            e.preventDefault();
            return;
        }
        if (!isClicked) {
            setIsClicked(true);
                setCountdown(15);
                setTriggerFireworks(true);
                const intervalId = setInterval(() => {
                    setCountdown(prevCount => prevCount - 1);
                }, 1000);
                // Cancel countdown after 15 seconds and re-enable button
                setTimeout(() => {
                    setTriggerFireworks(false);
                    setIsClicked(false);
                    clearInterval(intervalId);
                    setCountdown(null);
                }, 15000);
            }
        };

        return (
        <div ref={ref}>
            <BackgroundSkills triggerFireworks={triggerFireworks} />
            <div className="skills-container">
                <div className="skills-header">
                    <h1>{t('skillsPage.headline')}</h1>
                </div>
                <div className="grid-container">
                    {skillsContent.map((skill, index) => (
                        <Skill
                            key={index}
                            name={skill.name}
                            icon={skill.icon}
                            percentage={skill.percentage}
                            index={index}
                            inView={inView}
                        />
                    ))}
                </div>
                <div className="download-cv-container">
                    <div className={`button-wrapper ${inView ? 'scale-up' : 'scale-down'}`}>
                        <a href="/CV/Dummy.pdf" download
                           className={`button-cv-download ${isClicked ? 'deactivated' : ''}`} onClick={handleClick}>
                            {!isClicked ? (
                                <>
                                    <FaFileDownload/>
                                    <h1>{t('skillsPage.downloadCV')}</h1>
                                </>
                            ) : (
                                <h1>{t('skillsPage.thankYou',)}{countdown}s</h1>
                            )}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        );
};

export default SkillPage;