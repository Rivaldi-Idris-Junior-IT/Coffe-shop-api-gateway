const apiAdapter = require("../Helper/ApiAdapter");
const api = apiAdapter(process.env.URL_SERVICE_USER);
const jwt = require("jsonwebtoken");

exports.getOrdersAll = async (req, res) => {
    try {
        const order = await api.get(`/orders/`)        

        let token = req.headers.authorization;

        splittoken = token.split("Bearer ")[1];    

        const decoded = jwt.verify(splittoken, process.env.SECRET_TOKEN);    

        const encoded = decoded.data;

        const encodedtoken = jwt.sign({ encoded }, process.env.SECRET_TOKEN, {
            expiresIn: "1d",
        });                
        
        return res.json({
            success: true,
            result: order.data,
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
        return res.status(500).json(data);
    }
}

exports.addOrders = async (req, res) => {
  try {
    const user = await api.post("/orders/", req.body);

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
      token: encodedtoken,
    });
  } catch (error) {
    if (error.code == "ECONNRFFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavalaible",
      });
    }

    const { data } = error.response;
    return res.status(500).json(data);
  }
};

exports.getUpdate = async (req, res) => {
  try {
    const user = await api.put(`/orders/${req.params.id}`, req.body);

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
      token: encodedtoken,
    });
  } catch (error) {
    if (error.code == "ECONNRFFUSED") {
      return res.status(500).json({
        success: false,
        message: "Service unavalaible",
      });
    }

    const { status, data } = error.response;
    return res.status(500).json(data);
  }
};

exports.delete = async (req, res) => {
  try {
    const user = await api.delete(`/orders/${req.params.id}`);

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
};
