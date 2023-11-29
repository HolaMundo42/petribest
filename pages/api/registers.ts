// import { PrismaClient, Prisma } from ".prisma/client";
// import { authOptions } from "../api/auth/[...nextauth]";
// import { getServerSession } from "next-auth/next";

// const client = new PrismaClient;


// export default async function handler(req:any, res:any){

//     console.log(req.body)
    
//     const session = await getServerSession(req, res, authOptions);
    
//     const user = await client.user.findFirst ({
//         where: {
//             email: session.user.email, //ignorar error
//         }
//     })
    
//     if (req.method === "GET") {
//         const PetriData = await client.registers.findMany({
//             where: {
//                 userId: user.id,
//             },
//             select: {
//                 name: true,
//                 date: true,
//                 colonies: true,
//                 img: true,
//                 info: true,
//             },
//         })
    
//         console.log("PetriData: \n", PetriData);
//         res.status(200).json({data: PetriData});
//     }

//     else if (req.method === "POST") {
//         console.log("a")
//         try {
//             const petriPOST = await client.registers.create({
//                 data: {
//                     userId: user.id,
//                     name: req.body.name as string,
//                     date: req.body.dato as string,
//                     colonies: req.body.colonies as number,
//                     img: req.body.img.url as string,
//                     info: req.body.info as string,
//                 },
//             })    

//             console.log("PetriData petripuesta: \n", petriPOST);
//             res.status(200).json({
//                 name: petriPOST.name,
//                 date: petriPOST.date,
//                 colonies: petriPOST.colonies,
//                 img: petriPOST.img,
//                 info: petriPOST.info,
//             });
//         } 
//         catch (e) {
//             if (e instanceof Prisma.PrismaClientKnownRequestError) {
//             if (e.code === 'P2002') {
//                 console.log(
//                 'Unique constraint violation'
//                 )
//                 res.status(400).json({error: 'P2002'});
//             }
//             }
//         }
//     }

//     else if (req.method === "DELETE") {
        
//         const borrarPetriDish = await client.registers.delete ({
//         where: {
//             userId: user.id,
//             name: req.body.name as string,
//         },
//         })

//         console.log("petriBYE (un honor haber sido parte de petrilab): \n", borrarPetriDish);
//         res.status(200).json({name: borrarPetriDish.name});
//     }

// }