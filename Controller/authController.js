import User from "../Model/auth.js";
import handleError from "../utils/handleError.js";

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ success: true, user });
  } catch (error) {
    const errors = handleError(error);
    return res.status(400).json({ errors });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Please provide necessary details" });
  }

  try {
    const userExists = await User.findOne({ email });
    if (!userExists) {
      throw Error("Email not found");
    }

    // Authenticate pass
    const authentication = await userExists.comparePassword(password);
    if (!authentication) {
      throw Error("password not correct");
    }
    
    //gen token
    const token = userExists.generateToken();
    return res.status(200).json({
      user: { name: userExists.name, email: userExists.email },
      token,
    });
  } catch (error) {
    const errors = handleError(error);
    return res.status(400).json({ errors });
  }
};

export { register, login };
