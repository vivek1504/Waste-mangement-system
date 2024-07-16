"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const adminRoutes_1 = require("./routes/adminRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const cleanerRoutes_1 = require("./routes/cleanerRoutes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", userRoutes_1.userHandler);
app.use("/cleaner", cleanerRoutes_1.cleanerHandler);
app.use("/admin", adminRoutes_1.adminHandler);
app.listen(3000, () => {
    console.log("listening on port 3000");
});
