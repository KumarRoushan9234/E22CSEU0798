export function verifyAuth(req, res, next) {
  const token = req.cookies.accessToken; // Read from cookies

  if (!token) {
      return res.status(401).json({ error: "Unauthorized. Please login first." });
  }

  req.accessToken = token;
  next();
}
