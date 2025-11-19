import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token failed" });
  }
};


// admin ONCE
export const allowedTo = (...roles) =>{
    return (req , res , next) =>{
        if(!req.user || !roles.includes(req.user.role)){
            return res.status(403).json({success : false , message : "You are not allowed to access this route"})
        }
        next()
    }
}