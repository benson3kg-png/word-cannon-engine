// High-Velocity WhatsApp Web Intercept Liaison Module
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
    }
});

// Flash the login checkpoint directly into your Render deployment log monitor
client.on('qr', (qr) => {
    console.log('--- SYSTEM ACTION REQUIRED: SCAN THE CHECKPOINT MATRIX CODE ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('📡 INFRASTRUCTURE ACTIVE: CHANNELS SECURED ON WHATSAPP WEB GRID!');
});

// Intercept incoming chat payloads natively inside RAM registers
client.on('message', async (msg) => {
    try {
        // Forward the raw packet straight to your Vercel Waakye Logic endpoint
        const response = await axios.post('https://vercel.app', {
            from: msg.from,
            body: msg.body
        });

        // If your logic file outputs a message payload, fire it back across the wire instantly
        if (response.data && response.data.message) {
            await client.sendMessage(msg.from, response.data.message);
        }
    } catch (error) {
        console.log('[NETWORK DROPOUT ERROR] Failed to clear Vercel route intercept.');
    }
});

client.initialize();
