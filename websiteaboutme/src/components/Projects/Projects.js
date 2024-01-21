import React, {useState} from "react";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import BackgroundSkills from "../../containerElements/Backgrounds/BackgroundSkills";
import './Projects.scss'
import Project from "./Project";
import {
    FaAngleLeft,
    FaAngleRight,
} from "react-icons/fa6";


const ProjectsPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const { t } = useTranslation();

    const projects = [
        {
            name: 'Web-Chess',
            link: "https://lukas-pabst.dev",
            descriptionKey: "webChess",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "Angular", "CSS", "Node"],
            githubRepo: "https://github.com/lukaspabst"
        },
        {
            name: 'TravelBuddy',
            link: "https://lukas-pabst.dev",
            descriptionKey: "travelBuddy",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "React", "CSS", "Java", "Spring", "JUnit", "MongoDB"],
            githubRepo: "https://github.com/lukaspabst"
        },
        {
            name: 'Styles-Library',
            link: "https://lukas-pabst.dev",
            descriptionKey: "stylesLibrary",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "React", "CSS", "Node"],
            githubRepo: "https://github.com/lukaspabst"
        },
        {
            name: 'Another Project',
            link: "https://lukas-pabst.dev",
            descriptionKey: "anotherProject",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "React", "CSS", "Node"],
            githubRepo: "https://github.com/lukaspabst"
        },
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
                            <button aria-label="Slide To Left" onClick={handlePrevButtonClick}>
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
                                    descriptionKey={projects.descriptionKey}
                                    name={projects.name}
                                    image={projects.image}
                                    tags={projects.tags}
                                    githubRepo={projects.githubRepo}
                                    link={projects.link}
                                    index={index}
                                /></li>
                            ))}
                                </ul>
                            </div>
                        </div>
                        <div className="project-next-right">
                            <button onClick={handleNextButtonClick} aria-label="Slide to Right">
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