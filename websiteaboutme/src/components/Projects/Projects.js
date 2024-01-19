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
            description: "This is a simple chess game implemented in JavaScript. You can create a lobby, share the link with a friend, and play chess against each other directly.",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "Angular", "CSS", "Node"],
            githubRepo: "https://github.com/lukaspabst"
        },
        {
            name: 'TravelBuddy',
            link: "https://lukas-pabst.dev",
            description: "TravelBuddy is a comprehensive travel companion app developed using JavaScript and React." +
                " Plan and manage your trips seamlessly with an intuitive user interface." +
                " Share your travel experiences and itinerary with friends." +
                " The backend is powered by Spring and Java, with MongoDB serving as the database for efficient data storage and retrieval.",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "React", "CSS", "Java", "Spring", "JUnit", "MongoDB"],
            githubRepo: "https://github.com/lukaspabst"
        },
        {
            name: 'Styles-Library',
            link: "https://lukas-pabst.dev",
            description: "Styles-Library is a collection of reusable styles and components for web development. Built with JavaScript, React, and Node.",
            image: "../../../assets/projects/Placeholder.png",
            tags: ["JavaScript", "React", "CSS", "Node"],
            githubRepo: "https://github.com/lukaspabst"
        },
        {
            name: 'Another Project',
            link: "https://lukas-pabst.dev",
            description: "This is another exciting project with a unique description. Feel free to explore and contribute!",
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