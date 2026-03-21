const { Resend } = require('resend');

// Usamos la API Key configurada en Hostinger
const resend = new Resend(process.env.RESEND_API_KEY);

const sendVerificationEmail = async (email, code) => {
    try {
        const { data, error } = await resend.emails.send({
            // CAMBIO CRÍTICO: Ahora usamos tu dominio verificado
            from: 'SupportComputer <no-reply@filberdev.cloud>', 
            to: email,
            subject: 'Verifica tu cuenta - SupportComputer',
            html: `
                <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #00cfeb; border-radius: 10px; background-color: #000; color: #fff;">
                    <h2 style="color: #00cfeb; text-align: center;">FORWARD VISION</h2>
                    <p style="text-align: center;">Tu código de seguridad de 6 dígitos es:</p>
                    <div style="background-color: #111; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
                        <h1 style="letter-spacing: 8px; color: #00cfeb; margin: 0;">${code}</h1>
                    </div>
                    <p style="font-size: 12px; color: #555; text-align: center;">Este código es para uso exclusivo en la plataforma SupportComputer.</p>
                </div>
            `,
        });

        if (error) {
            return console.error("❌ Error de Resend:", error);
        }

        console.log("✅ Correo enviado exitosamente vía API Resend. ID:", data.id);
    } catch (err) {
        console.error("❌ Fallo crítico en el servicio de API de Resend:", err);
    }
};

module.exports = { sendVerificationEmail };