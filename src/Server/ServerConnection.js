const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require("bcrypt");
const User = require('./models/Users')
app.use(cors());
const port = process.env.PORT || 5000;
const jwt = require('jsonwebtoken');
const uri = 'mongodb+srv://piabh:pharmacyapp2023@pharmacycluster.pl03ail.mongodb.net/test';

app.use(express.json());

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));



  app.post('/api/signup', async (req, res) => {
    console.log(req.body)
    try {
      const newPassword = await bcrypt.hash(req.body.password, 10)
      const oldUser = await User.findOne({email})
      if(oldUser){
       return res.json({error: "User Exists"});
      }
      await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: newPassword,
      })
      res.json({ status: 'ok' })
    } catch (err) {
      res.json({ status: 'error', error: 'Duplicate email' })
    }
  })
  
  app.post('/api/signin', async (req, res) => {
    const user = await User.findOne({
      email: req.body.email,
    })
  
    if (!user) {
      return res.json({ status: 'error', error: 'Invalid login' })
    }
  
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    )
  
    if (isPasswordValid) {
      const token = jwt.sign(
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
        'secret123'
      )
  
      return res.json({ status: 'ok', user: token })
    } else {
      return res.json({ status: 'error', user: false })
    }
  })
  
  
const noteSchema = new mongoose.Schema({
  text: String,
});

const Note = mongoose.model('Note', noteSchema);

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (error) {
    res.status(500).send('Error retrieving notes from database');
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const note = new Note({
      text: req.body.text,
    });
    await note.save();
    res.json(note);
  } catch (error) {
    res.status(500).send('Error creating note');
  }
});

app.put('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    res.status(500).send('Error updating note');
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(500).send('Error deleting note');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});