import User from "../db/userModel.mjs";
import jwt from "jsonwebtoken";

const userVerification = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.json({ status: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    } else {
      const user = await User.findById(data.userId);
      if (user) return res.json({ status: true, user: user.username });
      else return res.json({ status: false });
    }
  });
};

export default userVerification;
