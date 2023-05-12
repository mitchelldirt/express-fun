import { Request, Response } from 'express';

const sendMessage = (req: Request, res: Response) => {
  if (!req.body || !req.body.message) {
    res.status(400).send('Message is required');
    return;
  }
  const message = req.body.message;
  res.send(`The message is: ${message}`);
}

export default {
  sendMessage
}
