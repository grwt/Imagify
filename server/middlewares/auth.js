const userAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ success: false, message: 'Not authorized. Login again.' });
  }

  const token = authHeader.split(' ')[1]; // extract the token part

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
