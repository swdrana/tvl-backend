"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user_id, role) => {
    return jsonwebtoken_1.default.sign({ user_id, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};
exports.default = generateToken;
