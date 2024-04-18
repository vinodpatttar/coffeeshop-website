// app.js

// Required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')

// Initialize Express app
const app = express();
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb+srv://vinodmpattar:ZfKljeNPf3Xfbns0@cluster0.qndsyvl.mongodb.net/', {
  
}).then(() => {
    console.log('Connected to MongoDB');
  }
).catch((err) => {
    console.error('Error connecting to MongoDB', err);
  }
)

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    number: String
  });
  
  // Define model
  const Contact = mongoose.model('Contact', contactSchema);
  
  // Middleware
  app.use(bodyParser.json());
  
  // Handle form submission
  app.post('/submit', async (req, res) => {
    const { name, email, number } = req.body;
  
    try {
      // Create a new contact instance
      const newContact = new Contact({ name, email, number });
      // Save the contact to the database
      await newContact.save();
      res.send('Contact saved successfully!');
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).send('Error saving contact');
    }
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });