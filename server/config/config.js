require("dotenv").config();
module.exports = {
    endpoint: process.env.API_URL,
    mongo_url: process.env.MONGOOOSE_URL,
    port: process.env.PORT,
};

// require("crypto").randomBytes(64).toString("hex");