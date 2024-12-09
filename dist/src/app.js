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
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const offer_1 = require("../models/offer");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(express_1.default.static("public"));
mongoose_1.default
    .connect("mongodb://127.0.0.1:27017/testdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
app.post("/upload", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { title, description, price } = req.body;
            if (!title || !description || typeof price === "undefined") {
                return res.status(400).send("All fields are required.");
            }
            const newOffer = new offer_1.Offer({
                title,
                description,
                price,
            });
            yield newOffer.save();
            return res.status(201).send("Offer saved successfully.");
        }
        catch (err) {
            if (err instanceof Error) {
                return res.status(500).send("Server error: " + err.message);
            }
            return res.status(500).send("An unknown error occurred.");
        }
    });
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}));
