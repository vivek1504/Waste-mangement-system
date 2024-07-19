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
exports.cleanerHandler = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const JWT_SECRET = "WASTE_MANAGEMENT_SYSTEM";
exports.cleanerHandler = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const cleanerSignupSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
const cleanerSigninSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string()
});
exports.cleanerHandler.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    const { success } = cleanerSignupSchema.safeParse({ username, email, password });
    if (!success) {
        return res.json({ message: "invalid inputs" });
    }
    try {
        const existingUser = yield prisma.cleaner.findUnique({
            where: {
                username
            }
        });
        const existingEmail = yield prisma.cleaner.findUnique({
            where: {
                email
            }
        });
        if (existingUser || existingEmail) {
            return res.json({ message: "cleaner already exists" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const cleaner = yield prisma.cleaner.create({
            data: {
                username,
                password: hashedPassword,
                email
            }
        });
        const token = (0, jsonwebtoken_1.sign)({ username, role: "cleaner" }, JWT_SECRET);
        return res.json({ message: "user created successfully", token, user: cleaner });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot create user" });
    }
}));
exports.cleanerHandler.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const { success } = cleanerSigninSchema.safeParse({ username, password });
    if (!success) {
        return res.json({ message: "invalid inputs" });
    }
    try {
        const cleaner = yield prisma.cleaner.findUnique({ where: { username } });
        if (!cleaner) {
            return res.json({ message: "Invalid username or password" });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, cleaner.password);
        if (!passwordMatch) {
            return res.json({ message: "Invalid username or password" });
        }
        const token = (0, jsonwebtoken_1.sign)({ username, role: "cleaner" }, JWT_SECRET);
        return res.json({ message: "Login successful", token });
    }
    catch (error) {
        console.error(error);
        return res.json({ message: "Error logging in" });
    }
}));
exports.cleanerHandler.put("/assign-complaint", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body.user;
    if (role !== "cleaner") {
        return res.json({ message: "unauthorized access" });
    }
    const { username } = req.body.user;
    console.log(username);
    const complaintId = req.body.complaintId;
    console.log(complaintId);
    if (!complaintId) {
        return res.json({ message: "complaint id is required" });
    }
    try {
        const cleanerDetails = yield prisma.cleaner.findUnique({
            where: {
                username
            }
        });
        if (!cleanerDetails) {
            return res.json({ message: "error while fetching details" });
        }
        const assign = yield prisma.complaint.update({
            where: {
                id: complaintId
            },
            data: {
                cleanerId: cleanerDetails.id,
                status: "Processing"
            }
        });
        return res.json({ message: "complaint assigned successfully" });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "error while assinging complaint" });
    }
}));
exports.cleanerHandler.put("/finish-complaint", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body.user;
    if (role !== "cleaner") {
        return res.json({ message: "unauthorized access" });
    }
    const image = req.body.image;
    const complaintId = req.body.complaintId;
    try {
        const resolved = yield prisma.complaint.update({
            where: {
                id: complaintId
            },
            data: {
                afterImage: image,
                status: 'underEvaluation'
            }
        });
        return res.json({ message: "this complaint is placed under Evaluation" });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "failed to finish complaint " });
    }
}));
exports.cleanerHandler.get("/my-complaints", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body.user;
    if (role !== "cleaner") {
        return res.json({ message: "unauthorized access" });
    }
    const { username } = req.body.user;
    try {
        const userDetails = yield prisma.cleaner.findUnique({
            where: {
                username
            }
        });
        if (!userDetails) {
            return res.json({ message: "invalid user" });
        }
        const complaints = yield prisma.complaint.findMany({
            where: {
                cleanerId: userDetails.id
            },
            include: {
                address: true
            }
        });
        return res.json(complaints);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot get complaints" });
    }
}));
exports.cleanerHandler.get("/all-complaints", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { role } = req.body.user;
    if (role !== "cleaner") {
        return res.json({ message: "unauthorized access" });
    }
    try {
        const complaints = yield prisma.complaint.findMany({
            where: {
                status: {
                    in: ['Processing', 'underEvaluation', 'Raised']
                }
            },
            include: {
                address: true
            }
        });
        return res.json(complaints);
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot get complaints" });
    }
}));
