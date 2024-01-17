import React, {useEffect, useState} from 'react';
import AbstractBackground from '../../containerElements/Backgrounds/AbstractBackground';
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

    var TxtType = function(el, toRotate, period,delayBeforeStart) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 3000;
        this.txt = '';
        this.delayBeforeStart = parseInt(delayBeforeStart, 10) || 2000;
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

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

    window.onload = function() {
        var elements = document.getElementsByClassName('typewriter');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
    const [hasVisitedBefore, setHasVisitedBefore] = useState(false);

    useEffect(() => {
        // Check if the user has visited before
        const storedValue = sessionStorage.getItem('hasVisitedBefore');
        setHasVisitedBefore(!!storedValue);

        if (hasVisitedBefore === null || hasVisitedBefore === false) {
            // If not visited before, set to true after a delay
            const timeout = setTimeout(() => {
                setHasVisitedBefore(true);
                sessionStorage.setItem('hasVisitedBefore', 'true');
            }, 5000); // Adjust the delay as needed (5000 milliseconds = 5 seconds)

            // Clear the timeout to avoid issues with component unmounting
            return () => clearTimeout(timeout);
        }
    }, [hasVisitedBefore]);

    return (




        <div ref={ref}>
            <AbstractBackground inView={inView}/>
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

                        <p className="typewriter" data-period="5000" data-delay-before-start="1000"
                           data-type='["Full-Stack Developer", "Java and JavaScript", "Spring and React", "Anime Fan", "Gym Addicted"]'>
                            <span className="wrap"></span>
                        </p>
                    </div>
            </div>
        </div>


    );
};

export default LandingPage;
