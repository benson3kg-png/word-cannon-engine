// Deep Dish Waakye Automation Engine - Production Grade Vercel Micro-Service
// Engineered for near-zero latency multi-client session processing

// Simple, volatile memory cache to store active customer steps (RAM State Store)
const customerSessions = {};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        const { from, body } = req.body; // Ingest sender phone number and message text
        const textIn = body.trim().toLowerCase();
        
        // Initialize session state if this is a first-time or returning customer
        if (!customerSessions[from]) {
            customerSessions[from] = { step: 'WELCOME', order: {}, location: '' };
        }

        let session = customerSessions[from];
        let replyMessage = "";

        // 🛡️ STEP 1: WELCOME GATE AND MENU GENERATION
        if (session.step === 'WELCOME' || textIn === 'hello' || textIn === 'hi') {
            session.step = 'AWAITING_ORDER';
            replyMessage = `🍲 *Hello! Welcome to DEEP DISH WAAKYE!* 🍲\n\n` +
                           `*PRICE MATRIX:*\n` +
                           `• Waakye: GHS 10.00 and above\n` +
                           `• Gari: GHS 2.00 and above\n` +
                           `• Dry Salad: GHS 3.00 and above\n` +
                           `• Macaroni: GHS 2.00 and above\n\n` +
                           `*AVAILABLE SELECTIONS:*\n` +
                           `👉 *Main Dish:* Waakye\n` +
                           `👉 *Toppings:* Gari, Macaroni, Dry Salad\n` +
                           `👉 *Proteins:* Fish, Cow Meat, Goat Meat, Chicken, Cow Tripe, Wele, Egg, Sausage\n\n` +
                           `💬 *Please type your order exactly like this:* \n` +
                           `_Example: Waakye 15, Gari 2, Chicken, Egg_`;
            
            return res.status(200).json({ to: from, message: replyMessage });
        }

        // 🛒 STEP 2: INGESTING THE FOOD CHOICES
        if (session.step === 'AWAITING_ORDER') {
            session.order_raw = body; // Save their clean text order selection
            session.step = 'AWAITING_LOCATION';
            
            replyMessage = `📍 *Order Logged!* \n\n` +
                           `Please reply with your current *Delivery Location / Neighborhood* right now so we can group your order for easy dispatch.\n` +
                           `_(Example: Commercial Street, UCC Campus, Ola, Kotokuraba)_`;
            
            return res.status(200).json({ to: from, message: replyMessage });
        }

        // 🚚 STEP 3: LOCATION CAPTURE AND DELIVERY ORDER GROUPING
        if (session.step === 'AWAITING_LOCATION') {
            session.location = body.trim().toUpperCase();
            
            // Build the final validation manifest statement
            replyMessage = `🎉 *ORDER FULLY CONFIRMED!* 🎉\n\n` +
                           `📝 *Summary:* ${session.order_raw}\n` +
                           `📍 *Delivery Zone:* ${session.location}\n\n` +
                           `🛵 Our dispatch rider heading toward *${session.location}* has queued your delivery group. Thank you for eating with Deep Dish Waakye!`;
            
            // Log analytics internally to monitor grouping (Simulating database metrics inside cloud RAM)
            console.log(`[DISPATCH LOG] New Order Grouped -> ZONE: ${session.location} | CLIENT: ${from}`);
            
            // Reset session loop state for the next future order transaction
            delete customerSessions[from];
            
            return res.status(200).json({ to: from, message: replyMessage });
        }

    } catch (error) {
        return res.status(500).json({ error: 'Volatile RAM Execution Anomaly Isolated.' });
    }
}
