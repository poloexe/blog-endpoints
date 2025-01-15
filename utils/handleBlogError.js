const handleBlogError = (err) => {
  let errors = { title: "", description: "", tag: "" };

  if (err.message.includes("Blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }
};

export default handleBlogError;
