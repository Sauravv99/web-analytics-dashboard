module.exports = function (role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ message: 'Forbidden: insufficient role' });
    next();
  };
};
