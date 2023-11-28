import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Prisma } from ".prisma/client";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
/*
const client = new PrismaClient;
export default async function handler(req, res){
    
    console.log (req.body, "\n");

    const session = await getServerSession(req, res, authOptions);

    //Conseguir usuario loggeado
    const usuario = await client.user.findFirst ({
        where: {
            email: session.user.email,
        }
    })
        
    //conseguir todas las tareas
    if (req.method === "GET") {
        const tareas = await client.tareasPomodoro.findMany({
            where: {
                userId: usuario.id,
            },
            select: {
                tarea: true,
                clase: true,
                fecha: true,
            },
        })
    
        console.log("Tareas: \n", tareas);
        res.status(200).json({tareas: tareas});
    }

    //Crear tarea
    else if (req.method === "POST") {
        //crear tarea
        if (req.body.tipo == "tarea") {
            
            if (req.body.dato == "" || req.body.clase == "Seleccionar Clase" || req.body.date == "") {
                console.log("Tarea o clase vacia");
                res.status(400).json({error: 'vacio'});

            }

            else {
                try {
                    const crearTarea = await client.tareasPomodoro.create({
                        data: {
                            userId: usuario.id,
                            tarea: req.body.dato as string, 
                            clase: req.body.clase as string,
                            fecha: req.body.date as string,
                        },
                    })    
    
                    console.log("Tarea creada: \n", crearTarea);
                    res.status(200).json({
                        tarea: crearTarea.tarea, 
                        clase: crearTarea.clase,
                        fecha: crearTarea.fecha,
                    });
                } 
                //Tirar error si tarea ya existe
                catch (e) {
                    if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    if (e.code === 'P2002') {
                        console.log(
                        'Unique constraint violation, la tarea ya existe'
                        )
                        res.status(400).json({error: 'P2002'});
                    }
                    }
                    //throw e
                }
            }
            
        }    
    }

    else if (req.method === "DELETE") {
        
        const borrarTarea = await client.registers.delete ({
        where: {
            idReg: usuario.id,
            email: ,
            number: ,
            img: ,
            text: ,
            ,
        },
        })

        res.status(200).json({tarea: });
    }
}*/