import React from "react";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import BackgroundSkills from "../../containerElements/Backgrounds/BackgroundSkills";
import './Projects.scss'

const ProjectsPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const { t } = useTranslation();


    return (
        <div ref={ref}>
            <BackgroundSkills />
        </div>
    );
};

export default ProjectsPage;