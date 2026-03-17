const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 465,
    secure: true, 
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        // Esto obliga a usar IPv4 y evita el error de "Network Unreachable"
        rejectUnauthorized: false,
        minVersion: "TLSv1.2"
    },
    connectionTimeout: 10000 // 10 segundos de espera máximo
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