import jwt from 'jsonwebtoken';
export const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const publicKey = await fetch(process.env.AUTH_API_URL)
  .then(res => res.json())
  .then(json => json.data.publicKey)
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, publicKey, (err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }

      next();
    });

  } else {
    res.sendStatus(401);
  }
};