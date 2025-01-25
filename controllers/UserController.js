import User from "../models/User.js";

// Add a new User
export const addUser = async (req, res) => {
  const User = new User(req.body);
  try {
    if (User) {
      await User.save();
      return res.status(200).json({
        success: true,
        message: "User added successfully",
        data: User,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add User",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error saving User: ${err.message}`,
    });
  }
};

// Get all Users
export const getAllUser = async (req, res) => {
  try {
    const Users = await User.find();
    return res.status(200).json({
      success: true,
      message: "All Users fetched successfully",
      data: Users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching Users: ${err.message}`,
    });
  }
};

//delete User by id
export const deleteUser = async (req, res) => {
  try {
    const User = await User.findByIdAndDelete(req.params.id);
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: User,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error deleting User: ${err.message}`,
    });
  }
};

//edit User by id
export const editUser = async (req, res) => {
  try {
    // Update the User using the provided ID and new data
    const User = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); // { new: true } returns the updated document
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: User, // Send back the updated User
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error updating User: ${err.message}`,
    });
  }
};

//get User by id
export const getUserById = async (req, res) => {
  try {
    const User = await User.findById(req.params.id);
    if (!User) {
      return res.status(200).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: User,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Error fetching User: ${err.message}`,
    });
  }
};

// Register User
export const registerUser = [
  body("name").notEmpty(),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, role });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  },
];

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);


module.exports = router;
