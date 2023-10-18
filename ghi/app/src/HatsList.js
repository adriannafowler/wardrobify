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

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Fabric</th>
                    <th>Style Name</th>
                    <th>Color</th>
                    <th>Picture</th>
                    <th>Location</th>
                </tr>
            </thead>
            <tbody>
                {hats.map(hat => {
                    return (
                        <tr key={hat.id}>
                            <td>{hat.fabric}</td>
                            <td>{hat.style_name}</td>
                            <td>{hat.color}</td>
                            <td><img src={hat.picture_url} height="120" /></td>
                            <td>{hat.location.import_href}</td>


                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default HatsList;
