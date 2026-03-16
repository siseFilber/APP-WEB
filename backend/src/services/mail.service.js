const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

const sendVerificationEmail = async (email, code) => {
    try {
        await transporter.sendMail({
            from: '"SupportComputer 💻" <tu-correo@gmail.com>',
            to: email,
            subject: "Verifica tu cuenta - SupportComputer",
            html: `
                <div style="font-family: Arial, sans-serif; border: 1px solid #ddd; padding: 20px;">
                    <h2>Hola, ¡bienvenido a SupportComputer!</h2>
                    <p>Para completar tu registro, usa el siguiente código de verificación:</p>
                    <h1 style="color: #007bff;">${code}</h1>
                    <p>Este código expirará pronto. Si no solicitaste este registro, ignora este correo.</p>
                </div>
            `,
        });
        console.log(`✅ Correo enviado a ${email}`);
    } catch (error) {
        console.error("❌ Error al enviar correo:", error);
    }
};

module.exports = { sendVerificationEmail };