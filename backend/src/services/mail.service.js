const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Puerto 587 es el más estable en Render
    secure: false, // Debe ser false para el puerto 587
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
        // Forzamos cifrado ciphers para evitar bloqueos de firewalls en la nube
        ciphers: 'SSLv3',
        minVersion: "TLSv1.2"
    }
});

const sendVerificationEmail = async (email, code) => {
    try {
        await transporter.sendMail({
            // Usamos MAIL_USER para que Gmail no lo marque como suplantación de identidad
            from: `"SupportComputer 💻" <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Verifica tu cuenta - SupportComputer",
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: auto; border: 1px solid #1a1a1a; border-radius: 10px; overflow: hidden; background-color: #ffffff;">
                    <div style="background-color: #00cfeb; padding: 20px; text-align: center;">
                        <h2 style="color: #000; margin: 0; text-transform: uppercase; font-weight: 900;">SupportComputer</h2>
                    </div>
                    <div style="padding: 30px; color: #333;">
                        <h2 style="color: #111;">Hola, ¡bienvenido!</h2>
                        <p style="font-size: 16px; line-height: 1.6;">Para completar tu registro en <strong>Forward Vision</strong>, usa el siguiente código de verificación de 6 dígitos:</p>
                        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-radius: 8px; margin: 25px 0;">
                            <h1 style="color: #00cfeb; font-size: 40px; margin: 0; letter-spacing: 10px; font-family: monospace;">${code}</h1>
                        </div>
                        <p style="font-size: 14px; color: #777;">Este código expirará pronto por seguridad. Si no solicitaste este registro, puedes ignorar este mensaje.</p>
                    </div>
                    <div style="background-color: #111; color: #555; padding: 15px; text-align: center; font-size: 12px;">
                        © 2026 Forward Vision - Soporte Técnico Especializado
                    </div>
                </div>
            `,
        });
        console.log(`✅ Correo de verificación enviado exitosamente a: ${email}`);
    } catch (error) {
        console.error("❌ Error crítico al enviar correo en Render:", error);
    }
};

module.exports = { sendVerificationEmail };