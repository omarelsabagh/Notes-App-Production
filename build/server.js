"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
const path_1 = __importDefault(require("path"));
const core_1 = require("@octokit/core");
const webhooks_1 = require("@octokit/webhooks");
const octokit = new core_1.Octokit();
const webhooks = new webhooks_1.Webhooks({
    secret: 'zaclouds-test-secret',
});
webhooks.onAny(({ id, name, payload }) => {
    console.log(name, 'event received');
});
dotenv_1.default.config();
const allRoutes_1 = require("./routes/allRoutes");
exports.app = (0, express_1.default)();
exports.app.use((0, webhooks_1.createNodeMiddleware)(webhooks));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, '../client/build')));
exports.app.use(cors());
exports.app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, X-Requested-With, Content-Type, Accept');
    next();
});
//env variable for the port
const port = process.env.PORT || 5000;
// allRoutes file in routes folder
(0, allRoutes_1.fetchAllRoutes)(exports.app);
exports.app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/build/index.html'));
});
exports.app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});
