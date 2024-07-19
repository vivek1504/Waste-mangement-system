"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHandler = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const zod_1 = require("zod");
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM";
exports.userHandler = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const userSignupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
const userSigninSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.userHandler.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, email } = req.body;
    const result = userSignupSchema.safeParse({ username, password, email });
    if (!result.success) {
        return res.status(400).json({ message: 'Missing username or password' });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const user = yield prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ username, role: "user" }, JWT_SECRET);
        res.status(201).json({ message: 'User created successfully', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
exports.userHandler.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const result = userSigninSchema.safeParse({ username, password });
    if (!result.success) {
        return res.status(400).json({ message: 'Missing username or password' });
    }
    try {
        const user = yield prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = (0, jsonwebtoken_1.sign)({ username, role: "user" }, JWT_SECRET);
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
    }
}));
exports.userHandler.post("/raise-complaint", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body.user;
    if (role !== 'user') {
        return res.status(403).json({ message: "unauthorized access" });
    }
    const { username } = req.body.user;
    const { flat, area, pincode, city, state } = req.body.address;
    const { beforeImage } = req.body;
    const pincodeInt = parseInt(pincode);
    try {
        const userDetails = yield prisma.user.findUnique({
            where: {
                username: username,
            },
        });
        if (!userDetails) {
            return res.status(404).json({ message: "user does not exist" });
        }
        const address = yield prisma.address.create({
            data: {
                flat: flat,
                area: area,
                pincode: pincodeInt,
                city: city,
                state: state,
            },
        });
        const newComplaint = yield prisma.complaint.create({
            data: {
                address: {
                    connect: { id: address.id },
                },
                beforeImage: beforeImage,
                raisedBy: {
                    connect: { id: userDetails.id },
                },
                status: "Raised",
                createdOn: new Date(),
            },
        });
        return res.status(201).json({
            message: "Complaint raised successfully",
            complaint: newComplaint,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}));
exports.userHandler.get("/myComplaints", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body.user;
    const { role } = req.body.user;
    if (role !== "user") {
        return res.json({ message: "unauthorized access" });
    }
    try {
        const userDetails = yield prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!userDetails) {
            return res.json({ message: "user not found" });
        }
        const myComplaints = yield prisma.complaint.findMany({
            where: {
                raiserId: userDetails.id,
            },
            include: {
                address: true
            }
        });
        return res.json({ myComplaints });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot get complaints" });
    }
}));
