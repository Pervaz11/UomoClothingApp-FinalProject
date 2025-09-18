export default (req, res, next) => {
	if (req.user && req.user.role === "admin") {
		return next();
	}
	return res.status(403).json({ message: "Only admin can access this route!", statusCode: 403 });
};
