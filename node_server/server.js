const dotenv = require('dotenv');
dotenv.config({ path: `./.env` });
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 3001;

const emailUser = process.env.REACT_APP_EMAIL_USER;

app.use(bodyParser.json());

app.use((req, res, next) => {
    // Set up CORS headers based on your needs
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/submitForm', async (req, res) => {
    const { name, email, message, language } = req.body;
    const transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure: false,
        auth: {
            user: emailUser,
            pass: process.env.REACT_APP_EMAIL_PASSWORD,
        },
        requireTLS: true,
    });


    const mailOptionsToSelf = {
        from: emailUser,
        to: emailUser,
        subject: 'New Message From ' + name,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {

        await transporter.sendMail(mailOptionsToSelf);


        const mailOptionsToUser = {
            from: {
                address: `${emailUser}`,
                name: 'Lukas Pabst', // Replace with your name
            },
            to: email,
            subject: language === 'DE' ? 'Ich habe deine Nachricht erhalten' : 'I received your message',
            html: language === 'DE'
                ? `<p>Hallo ${name},</p><br><p>Vielen Dank, dass Sie mich kontaktiert haben.</p><p>Ich werde so schnell wie möglich antworten.</p><br><br><p>Beste Grüße,</p><p>Lukas Pabst</p>`
                : `<p>Hello ${name},</p><br><p>Thank you for contacting me.</p><p>I will respond as soon as possible.</p><br><br><p>Best regards,</p><p>Lukas Pabst</p>`,
            text: language === 'DE'
                ? `Hallo ${name},\n\nVielen Dank, dass du mich kontaktiert haben. Ich werde so schnell wie möglich antworten.\n\nBeste Grüße,\nLukas Pabst`
                : `Hello ${name},\n\nThank you for contacting me. I will respond as soon as possible.\n\nBest regards,\nLukas Pabst`,
            envelope: {
                from:  `${emailUser}`,
                to: email,
            },
            sender: `${emailUser}`,
        };

        await transporter.sendMail(mailOptionsToUser);

        res.json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Error sending emails' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
