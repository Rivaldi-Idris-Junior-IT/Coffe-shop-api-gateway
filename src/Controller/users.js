const apiAdapter = require("../Helper/ApiAdapter");
const cloudinary = require("../Middleware/Cloudinary");
const upload = require("../Middleware/MulterUpload");
const api = apiAdapter(process.env.URL_SERVICE_USER);
const jwt = require('jsonwebtoken')
const FormData = require('form-data');
const { response } = require("express");

exports.register = async (req, res) => {
  try {
    const filePath  = await cloudinary.uploader.upload(req.file.path)

    const apiURL = process.env.URL_ORM_HEROKU

    const user = await api.post(apiURL+"/users/register", {
      ...req.body,
      avatar: filePath.url,
      cloudinary_id: filePath.public_id
    });

    console.log(user)

    return res.json(user.data);
  } catch (error) {
    console.log(error)
    if (error.code == "ECONNRFFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavalaible",
      });
    }
    
    return res.status(400).json({ message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const apiURL = process.env.URL_ORM_HEROKU

    const user = await api.post(apiURL+"/users/login", req.body);

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
        const apiURL = process.env.URL_ORM_HEROKU

        const user = await api.get(apiURL+`/users/${req.params.id}`)        

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

        const apiURL = process.env.URL_ORM_HEROKU
                              
        const filePath  = await cloudinary.uploader.upload(req.file.path)        

        const user = await api.put(apiURL+`/users/${req.params.id}`, {
          ...req.body, 
          avatar: filePath.url
        });
        

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
            file: filePath,
            token: encodedtoken
        });

    } catch (error) {
        console.log(error)
        if (error.code == "ECONNRFFUSED") {
            return res.status(500).json({
              success: false,
              message: "Service unavalaible",
            });
          }
        
          return res.status(400).json({
            success: false,
            message: error.message,
          });
                
    }
   
}

exports.delete = async (req, res) => {
    try {                
        const apiURL = process.env.URL_ORM_HEROKU

        const user = await api.delete(apiURL+`/users/${req.params.id}`, req.body);

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