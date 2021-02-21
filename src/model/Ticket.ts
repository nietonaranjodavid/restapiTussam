import {Schema, model } from 'mongoose'
import { identificacionRoutes } from '../routes/identificacionRoutes'
// Definimos el Schema
const ticketSchema = new Schema({
    _id: Number,
    _linea: String,
    _tarjeta: Boolean,
    _cantidad: Number,
    _precio: Number,
    _fecha: Date,
},
{
    collection:'tickets'
})

const pasajeroSchema = new Schema({
    _nombre: String,
    _apellido: String,
    _dni: String,
    _edad: Number, 
},
{
    collection:'pasajeros'
})
export const Tickets = model('tickets', ticketSchema)
export const Pasajeros = model('pasajeros', pasajeroSchema)