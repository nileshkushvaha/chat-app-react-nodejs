const mongoose = require('mongoose');
const { mongo_url } = require("./config");
const connectDb = async () => {
    await mongoose.connect(mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(
        () => {
            console.info(`Database connected sucessfully.`);
        },
        (error) => {
            console.error(`Connection error: ${error.stack}`);
            process.exit(1);
        }
    );
};
module.exports = connectDb;