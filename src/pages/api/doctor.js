export default async function handler(req, res) {
    const doctor = req.body;
    if (req.method === 'POST') {
        try {
            console.log(doctor)
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
            console.log(response)
            console.log(data)
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
}