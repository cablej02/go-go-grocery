import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present
  if (authHeader) {
    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Get the secret key from the environment variables
    const secretKey = process.env.JWT_SECRET_KEY || '';

    // Verify the JWT token
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        // Send unauthorized status if the token is invalid or expired
        return res.status(401).json({message: "Invalid or expired token"}); 
      }

      // Attach the user information to the request object
      req.user = user;
      return next(); // Call the next middleware function
    });
  } else {
    res.status(401).json({message: "Missing authorization header"}); // Send unauthorized status if no authorization header is present
  }
};
