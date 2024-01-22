import React, {useState} from "react";
import {useInView} from "react-intersection-observer";
import {useTranslation} from "react-i18next";
import BackgroundSkills from "../../containerElements/Backgrounds/BackgroundSkills";
import './Contact.scss'
import i18n from "i18next";

const ContactForm = ({ onSubmit, submitted }) => {
    const {t} = useTranslation();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        language: "",
    });
    const apiUrl = process.env.REACT_APP_API_URL;
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isButtonDisabled) {
            return;
        }

        try {
            formData.language = i18n.language.toUpperCase();
            setIsButtonDisabled(true);
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log(result.message);
        }  catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setIsButtonDisabled(false);
        }


        onSubmit();


        setFormData({
            name: "",
            email: "",
            message: "",
            language:"",
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form className={`contact-form ${submitted ? 'disappear' : 'appear'} overflow-y`} onSubmit={handleSubmit}>
            <div className="form-name">
                <label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>
            <div className="form-email">
                <label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                    />
                </label>
            </div>
            <div className="form-message">
                <label>
                      <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                      />
                </label>
            </div>

            <div className="form-submit">
                <div className="button-wrapper-contact">
                    <button className="button-contact-download" type="submit"  aria-label="Submit" disabled={isButtonDisabled}>
                        <h1>{t('contactPage.submit')}</h1>
                    </button>
                </div>
            </div>
        </form>
    );
};

const ContactPage = () => {
    const {ref, inView} = useInView({
        threshold: 0.75,
        triggerOnce: false,
    });
    const {t} = useTranslation();
    const [submittedAndDeactivated, setSubmittedAndDeactivated] = useState(false);
    const [triggerFireworks, setTriggerFireworks] = useState(false);
    const [countdown, setCountdown] = useState(null);
    const handleFormSubmit = () => {
        setCountdown(45)
        setSubmittedAndDeactivated(true);
        setTriggerFireworks(true);
        const intervalId = setInterval(() => {
            setCountdown(prevCount => prevCount - 1);
        }, 1000);
        setTimeout(() => {
            setTriggerFireworks(false);
            clearInterval(intervalId);
            setCountdown(null);
            setSubmittedAndDeactivated(false);
        }, 45000);
    };


    return (
        <div ref={ref}>
            <BackgroundSkills triggerFireworks={triggerFireworks} />
            <section className={`contact-section ${inView ? 'appear' : 'disappear'}`}>
                <div className="contact-container">
                    <h2>{t('contactPage.headline')}</h2>
                    <p>{t('contactPage.reachOut')}</p>
                    <ContactForm
                        onSubmit={handleFormSubmit}
                        submitted={submittedAndDeactivated}
                    />
                    <div className={`responding-message ${submittedAndDeactivated ? 'appear' : 'disappear'}`}>
                        <h2>{t('contactPage.responding')}</h2>
                        <br/>
                        <h2> {countdown}s </h2>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;