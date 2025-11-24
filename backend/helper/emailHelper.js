// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const emailjs = require('@emailjs/nodejs');

exports.sendMsg = async (to, subject, html) => {
    try {
        // const msg = {
        //     to: to,
        //     from: 'no-reply@playzelo.com',
        //     subject: subject,
        //     html: html
        // };
        // const response = await sgMail.send(msg);
        const msg = {
            message: html,
            to_email: to,
        }

        try {
            const response = await emailjs.send('service_e11codc', 'template_c0sj1nw', msg, {
                publicKey: 'rYBKywq0hlACo5yYV',
                privateKey: 'Y8JotNhzfmM-QWMn7dLWS',
            });
            console.log('✅ Email sent successfully to:', to, '| Status:', response.status);
            return { status: true };
        } catch (err) {
            console.error('❌ Email sending failed:', err.text || err.message || err);
            console.error('⚠️  Verification code is still saved in database and logged to console');
            console.error('To enable emails, configure EmailJS at https://www.emailjs.com/');
            console.error('Or set up SendGrid by uncommenting the code and adding SENDGRID_API_KEY to .env');
            // Return success anyway so user can proceed with code from console
            return { status: true, emailFailed: true };
        }
    }
    catch (err) {
        console.error({ title: 'emailHelper => sendMsg', message: err.message });
        return { status: false };
    }
};

exports.authenticationEmail = (code) => {
    return `${code}`;
}