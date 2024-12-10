import jwt from 'jsonwebtoken';

const generateToken = (user_id: string, role: string): string => {
  return jwt.sign({ user_id, role }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
};

export default generateToken;
