import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Project = ({ name, image, tags, githubRepo, index, active, description, link}) => {
    return (
        <div className="project">
            <a href={link} target="_blank" rel="noopener noreferrer">
                <div className="project-image"></div>
                <div className="project-details">
                    <div className="projects-head-wrapper">
                        <h2>{name}</h2>
                        <span className="github-Repo">
                            <a href={githubRepo} target="_blank" rel="noopener noreferrer">
                                <FaGithub/> {name} Repository
                            </a>
                        </span>
                        <p>{description}</p>
                    </div>
                    <div className="project-tags">
                        <h3>Frameworks and Languages</h3>
                        <ul>
                            {tags.map((tag, tagIndex) => (
                                <li key={tagIndex}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </a>
        </div>

)
    ;
};

export default Project;
