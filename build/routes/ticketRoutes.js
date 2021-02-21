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
exports.ticketRoutes = void 0;
const express_1 = require("express");
const Ticket_1 = require("../model/Ticket");
const Ticket_2 = require("../model/Ticket");
const database_1 = require("../database/database");
class TicketRoutes {
    constructor() {
        this.getTickets = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then((mensaje) => __awaiter(this, void 0, void 0, function* () {
                console.log(mensaje);
                const query = yield Ticket_1.Tickets.find({});
                console.log(query);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
                console.log(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.getTicket = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            const p = yield Ticket_1.Tickets.find({ _id: id });
            yield database_1.db.desconectarBD();
            res.json(p);
        });
        this.getPasajeros = (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield database_1.db.conectarBD()
                .then(() => __awaiter(this, void 0, void 0, function* () {
                const query = yield Ticket_2.Pasajeros.aggregate([
                    {
                        $lookup: {
                            from: 'tickets',
                            localField: '_dni',
                            foreignField: '_id',
                            as: "TicketIndividual"
                        }
                    }
                ]);
                res.json(query);
            }))
                .catch((mensaje) => {
                res.send(mensaje);
            });
            yield database_1.db.desconectarBD();
        });
        this.nuevoTicketPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { id, linea, tarjeta, cantidad, precio, fecha } = req.body;
            console.log(id);
            const dSchema = {
                _id: id,
                _linea: linea,
                _tarjeta: tarjeta,
                _cantidad: parseInt(cantidad),
                _precio: parseInt(precio),
                _fecha: new Date(fecha),
            };
            console.log(dSchema);
            const oSchema = new Ticket_1.Tickets(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.nuevoTicketGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id, linea, tarjeta, cantidad, fecha, precio } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _id: id,
                _linea: linea,
                _tarjeta: tarjeta,
                _cantidad: parseInt(cantidad),
                _precio: parseInt(precio),
                _fecha: new Date(fecha),
            };
            const oSchema = new Ticket_1.Tickets(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.nuevoPasajeroPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            // Observar la diferencia entre req.body (para POST) 
            // y req.params (para GET con los parámetros en la URL
            const { nombre, apellido, dni, edad } = req.body;
            console.log(nombre);
            const dSchema = {
                _nombre: nombre,
                _apellido: apellido,
                _dni: dni,
                _edad: parseInt(edad)
            };
            console.log(dSchema);
            const oSchema = new Ticket_2.Pasajeros(dSchema);
            yield database_1.db.conectarBD();
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.nuevoPasajeroGet = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, dni, edad } = req.params;
            console.log(req.params);
            yield database_1.db.conectarBD();
            const dSchema = {
                _nombre: nombre,
                _apellido: apellido,
                _dni: dni,
                _edad: parseInt(edad)
            };
            const oSchema = new Ticket_2.Pasajeros(dSchema);
            yield oSchema.save()
                .then((doc) => {
                console.log('Salvado Correctamente: ' + doc);
                res.json(doc);
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.send('Error: ' + err);
            });
            // concatenando con cadena muestra sólo el mensaje
            yield database_1.db.desconectarBD();
        });
        this.getDelete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.db.conectarBD();
            yield Ticket_1.Tickets.findOneAndDelete({ _id: id }, (err, doc) => {
                if (err)
                    console.log(err);
                else {
                    if (doc == null) {
                        console.log(`No encontrado`);
                        res.send(`No encontrado`);
                    }
                    else {
                        console.log('Borrado correcto: ' + doc);
                        res.send('Borrado correcto: ' + doc);
                    }
                }
            });
            yield database_1.db.desconectarBD();
        });
        this.actualiza = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { linea, tarjeta, cantidad, precio, fecha } = req.body;
            yield database_1.db.conectarBD();
            yield Ticket_1.Tickets.findOneAndUpdate({ _id: id }, {
                _id: id,
                _linea: linea,
                _tarjeta: tarjeta,
                _cantidad: parseInt(cantidad),
                _precio: parseInt(precio),
                _fecha: new Date(fecha),
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El ticket que desea modificar no existe');
                    res.json({ "Error": "No existe el ticket: " + id });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            yield database_1.db.desconectarBD();
        });
        this.updatePasajeros = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { dni } = req.params;
            const { nombre, apellido, edad } = req.body;
            yield database_1.db.conectarBD();
            yield Ticket_2.Pasajeros.findOneAndUpdate({ _nombre: nombre }, {
                _nombre: nombre,
                _apellido: apellido,
                _dni: dni,
                _edad: edad
            }, {
                new: true,
                runValidators: true // para que se ejecuten las validaciones del Schema
            })
                .then((docu) => {
                if (docu == null) {
                    console.log('El pasajero no esta registrado');
                    res.json({ "Error": "No existe: " + nombre });
                }
                else {
                    console.log('Modificado Correctamente: ' + docu);
                    res.json(docu);
                }
            })
                .catch((err) => {
                console.log('Error: ' + err);
                res.json({ error: 'Error: ' + err });
            }); // concatenando con cadena muestra mensaje
            yield database_1.db.desconectarBD();
        });
        this._router = express_1.Router();
    }
    get router() {
        return this._router;
    }
    misRutas() {
        this._router.get('/', this.getTickets);
        this._router.get('/pasajeros', this.getPasajeros);
        this._router.get('/nuevoT/:id&:linea&:tarjeta&:precio&:cantidad&:fecha', this.nuevoTicketGet);
        this._router.post('/nuevoT1', this.nuevoTicketPost);
        this._router.get('/nuevoP/:nombre&:nombre&:apellidos&:dni&:edad', this.nuevoPasajeroGet);
        this._router.post('/nuevoP1', this.nuevoPasajeroPost);
        this._router.get('/borrar/:id', this.getDelete);
        this._router.post('/actualiza/:id', this.actualiza);
        this._router.post('/pasajero/actualizar/:dni', this.updatePasajeros);
        this.router.get('/id', this.getTicket);
    }
}
const obj = new TicketRoutes();
obj.misRutas();
exports.ticketRoutes = obj.router;
