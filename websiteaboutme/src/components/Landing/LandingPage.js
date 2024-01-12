import React, {useEffect, useState} from 'react';
import AbstractBackground from '../../containerElements/Backgrounds/AbstractBackground';
import './LandingPage.scss';
import {useInView} from "react-intersection-observer";

const LandingPage = () => {
    const { ref, inView } = useInView({
        threshold: 0.75,
        triggerOnce: false
    });
    const headline = 'About me';
    const text = 'This is where you can provide information about yourself.';

    useEffect(() => {
        const spans = document.querySelectorAll('.aboutMe-wrapper h1 span, .aboutMe-wrapper p span');
        spans.forEach((span, index) => {
            span.style.animation = inView
                ? `flyIn 1s ease forwards ${index * 0.025}s`
                : `flyOut 0.5s ease forwards ${index * 0.025}s`; // Different animation for out of view
        });
    }, [inView]);

    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
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
            delta = 500;
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
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

    return (
        <div ref={ref}>
            <AbstractBackground inView={inView}/>

            <div className="aboutMe-wrapper">
                <h1>
                    {headline.split('').map((char, idx) => (
                        <span className={inView ? "" : "fade-out"} key={idx}>
                            {char.trim() !== '' ? char : '\u00A0'}
                        </span>
                    ))}
                </h1>
                <p>
                    {text.split('').map((char, idx) => (
                        <span className={inView ? "" : "fade-out"} key={idx}>
                            {char.trim() !== '' ? char : '\u00A0'}
                        </span>
                    ))}
                </p>
            </div>
            <div className={`typing-wrapper ${inView ? 'fade-in' : 'fade-out'}`}>

                <p className="typewriter" data-period="2000"
                   data-type='["Full-Stack Developer", "Java Developer", "Also JavaScript", "Anime Fan", "Gym Addicted"]'>
                    <span className="wrap"></span>
                </p>

            </div>
        </div>
    );
};

export default LandingPage;
