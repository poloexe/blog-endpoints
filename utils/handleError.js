//err message and err code = E11000

const handleError = (err) => {
  let errors = { name: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.email = "Email has been registered";
    return errors;
  }

  if (err.message.includes("User validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  if (err.message === "Email not found") {
    errors.email = "User not found, register!!";
    return errors;
  }

  if (err.message === "password not correct") {
    errors.email = "Invalid email or password";
    return errors;
  }
};

export default handleError;
