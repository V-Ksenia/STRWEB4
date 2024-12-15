import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
    }
  
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
      req.user = user;
      next();
    });
  };

export const verifyUser = (req, res, next) => {
    const token = req.cookies.accessToken; 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT); 
        if (user.id == req.params.id || user.isAdmin) {
            req.user = user;
            next();
        } else {
            res.status(403).json({ message: "Access denied" });
        }
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.accessToken; 

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const user = jwt.verify(token, process.env.JWT);
        if (user.isAdmin) {
            req.user = user; 
            next();
        } else {
            res.status(403).json({ message: "Access denied. Admins only." });
        }
    } catch (err) {
        res.status(403).json({ message: "Invalid token" });
    }
};