import React from 'react';
import { FaGithub } from 'react-icons/fa';
import {useTranslation} from "react-i18next";

const Project = ({ name, tags, githubRepo, descriptionKey, link, image}) => {
    const { t } = useTranslation();
    const projectImageStyle = {
        width: '50%',
        background: `url(${image}) center`,
        backgroundSize: '100% 100%',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
    };
    const handleProjectClick = () => {
        window.open(link, '_blank');
    };
    return (
        <div className="project" onClick={handleProjectClick} style={{ cursor: 'pointer' }}>
                <div className="project-image" style={projectImageStyle}></div>
                <div className="project-details ">
                    <div className="projects-head-wrapper overflow-y">
                        <h2>{name}</h2>
                        <span className="github-Repo">
                            <a href={githubRepo} target="_blank" rel="noopener noreferrer"  aria-label="Github Repo-Link">
                                <FaGithub/> {name} Repository
                            </a>
                        </span>
                        <p>{t(`projectsPage.projects.${descriptionKey}`)}</p>
                    </div>
                    <div className="project-tags overflow-y">
                        <h3>Frameworks and Languages</h3>
                        <ul>
                            {tags.map((tag, tagIndex) => (
                                <li key={tagIndex}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
        </div>
    )
    ;
};

export default Project;
