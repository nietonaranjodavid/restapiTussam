import { Request, Response, Router } from 'express'
import { Tickets } from '../model/Ticket'
import { Pasajeros } from '../model/Ticket'
import { db } from '../database/database'
import { identificacionRoutes } from './identificacionRoutes'

class TicketRoutes {
    private _router: Router

    constructor() {
        this._router = Router()
    }
    get router(){
        return this._router
    }

    private getTickets = async (req: Request, res: Response) => {
        await db.conectarBD()
        .then( async (mensaje) => {
            console.log(mensaje)
            const query:any  = await Tickets.find({})
            console.log(query)
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
            console.log(mensaje)
        })

        await db.desconectarBD()
    }

    private getTicket = async (req: Request, res: Response) => {
        const { id } = req.params
        await db.conectarBD()

        const p = await Tickets.find(
                { _id: id }
            )
        
        await db.desconectarBD()
        res.json(p)
    }
  


    private getPasajeros = async (req:Request, res: Response) => {
        await db.conectarBD()
        .then( async ()=> {
            const query = await Pasajeros.aggregate([
                {
                    $lookup: {
                        from: 'tickets',
                        localField: '_dni',
                        foreignField: '_id',
                        as: "TicketIndividual"
                    }
                }
            ])
            res.json(query)
        })
        .catch((mensaje) => {
            res.send(mensaje)
        })
        await db.desconectarBD()
    }



    private nuevoTicketPost = async (req: Request, res: Response) => {
        console.log(req.body)
        // Observar la diferencia entre req.body (para POST) 
        // y req.params (para GET con los parámetros en la URL
        const { id, linea, tarjeta, cantidad, precio, fecha } = req.body

        console.log(id)

        const dSchema = {
            _id: id,
            _linea: linea,
            _tarjeta: tarjeta,
            _cantidad: parseInt(cantidad),
            _precio: parseInt(precio),
            _fecha: new Date(fecha),
        }
        console.log(dSchema)
        const oSchema = new Tickets(dSchema)
        await db.conectarBD()
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    }     

    private nuevoTicketGet = async (req: Request, res: Response) => {
        const { id, linea, tarjeta, cantidad, fecha, precio } = req.params
        console.log(req.params)

        await db.conectarBD()
        const dSchema = {
            _id: id,
            _linea: linea,
            _tarjeta: tarjeta,
            _cantidad: parseInt(cantidad),
            _precio: parseInt(precio),
            _fecha: new Date(fecha),
        }
        const oSchema = new Tickets(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    }  
   


    private nuevoPasajeroPost = async (req: Request, res: Response) => {
        console.log(req.body)
        // Observar la diferencia entre req.body (para POST) 
        // y req.params (para GET con los parámetros en la URL
        const { nombre, apellido, dni, edad} = req.body

        console.log(nombre)

        const dSchema = {
            _nombre: nombre,
            _apellido: apellido,
            _dni: dni,
            _edad: parseInt(edad)
        }
        console.log(dSchema)
        const oSchema = new Pasajeros(dSchema)
        await db.conectarBD()
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    }


    private nuevoPasajeroGet = async (req: Request, res: Response) => {
        const { nombre, apellido, dni, edad } = req.params
        console.log(req.params)

        await db.conectarBD()
        const dSchema = {
            _nombre: nombre,
            _apellido: apellido,
            _dni: dni,
            _edad: parseInt(edad)
        }
        const oSchema = new Pasajeros(dSchema)
        await oSchema.save()
        .then( (doc) => {
            console.log('Salvado Correctamente: '+ doc)
            res.json(doc)
        })
        .catch( (err: any) => {
            console.log('Error: '+ err)
            res.send('Error: '+ err)
        }) 
        // concatenando con cadena muestra sólo el mensaje
        await db.desconectarBD()
    } 



    private getDelete = async (req: Request, res: Response) => {
        const {id } = req.params
        await db.conectarBD()
        await Tickets.findOneAndDelete(
            { _id: id }, 
            (err: any, doc) => {
                if(err) console.log(err)
                else{
                    if (doc == null) {
                        console.log(`No encontrado`)
                        res.send(`No encontrado`)
                    }else {
                        console.log('Borrado correcto: '+ doc)
                        res.send('Borrado correcto: '+ doc)
                    }
                }
            })
        await db.desconectarBD()
    }
    
    private actualiza = async (req: Request, res: Response) => {
        const {id} = req.params
        const {linea, tarjeta, cantidad, precio, fecha } = req.body
        await db.conectarBD()
        await Tickets.findOneAndUpdate(
                { _id: id }, 
                {
                    _id: id,
                    _linea: linea,
                    _tarjeta: tarjeta,
                    _cantidad: parseInt(cantidad),
                    _precio: parseInt(precio),
                    _fecha: new Date(fecha),
                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('El ticket que desea modificar no existe')
                        res.json({"Error":"No existe el ticket: "+id})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) // concatenando con cadena muestra mensaje
        await db.desconectarBD()
    }


    private updatePasajeros = async (req: Request, res: Response) => {
        const { dni } = req.params
        const { nombre, apellido, edad } = req.body
        await db.conectarBD()
        await Pasajeros.findOneAndUpdate(
                { _nombre: nombre }, 
                {
                    _nombre: nombre,
                    _apellido: apellido,
                    _dni: dni,
                    _edad: edad
                },
                {
                    new: true,
                    runValidators: true // para que se ejecuten las validaciones del Schema
                }  
            )
            .then( (docu) => {
                    if (docu==null){
                        console.log('El pasajero no esta registrado')
                        res.json({"Error":"No existe: "+nombre})
                    } else {
                        console.log('Modificado Correctamente: '+ docu) 
                        res.json(docu)
                    }
                    
                }
            )
            .catch( (err) => {
                console.log('Error: '+err)
                res.json({error: 'Error: '+err })
            }
            ) // concatenando con cadena muestra mensaje
        await db.desconectarBD()
    }        


    misRutas(){
        this._router.get('/', this.getTickets)
        this._router.get('/pasajeros', this.getPasajeros)
        this._router.get('/nuevoT/:id&:linea&:tarjeta&:precio&:cantidad&:fecha', this.nuevoTicketGet)
        this._router.post('/nuevoT1', this.nuevoTicketPost)
        this._router.get('/nuevoP/:nombre&:nombre&:apellidos&:dni&:edad', this.nuevoPasajeroGet)
        this._router.post('/nuevoP1', this.nuevoPasajeroPost)
        this._router.get('/borrar/:id', this.getDelete)
        this._router.post('/actualiza/:id', this.actualiza)
        this._router.post('/pasajero/actualizar/:dni', this.updatePasajeros)
        this.router.get('/id', this.getTicket)
    }
}

const obj = new TicketRoutes()
obj.misRutas()
export const ticketRoutes = obj.router