import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User, { IUser } from '../models/User';
import generateToken from '../utils/generateToken';
import { v4 as uuidv4 } from 'uuid';

// @desc    Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, name, profile_picture, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const newUser: IUser = new User({
      user_id: uuidv4(),
      email,
      password_hash,
      name,
      profile_picture,
      role
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// @desc    Login a user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = generateToken(user.user_id, user.role);
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server error', error });
  }
};
