import axios from "axios"

export default async function handler(req, res) {
    const doctor = req.body;
    if (req.method === 'POST') {
        try {
            console.log(doctor)
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/create-doctor`, doctor, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': 'Content-Type'     
                },
                withCredentials: true
            })
            const data = await response.data
            console.log(response)
            console.log(data)
            return res.end(JSON.stringify(data))
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))            
        }
    }
    if (req.method === 'PUT') {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/admin/update-doctor/${doctor.id}`, doctor, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': 'Content-Type'     
                },
                withCredentials: true
            })

            const data = await response.data
            console.log(response)
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
    if (req.method === 'DELETE') {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/admin/delete-doctor/${doctor.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Request-Headers': 'Content-Type'     
                },
                withCredentials: true
            })

            const data = await response.data
            console.log(response)
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
}