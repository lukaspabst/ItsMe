import React, {useState} from "react";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import BackgroundSkills from "../../containerElements/Backgrounds/BackgroundSkills";
import './Projects.scss'
import Project from "./Project";
import {
    FaAngleLeft,
    FaAngleRight,
    FaAnglesLeft,
    FaAnglesRight,
    FaArrowRightLong,
    FaRightToBracket
} from "react-icons/fa6";
import {Link} from "react-router-dom";

const ProjectsPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const { t } = useTranslation();
    const { isActive, setIsActive}=useState(false);

    const projects = [
        { position:1,name: 'Web-Chess',link:"https://www.chess.com", description: "Das ist ein einfaches Chess Game via JavaScript. Man kann eine Lobbie erstellen und den link mit einem Freund teilen und dann direkt Schach gegeneinander spielen", image: <img src="/assets/projects/PlaceHolder-Chess.png" alt="Web-Chess"/>, tags: ["JavaScript", "Angular","CSS","Node"], githubRepo:"https://github.com/lukaspabst/ItsMe"},
        { position:2,name: 'TravelBuddy',link:"https://www.chess.com",description: "Das ist ein einfaches Chess Game via JavaScript. Man kann eine Lobbie erstellen und den link mit einem Freund teilen und dann direkt Schach gegeneinander spielen", image: <img src="" alt="TravelBuddy"/>,  tags: ["JavaScript", "React","CSS","Java","Spring","JUnit","MongoDB"], githubRepo:"https://github.com/lukaspabst/ItsMe"},
        { position:3,name: 'Styles-Libary',link:"https://www.chess.com",description: "Das ist ein einfaches Chess Game via JavaScript. Man kann eine Lobbie erstellen und den link mit einem Freund teilen und dann direkt Schach gegeneinander spielen", image: <img src="" alt="Styles-Libary"/>, tags: ["JavaScript", "React","CSS","Node"], githubRepo:"https://github.com/lukaspabst/ItsMe"},
        { position:4,name: 'Styles-Libary',link:"https://www.chess.com",description: "Das ist ein einfaches Chess Game via JavaScript. Man kann eine Lobbie erstellen und den link mit einem Freund teilen und dann direkt Schach gegeneinander spielen", image: <img src="" alt="Styles-Libary"/>, tags: ["JavaScript", "React","CSS","Node"], githubRepo:"https://github.com/lukaspabst/ItsMe"},
    ];
    const [positions, setPositions] = useState(projects.map((_, index) => index));

    const handleNextButtonClick = () => {
        setPositions((prevPositions) =>
            prevPositions.map((position, index) => (position + 1) % projects.length)
        );
    };

    const handlePrevButtonClick = () => {
        setPositions((prevPositions) =>
            prevPositions.map(
                (position, index) => (position - 1 + projects.length) % projects.length
            )
        );
    };

    return (
        <div ref={ref}>
            <BackgroundSkills/>
            <section className={`project-section ${inView ? 'appear' : 'disappear'}`}>
                <div className="projects-container">
                    <h1>{t('projectsPage.headline')}</h1>

                    <div className="projects-spinner-container">

                        <div className="project-next-left" id="prevButton">
                            <button onClick={handlePrevButtonClick}>
                                <FaAngleLeft/>
                            </button>
                        </div>

                        <div className="project-slider-wrapper">
                            <div className="project-slider">
                                <ul id="ul-slider">
                            {projects.map((projects, index) => (
                                <li key={index} className={`single-project position-${positions[index]}`}>
                                <Project
                                    key={index}
                                    description={projects.description}
                                    name={projects.name}
                                    image={projects.image}
                                    tags={projects.tags}
                                    githubRepo={projects.githubRepo}
                                    link={projects.link}
                                    index={index}
                                    active={isActive}
                                /></li>
                            ))}
                                </ul>
                            </div>
                        </div>
                        <div className="project-next-right">
                            <button onClick={handleNextButtonClick}>
                                <FaAngleRight/>
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectsPage;