"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
app_1.default.listen(PORT, () => {
    console.log('App is running at http://localhost:%d in %s mode', PORT, NODE_ENV);
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=server.js.map