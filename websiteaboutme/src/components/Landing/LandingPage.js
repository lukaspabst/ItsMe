import React, {useEffect, useLayoutEffect, useState} from 'react';
import LandingBackground from '../../containerElements/Backgrounds/LandingBackground';
import './LandingPage.scss';
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import WelcomeAnimation from "../../PageAnimations/WelcomeAnimation";

const LandingPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const { t } = useTranslation();
    const welcomeHeadline = t('landingPage.welcome');
    const aboutMeText = t('landingPage.aboutMeText');

    useEffect(() => {
        const spans = document.querySelectorAll('.aboutMe-wrapper h1 span, .aboutMe-wrapper p span');
        spans.forEach((span, index) => {
            span.style.animation = inView
                ? `flyIn 1s ease forwards ${index * 0.025}s`
                : `flyOut 0.5s ease forwards ${index * 0.025}s`;
        });
    }, [inView]);

    const TxtType = function (el, toRotate, period, delayBeforeStart) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1500;
        this.txt = '';
        this.delayBeforeStart = parseInt(delayBeforeStart, 10) || 500;
        this.isDeleting = false;

        this.tick();
    };

    TxtType.prototype.tick = function() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        const that = this;
        let delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = this.delayBeforeStart;
        }

        setTimeout(function() {
            that.tick();
        }, delta);
    };

    useLayoutEffect(() => {
        const delay = 2000;

        const initializeWithDelay = () => {
            setTimeout(() => {
                const elements = document.getElementsByClassName('typewriter');
                for (let i = 0; i < elements.length; i++) {
                    const toRotate = elements[i].getAttribute('datatype');
                    const period = elements[i].getAttribute('data-period');
                    if (toRotate) {
                        new TxtType(elements[i], JSON.parse(toRotate), period);
                    }
                }
            }, delay);
        };

        window.addEventListener('load', initializeWithDelay);

        return () => {
            window.removeEventListener('load', initializeWithDelay);
        };
    }, []);

    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

    useEffect(() => {
        const storedValue = sessionStorage.getItem('hasVisitedBefore');
        setHasVisitedBefore(!!storedValue);

        if (hasVisitedBefore === null || hasVisitedBefore === false) {
            const timeout = setTimeout(() => {
                setHasVisitedBefore(true);
                sessionStorage.setItem('hasVisitedBefore', 'true');
            }, 4000);
            return () => clearTimeout(timeout);
        }

    }, [hasVisitedBefore]);

    return (
        <div ref={ref}>
            <LandingBackground inView={inView}/>
            {(hasVisitedBefore === null || hasVisitedBefore === false) && (
                <WelcomeAnimation/>
            )}
            <div className="landingPage-wrapper">
                    <div className="aboutMe-wrapper">
                        <h1>
                            {welcomeHeadline.split('').map((char, idx) => (
                                <span className={inView ? "" : "fade-out"} key={idx}>
                                    {char.trim() !== '' ? char : '\u00A0'}
                                </span>
                            ))}
                        </h1>
                        <p>
                            {aboutMeText.split(' ').map((word, idx) => (
                                <span key={idx}>
                                    {word.split('').map((char, charIdx) => (
                                        <span className={inView ? "" : "fade-out"}
                                              key={charIdx}>
                                            {char}
                                        </span>
                                    ))}
                                    &nbsp;
                                </span>
                            ))}
                        </p>
                    </div>
                    <div className={`typing-wrapper ${inView ? 'fade-in' : 'fade-out'}`}>

                        <p className="typewriter" data-period="2000" data-delay-before-start="500"
                           datatype='["Full-Stack Developer", "Java and JavaScript", "Spring and React", "Anime Fan", "Gym Addicted"]'>
                            <span className="wrap"></span>
                        </p>
                    </div>
            </div>
        </div>
    );
};

export default LandingPage;
