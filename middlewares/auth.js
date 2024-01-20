const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(403).json({ msg: "token doesn't start with `Bearer` keyword" });
    }

    token = token.slice(7, token.length).trimLeft();

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
