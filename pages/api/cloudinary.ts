import { NextResponse } from "next/server";

export async function handler(req: any, res:any){
    
    
    console.log(req.body);
    
    if (req.method === "POST") {
    const data = await req.formData();
    console.log(data.get('file'))

    return NextResponse.json("Imagen")
    }
}