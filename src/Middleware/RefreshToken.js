const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
        let token = req.headers.authorization;        

        splittoken = token.split("Bearer ")[1];    

        const decoded = jwt.verify(splittoken, process.env.SECRET_TOKEN);    

        const encoded = decoded.data;

        const encodedtoken = jwt.sign({ encoded }, process.env.SECRET_TOKEN, {
            expiresIn: "1d",
        });                

        return res.json({
            token: encodedtoken
        })

}