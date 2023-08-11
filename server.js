const express = require("express");
const server = express();
const cors = require("cors");
require("dotenv").config();

const routes = require("./routes/contactRoutes");

const errorHandler = require("./middleware/errorHandler");

server.use(cors());

const port = process.env.PORT || 3000;

server.use(express.json());

server.use(errorHandler);

server.use("/api/contact", routes);

server.listen(port, () => {
    console.log(`*** Node run on Port: ${port} ***`);
});