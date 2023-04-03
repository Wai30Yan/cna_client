import axios from "axios"

export default async function handler(req, res) {
    const appointment = req.body
    if (req.method === 'POST') {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/admin/create-appointment`, appointment, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                withCredentials: true
            });
            const data = await response.data
            return res.end(JSON.stringify(data))
        }
        catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }

    if (req.method === 'PUT') {
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_URL}/admin/update-appointment/${appointment.id}`, appointment, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                withCredentials: true
            });
            const data = await response.data
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }

    if (req.method === 'DELETE') {
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_URL}/admin/delete-appointment/${appointment.id}`, {
                headers: {
                  'Content-Type': 'application/json',
                  'Access-Control-Request-Headers': 'Content-Type'
                },
                withCredentials: true
            });
            const data = await response.data
            return res.end(JSON.stringify(data))         
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
}

