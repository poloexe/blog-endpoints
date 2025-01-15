const handleBlogError = (err) => {
  let errors = { title: "", description: "", tag: "", general: "" };

  if (err.message.includes("Blog validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  } else if (err.message.includes("Validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });

    return errors;
  } else if (err.message.includes("Cast to ObjectId failed")) {
    errors.general = "No Blog found";

    return errors;
  } else {
    errors.general = "There was a problem with the server";
    return errors;
  }
};

export default handleBlogError;
