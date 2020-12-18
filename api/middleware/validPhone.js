module.exports = (req, res, next) => {
  if (req.body.phone) {
    // const phoneRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    const phoneRegex = /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/;
    if (phoneRegex.test(req.body.phone)) {
      next();
    } else {
      res.status(400).json({ error: "you must provide a valid phone number" });
    }
  } else {
    res.status(400).json({ error: "you must provide a phone number" });
  }
};
