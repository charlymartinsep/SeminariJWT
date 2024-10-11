"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.experienciasofDB = exports.experienciasSchema = void 0;
const mongoose_1 = require("mongoose");
exports.experienciasSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'user' },
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }],
    description: String
});
exports.experienciasofDB = (0, mongoose_1.model)('experiencias', exports.experienciasSchema);
