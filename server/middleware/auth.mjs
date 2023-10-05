import jwt from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization;
    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, process.env.TOKEN_KEY);
    // retrieve the user details of the logged in user
    const user = await decodedToken;
    // pass the user down to the endpoints here
    req.user = user;
    // pass down functionality to the endpoint
    next();
  } catch (error) {
    console.log("this error");
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
