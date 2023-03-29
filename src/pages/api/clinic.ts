import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { clinic } = req.body
    console.log("calling api", clinic)
    if (req.method === 'POST') {
        console.log('POST req.', clinic)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/create-clinic`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-req.': "POST",
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify(clinic),
                mode: 'cors',
                credentials: 'include',
            })

            const data = await response.json()
            return res.end(JSON.stringify(data))
        } catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
    if (req.method === 'PUT') {
        console.log('PUT method', clinic)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/update-clinic/${clinic.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-req.': "PUT",
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify(clinic),
                mode: 'cors',
                credentials: 'include',
            })

            const data = await response.json()
            return res.end(JSON.stringify(data))            
        } catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
    if (req.method === 'DELETE') {
        console.log('DELETE method', clinic)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/delete-clinic/${clinic.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-req.': "DELETE",
                    'Access-Control-Request-Headers': 'Content-Type'
                },
                mode: 'cors',
                credentials: 'include',
            })

            const data = await response.json()
            return res.end(JSON.stringify(data))            
        } catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))            
        }
    }

}