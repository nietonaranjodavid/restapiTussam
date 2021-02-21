"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pasajeros = exports.Tickets = void 0;
const mongoose_1 = require("mongoose");
// Definimos el Schema
const ticketSchema = new mongoose_1.Schema({
    _id: Number,
    _linea: String,
    _tarjeta: Boolean,
    _cantidad: Number,
    _precio: Number,
    _fecha: Date,
}, {
    collection: 'tickets'
});
const pasajeroSchema = new mongoose_1.Schema({
    _nombre: String,
    _apellido: String,
    _dni: String,
    _edad: Number,
}, {
    collection: 'pasajeros'
});
exports.Tickets = mongoose_1.model('tickets', ticketSchema);
exports.Pasajeros = mongoose_1.model('pasajeros', pasajeroSchema);
