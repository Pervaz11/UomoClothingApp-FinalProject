const logger = (req, _, next) => {
  console.log(`${req.method}`);
  next();
};

export default logger;