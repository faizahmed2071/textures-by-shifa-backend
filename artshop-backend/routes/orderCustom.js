import express from 'express';
import CustomOrder from '../models/CustomOrder.js';
import sendEmail from '../utils/mailer.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const {
      canvasSize,
      artType,
      color,         // { name, hex, rgb }
      textOnPainting,
      idea,
      customerName,
      customerEmail,
      customerPhone,
      confirmed // <-- new flag
    } = req.body;

    if (!confirmed) {
      // Only return a preview, do not save or send emails
      return res.status(200).json({
        preview: true,
        order: {
          canvasSize,
          artType,
          color,
          textOnPainting,
          idea,
          customerName,
          customerEmail,
          customerPhone
        },
        message: 'Order preview only. Not placed yet.'
      });
    }

    // Save to DB
    const newOrder = new CustomOrder({
      canvasSize,
      artType,
      color,
      textOnPainting,
      idea,
      customerName,
      customerEmail,
      customerPhone
    });

    await newOrder.save();

    // Email to customer
    await sendEmail(
      customerEmail,
      "🎨 Your Custom Art Order Confirmation – Textures by Shifa",
      `<h2>Hi ${customerName},</h2>
      <p>Thanks for placing a custom art order. Here's what we received:</p>
      <ul>
        <li><strong>Canvas Size:</strong> ${canvasSize}</li>
        <li><strong>Art Type:</strong> ${artType}</li>
        <li><strong>Color:</strong> ${color.name} (${color.rgb})</li>
        ${textOnPainting ? `<li><strong>Text on Painting:</strong> ${textOnPainting}</li>` : ''}
        <li><strong>Idea Description:</strong> ${idea}</li>
      </ul>
      <p>We'll be in touch soon. Thank you for trusting <strong>Textures by Shifa</strong>! 🎨</p>`
    );

    // Email to Admin
    await sendEmail(
      process.env.ADMIN_EMAIL,
      "📥 New Custom Order Received",
      `<h2>New Custom Order Details</h2>
      <ul>
        <li><strong>Name:</strong> ${customerName}</li>
        <li><strong>Email:</strong> ${customerEmail}</li>
        <li><strong>Phone No:</strong> ${customerPhone}</li>
        <li><strong>Canvas Size:</strong> ${canvasSize}</li>
        <li><strong>Art Type:</strong> ${artType}</li>
        <li><strong>Color:</strong> ${color.name} (${color.rgb})</li>
        ${textOnPainting ? `<li><strong>Text on Painting:</strong> ${textOnPainting}</li>` : ''}
        <li><strong>Idea:</strong> ${idea}</li>
      </ul>`
    );

    res.status(201).json({ message: 'Custom order placed successfully.' });

  } catch (error) {
    console.error('❌ Error placing custom order:', error);
    res.status(500).json({ message: 'Failed to place custom order.' });
  }
});

export default router;
