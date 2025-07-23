import express from 'express';
import StyleOrder from '../models/StyleOrder.js';
import sendEmail from '../utils/mailer.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      styleName,
      size,
      quantity
    } = req.body;

    const newOrder = new StyleOrder({
      customerName,
      customerEmail,
      styleName,
      size,
      quantity
    });

    await newOrder.save();

    // Email to customer
    await sendEmail(
      customerEmail,
      "🖼️ Your Readymade Art Order Confirmation – Textures by Shifa",
      `<h2>Hi ${customerName},</h2>
       <p>Thank you for ordering a beautiful artwork!</p>
       <h4>Order Details:</h4>
       <ul>
         <li><strong>Style:</strong> ${styleName}</li>
         <li><strong>Size:</strong> ${size}</li>
         <li><strong>Quantity:</strong> ${quantity}</li>
       </ul>
       <p>Regards,<br/>Textures by Shifa Team</p>`
    );

    // Email to admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "📥 New Readymade Order Received",
      `<h2>New Readymade Order</h2>
       <ul>
         <li><strong>Name:</strong> ${customerName}</li>
         <li><strong>Email:</strong> ${customerEmail}</li>
         <li><strong>Style:</strong> ${styleName}</li>
         <li><strong>Size:</strong> ${size}</li>
         <li><strong>Quantity:</strong> ${quantity}</li>
       </ul>`
    );

    res.status(201).json({ message: 'Readymade order placed successfully.' });

  } catch (error) {
    console.error('Error placing style order:', error);
    res.status(500).json({ message: 'Failed to place style order.' });
  }
});

export default router;
