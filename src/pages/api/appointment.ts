
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { appointment } = req.body
    console.log("calling api", appointment)
    if (req.method === 'POST') {
        console.log("POST method", appointment)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/create-appointment'`, {
                method: "POST",
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Method': "POST",
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify( appointment ),
                mode: 'cors',
                credentials: 'include',
            });
            const data = await response.json()
            console.log(data)
            return res.end(JSON.stringify(data))
        }
        catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }

    if (req.method === 'PUT') {
        console.log("PUT method", appointment)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/update-appointment/${appointment.id}`, {
                method: "PUT",
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Method': "DELETE",
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                body: JSON.stringify( appointment ),
                mode: 'cors',
                credentials: 'include',
            });
            const data = await response.json()
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }

    if (req.method === 'DELETE') {
        console.log("DELETE method", appointment)
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/admin/delete-appointment/${appointment.id}`, {
                method: "DELETE",
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Method': "DELETE",
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                mode: 'cors',
                credentials: 'include',
            });
            const data = await response.json()
            console.log(data)
            return res.end(JSON.stringify(data))         
        } catch (err: any) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
}

