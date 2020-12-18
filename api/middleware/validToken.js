const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) { res.status(401).json({ error: "bad token" }) }
                else { next() }
            });
        }
        else {
            res.status(401).json({ error: "authorization token missing" })
        }
    }
    else {
        res.status(401).json({error: "authorization header missing"})
    }
}