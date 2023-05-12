"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendMessage = (req, res) => {
    if (!req.body || !req.body.message) {
        res.status(400).send('Message is required');
        return;
    }
    const message = req.body.message;
    res.send(`The message is: ${message}`);
};
exports.default = {
    sendMessage
};
