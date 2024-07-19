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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const adminRoutes_1 = require("./routes/adminRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const cleanerRoutes_1 = require("./routes/cleanerRoutes");
const mime_types_1 = __importDefault(require("mime-types"));
const cloudinary_1 = require("cloudinary");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/user", userRoutes_1.userHandler);
app.use("/cleaner", cleanerRoutes_1.cleanerHandler);
app.use("/admin", adminRoutes_1.adminHandler);
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/uploads/');
    },
    filename: (req, file, cb) => {
        const ext = mime_types_1.default.extension(file.mimetype);
        cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }
    const fileLocation = path_1.default.join(__dirname, "uploads", req.file.filename);
    const upload = (function () {
        return __awaiter(this, void 0, void 0, function* () {
            cloudinary_1.v2.config({
                cloud_name: 'dj7gqjguy',
                api_key: '364846129256229',
                api_secret: '7vYGQuB57AVGM_LHZ3t-r5GbiyA'
            });
            const uploadResult = yield cloudinary_1.v2.uploader.upload(fileLocation)
                .then(uploadResult => {
                console.log('Upload Result:', uploadResult.url);
                res.status(200).json({ url: uploadResult.url });
            })
                .catch(error => {
                console.error('Upload Error:', error);
                res.status(500).json({ message: 'Error uploading file' });
            });
        });
    })();
});
app.get("/address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lat, lon } = req.query;
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=6257fd3e07dd4faeb12b794a326ef911 `;
    const response = yield fetch(url);
    const data = yield response.json();
    res.json(data);
}));
app.listen(3000, () => {
    console.log("listening on port 3000");
});
