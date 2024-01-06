import { useEffect, useState } from 'react';


async function handleClick(e) {
    const id = e.target.value

    const request = await fetch('http://localhost:8090/api/hats/'+ id + '/', {
        method: "DELETE"
    })

    const resp = await request.json()

    if (resp.deleted) {
        alert("Item Deleted")
        window.location.reload(true)
    } else {
        alert("Could Not Delete Item")
    }
}


function HatsColumn(props) {

    return (
        <div className="col">
            {props.list?.map((data) => {
                const hat = data;
                return (
                    <div key={hat.id} className="card mb-3 shadow">
                        <img
                            src={hat.picture_url}
                            className="card-img-top"
                            alt='Location of hat'
                        />
                        <div className="card-body">
                            <h5 className="card-title">{hat.style_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {hat.fabric}
                            </h6>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {hat.color}
                            </h6>
                            <h6 className="card-subtitle mb-2">
                                Located: {hat.location.closet_name}
                            </h6>
                        </div>
                        <div className="card-footer">
                            <button onClick={handleClick} value={hat.id} id={hat.id} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function HatsList() {
    const [hatColumns, setHatColumns] = useState([], [], [])

    async function getData() {

        try {
            const response = await fetch('http://localhost:8090/api/hats/');

            if (response.ok) {
                const data = await response.json();

                const requests = []
                for (let hat of data.Hats) {
                    let id = hat.id
                    let detailURL = 'http://localhost:8090/api/hats/' + id + '/'
                    requests.push(fetch(detailURL))
                }

                const responses = await Promise.all(requests)
                const hatColumns = [[],[],[]]

                let i = 0
                for (const hatResponse of responses) {
                    if (hatResponse.ok) {
                        const details = await hatResponse.json()
                        hatColumns[i].push(details)
                        i = i + 1
                        if (i > 2) {
                            i = 0
                        }
                    } else {
                        console.error(hatResponse)
                    }
                }
                setHatColumns(hatColumns)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getData()
    }, [])



    return (
        <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
            <h1 className="display-5 fw-bold">Hats</h1>
        </div>
        <div className="container">
            <div className="row">
                {hatColumns.map((hatList, index) => {
                    return (
                        <HatsColumn key={index} list={hatList} />
                    );
                })}
            </div>
        </div>
    </>
    );
}

export default HatsList;
