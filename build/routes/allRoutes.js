"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllRoutes = void 0;
const notes_handeler_1 = __importDefault(require("./../handelers/notes.handeler"));
//not to import all the functions in the server file
function fetchAllRoutes(app) {
    (0, notes_handeler_1.default)(app);
}
exports.fetchAllRoutes = fetchAllRoutes;
