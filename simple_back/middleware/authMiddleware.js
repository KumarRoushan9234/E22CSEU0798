export function verifyAuth(req, res, next) {
  const token = req.cookies?.access_token;

  if (!token) {
      return res.status(401).json({ error: "Unauthorized. Please login first." });
  }

  req.accessToken = token;
  next();
}
