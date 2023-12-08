import { NextApiRequest, NextApiResponse } from "next";

export const config = {
    api: {
        bodyParser: false,
    },
};


export default async function POST(req:any, res:any){
    
    
    console.log(req.body);
    
    if (req.method === "POST") {

     const data = await req.formData();
     const image = data.get('image')

     if(!image){
        return res.json("No se subió la imagen", {status: 400});
     }

     const bytes = await image.arrayBuffer()
     const buffer = Buffer.from(bytes)

     return res.json("Imagen subida");
    }
}