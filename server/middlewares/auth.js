import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Add console warning here for debugging
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn('Authorization header missing or improperly formatted:', authHeader);
    return res.status(403).json({ success: false, message: 'Not authorized. Login again.' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token part

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };
      next();
    } else {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }
  } catch (error) {
    return res.status(403).json({ success: false, message: error.message });
  }
};

export default userAuth;
