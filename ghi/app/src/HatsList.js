import { useEffect, useState } from 'react';

function HatsList() {
    const [hats, setHats] = useState([])

    const getData = async () => {
        const response = await fetch('http://localhost:8090/api/hats/');

        if (response.ok) {
            const data = await response.json();
            setHats(data.Hats)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    async function handleClick(e) {
        const id = e.target.value

        const request = await fetch(`http://localhost:8090/api/hats/${id}/`, {
            method: "DELETE"
        })

        const resp = await request.json()
        console.log(e.target)

        if (resp.deleted) {
            alert("Item Deleted")
            window.location.reload(true)
        } else {
            alert("Could Not Delete Item")
        }
    }

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Fabric</th>
                    <th>Style Name</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {hats?.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{hat.fabric}</td>
                            <td>{hat.style_name}</td>
                            <td>{hat.color}</td>
                            <td><img src={hat.picture_url} height="120" /></td>
                            <td>{hat.location.closet_name}</td>
                            <td><button onClick={handleClick} value={hat.id} id={hat.id} className="btn btn-danger">Delete</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatsList;
