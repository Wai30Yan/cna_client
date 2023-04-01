// import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req, res) {
    const { clinic } = req.body
    clinic
    if (req.method === 'POST') {
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
            console.log(data)
            data
            return res.end(JSON.stringify(data))
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
    if (req.method === 'PUT') {
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
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err) {
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
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))            
        }
    }

}