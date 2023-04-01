export default async function handler(req, res) {
    const { appointment } = req.body
    if (req.method === 'POST') {
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
            return res.end(JSON.stringify(data))
        }
        catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }

    if (req.method === 'PUT') {
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
            return res.end(JSON.stringify(data))            
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }

    if (req.method === 'DELETE') {
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
            return res.end(JSON.stringify(data))         
        } catch (err) {
            console.log(err)
            return res.end(JSON.stringify({"error": err.message }))
        }
    }
}

