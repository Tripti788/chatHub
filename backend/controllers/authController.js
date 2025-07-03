const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('Incoming Register Data:', req.body);

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(201).json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('❌ Registration error:', err);  // << Log backend error
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('➡️ Login attempt with:', email, password);

  try {
    const user = await User.findOne({ email });
    console.log('🔍 Fetched user:', user);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials (no user)' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials (wrong password)' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('💥 Login Error:', error); // log full error
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  registerUser,
  loginUser
};