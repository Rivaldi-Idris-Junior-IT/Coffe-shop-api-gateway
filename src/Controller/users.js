const apiAdapter = require("../Helper/ApiAdapter");
const api = apiAdapter(process.env.URL_SERVICE_USER);
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const user = await api.post("/users/register", req.body);

    return res.json(user.data);
  } catch (error) {
    if (error.code == "ECONNRFFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavalaible",
      });
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await api.post("/users/login", req.body);

    const data = user.data.result;

    console.log(data)

    const token = jwt.sign({ data }, process.env.SECRET_TOKEN, {
      expiresIn: "1d",
    });

    return res.json({
        success: true,
        message: "Login Success",
        result: {
            ...data,
            token,
        }
    })
    
  } catch (error) {
        if (error.code == "ECONNRFFUSED") {
            return res.status(500).json({
            success: false,
            message: "Service unavalaible",
            });
        }
    
        const { status, data } = error.response;
        return res.status(status).json(data);
  }
};


exports.getProfile = async (req, res) => {
    try {
        const user = await api.get(`/users/${req.params.id}`)        

        let token = req.headers.authorization;

        splittoken = token.split("Bearer ")[1];    

        const decoded = jwt.verify(splittoken, process.env.SECRET_TOKEN);    

        const encoded = decoded.data;

        const encodedtoken = jwt.sign({ encoded }, process.env.SECRET_TOKEN, {
            expiresIn: "1d",
        });                
        
        return res.json({
            success: true,
            result: user.data,
            token: encodedtoken
        });

        
    }catch (error) {
        if (error.code == "ECONNRFFUSED") {
            return res.status(500).json({
            success: false,
            message: "Service unavalaible",
            });
        }
    
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}

exports.getUpdate = async (req, res) => {
    try {
        const user = await api.put(`/users/${req.params.id}`, req.body);

        let token = req.headers.authorization;

        splittoken = token.split("Bearer ")[1];    

        const decoded = jwt.verify(splittoken, process.env.SECRET_TOKEN);    

        const encoded = decoded.data;

        const encodedtoken = jwt.sign({ encoded }, process.env.SECRET_TOKEN, {
            expiresIn: "1d",
        });                
        
        return res.json({
            success: true,
            result: user.data,
            token: encodedtoken
        });

    } catch (error) {
        if (error.code == "ECONNRFFUSED") {
            return res.status(500).json({
              success: false,
              message: "Service unavalaible",
            });
          }
      
          const { status, data } = error.response;
          return res.status(status).json(data);
    }
   
}

exports.delete = async (req, res) => {
    try {
        const user = await api.delete(`/users/${req.params.id}`, req.body);

        return res.json(user.data);
    } catch (error) {
        if (error.code == "ECONNRFFUSED") {
            return res.status(500).json({
              success: false,
              message: "Service unavalaible",
            });
          }
      
          const { data } = error.response;
          return res.status(200).json(data);   
    }
}