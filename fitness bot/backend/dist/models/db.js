"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpectralSensor = exports.GasSensor = exports.user = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://csiocsir052:lwvZD66SpomIzE31@cluster0.sqrho.mongodb.net/");
const userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true, minlength: 3, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6, maxlength: 60, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true }
});
const gasSensorSchema = new mongoose_1.default.Schema({
    metadata: { type: Object, default: {} }, // Optional metadata field
    timeStamp: { type: Date, required: true, index: true }, // Time field, must be indexed
    channel1: { type: Number, required: true },
    channel2: { type: Number, required: true },
    channel3: { type: Number, required: true },
    channel4: { type: Number, required: true }
});
const spectralSensorSchema = new mongoose_1.default.Schema({
    Timestamp: { type: Date, required: true, index: true }, // Must be a Date type for time series
    metadata: {
        Sample_Id: { type: String, required: true, unique: true, trim: true },
        city: { type: String, required: true, trim: true },
        Species: { type: String, required: true, trim: true }
    },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    weather: { type: Number, required: true },
    image: { type: String, required: true }, // Assuming base64 string or URL
    // Spectral sensor readings
    "410": { type: Number, required: true },
    "450": { type: Number, required: true },
    "470": { type: Number, required: true },
    "490": { type: Number, required: true },
    "510": { type: Number, required: true },
    "530": { type: Number, required: true },
    "550": { type: Number, required: true },
    "570": { type: Number, required: true },
    "590": { type: Number, required: true },
    "610": { type: Number, required: true },
    "630": { type: Number, required: true },
    "650": { type: Number, required: true },
    "670": { type: Number, required: true },
    "690": { type: Number, required: true },
    "710": { type: Number, required: true },
    "730": { type: Number, required: true },
    "860": { type: Number, required: true },
    "940": { type: Number, required: true }
}, { timestamps: false }); // Time series collections do not need Mongoose timestamps
const SpectralSensor = mongoose_1.default.model("SpectralSensorTS", spectralSensorSchema, "spectralsensor_timeseries");
exports.SpectralSensor = SpectralSensor;
const user = mongoose_1.default.model("User", userSchema);
exports.user = user;
const GasSensor = mongoose_1.default.model("GasSensor", gasSensorSchema, "gassensor_timeseries");
exports.GasSensor = GasSensor;
