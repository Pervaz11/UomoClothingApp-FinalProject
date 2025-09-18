const logger = (req, _, next) => {
  console.log(`${req.method}`);
  next();
};

module.exports = logger;