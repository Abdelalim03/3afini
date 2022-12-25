const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.status(403).json({message:"you are not authorized access"});
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({message:"you are not authorized access"});
    }
};

module.exports=authenticateJWT;