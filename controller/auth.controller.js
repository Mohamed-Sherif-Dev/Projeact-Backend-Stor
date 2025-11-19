import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { OAuth2Client } from "google-auth-library";
// 🔹 Helper
const generateTokens = (user) => {
  const payload = { id: user._id, role: user.role };

  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE || "15m",
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRE || "7d" }
  );

  return { accessToken, refreshToken };
};
// client بتاع Google
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// 🔹 POST /api/auth/register )
export const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName, userName, role } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res
      .status(400)
      .json({ success: false, message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    firstName,
    lastName,
    userName,
    role: role || "user",
  });

  const { accessToken, refreshToken } = generateTokens(user);

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    },
  });
});

// 🔹 POST /api/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  const { accessToken, refreshToken } = generateTokens(user);

  return res.json({
    success: true,
    message: "Logged in successfully",
    data: {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    },
  });
});

// 🔹 POST /api/auth/refreshToken
export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({ success: false, message: "No refresh token provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid refresh token" });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user);

    return res.json({
      success: true,
      message: "Token refreshed successfully",
      data: { accessToken, refreshToken: newRefreshToken },
    });
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Expired or invalid refresh token" });
  }
});

// 🔹 GET /api/auth/me
export const getMe = asyncHandler(async (req, res) => {
  // هنا انت عندك req.user.id من الميدل وير
  const user = await User.findById(req.user.id).select("-password");
  res.json({ success: true, data: user });
});

// 🔹 GET /api/auth/google
export const googleLogin = (req, res) => {
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
    prompt: "consent",
  });
  res.redirect(url);
};

// 🔹 GET /api/auth/google/callback
export const googleCallback = asyncHandler(async (req, res) => {
  const code = req.query.code;

  if (!code) {
    return res.status(400).json({ success: false, message: "Code not found" });
  }

  // tokens google
  const { tokens } = await googleClient.getToken(code);
  const ticket = await googleClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();
  const { email, name, picture, sub: googleId } = payload;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Google email not found" });
  }

  // googel user ID
  let user = await User.findOne({ $or: [{ email }, { googleId }] });
  if (!user) {
    const [firstName = "", ...rest] = (name || "").split(" ");
    const lastName = rest.join(" ");

    // add new user google
    const randomPassword = await bcrypt.hash(
      googleId + Date.now().toString(),
      10
    );

    user = await User.create({
      firstName,
      lastName,
      userName: email.split("@")[0],
      email,
      password: randomPassword,
      googleId,
      profileimage: picture,
      provider: "google",
      role: "user",
    });
  } else {
    // update user provider google
    if (!user.googleId) user.googleId = googleId;
    if (!user.provider) user.provider = "google";
    await user.save();
  }

  // access refresh sestem
  const { accessToken, refreshToken } = generateTokens(user);
  return res.json({
    success: true,
    message: "GOOGLE Login successfully",
    data: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
      role: user.role,
      profileimage: user.profileimage,
      accessToken,
      refreshToken,
    },
  });
});

// GET /api/auth/users (get all users - admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password -__v");
  res.json({ success: true, data: users });
});

// PUT /api/auth/profile (update my profile)
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, userName, profileimage } = req.body;

  const updateUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(userName && { userName }),
        ...(profileimage && { profileimage }),
      },
    },
    { new: true, runValidators: true }
  ).select("-password");

  if (!updateUser) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.json({
    success: true,
    message: "User updated Profile successfully",
    data: updateUser,
  });
});

// PATCH /api/auth/users/:id/role  (admin only)
export const updatedUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  ).select("-password");

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  res.json({
    success: true,
    message: "User updated role successfully",
    data: user,
  });
});

// POPST /api/auth/logout
export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  res.json({
    success: true,
    message: "Logout successfully",
  });
});

//GET /api/auth/users/count (admin only)
export const getUserCount = asyncHandler(async (req, res) => {
  const total = await User.countDocuments();
  const admins = await User.countDocuments({ role: "admin" });
  const users = await User.countDocuments({ role: "user" });

  res.json({
    success: true,
    data: {
      total,
      admins,
      users,
    },
  });
});
