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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminHandler = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
exports.adminHandler = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.adminHandler.get("/under-evaluation-complaints", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield prisma.complaint.findMany({
            where: {
                status: "underEvaluation"
            }
        });
        return res.json({ complaints });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "cannot get complaints" });
    }
}));
exports.adminHandler.put("/evaluate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const complaintId = req.body.complaintId;
    const status = req.body.status;
    try {
        yield prisma.complaint.update({
            where: {
                id: complaintId
            },
            data: {
                status: status
            }
        });
        return res.json({ message: "evaluation complete" });
    }
    catch (error) {
        console.log(error);
        return res.json({ message: "evaluation failed" });
    }
}));
