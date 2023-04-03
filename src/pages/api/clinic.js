// import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios"

export default async function handler(req, res) {
    const clinic = req.body
    if (req.method === 'POST') {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/create-clinic`, clinic, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            const data = await response.data
            return res.end(JSON.stringify(data))
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
    if (req.method === 'PUT') {
        console.log(clinic)
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/admin/update-clinic/${clinic.id}`, clinic, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            const data = await response.data
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
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/admin/delete-clinic/${clinic.id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })

            const data = await response.data
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))            
        }
    }

}