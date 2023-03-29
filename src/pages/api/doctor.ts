import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { doctor } = req.body;
    console.log("calling api", doctor)
    if (req.method === 'POST') {
        console.log("POST method", doctor)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/create-doctor`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': "POST",
                    'Access-Control-Request-Headers': 'Content-Type'     
                },
                body: JSON.stringify(doctor),
                mode: 'cors',
                credentials: 'include',
            })

            const data = await response.json()
            return res.end(JSON.stringify(data))
        } catch (error) {
            
        }
    }
    if (req.method === 'PUT') {
        console.log("PUT method", doctor)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/update-doctor/${doctor.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': "PUT",
                    'Access-Control-Request-Headers': 'Content-Type'     
                },
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(doctor),
            })

            const data = await response.json()
            return res.end(JSON.stringify(data))            
        } catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
    if (req.method === 'DELETE') {
        console.log("DELETE method", doctor)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/delete-doctor/${doctor.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Method': "DELETE",
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