import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


function ShoeColumn(props) {

    async function handleClick(e) {
        const id = e.target.value
        alert(`Delete item?`)
        const request = await fetch(`http://localhost:8080/shoes/${e.target.id}`, {
            method: "DELETE"
        })

        const resp = await request.json()

        if (resp.deleted) {
            window.location.reload()
        } else {
            alert("Could not delete item")
        }
    }

    return (
        <div className='col'>
            {props.list.map(data => {
                const shoe = data

                return (
                    <div key={shoe.id} className='card mb-3 shadow'>
                        <img src={shoe.image} className='card-img-top'/>
                        <div className="card-body">
                            <h5 className="card-title">{shoe.model_name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                {shoe.manufacturer}
                            </h6>
                            <p className="card-text">
                                {shoe.color}
                            </p>
                        </div>
                        <div className='card-footer'>
                            <button onClick={handleClick} id={shoe.id} className='btn btn-danger'>Delete</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}


    const ShoesList = (props) => {
        const [shoeColumns, setShoeColumns] = useState([[], [], [], []])

        const fetchData = async () => {
            const url = "http://localhost:8080/shoes/"

            try {
                const response = await fetch(url)
                if (response.ok) {
                    const data = await response.json()

                    const requests = []
                    for (let shoe of data.shoes) {
                        const detailUrl = `http://localhost:8080/shoes/${shoe.id}`

                        requests.push(fetch(detailUrl))
                    }

                    const columns = [[], [], [], []]

                    data.shoes.forEach((shoe, index) => {
                        columns[index % 4].push(shoe)
                    });

                    setShoeColumns(columns)
                }
            } catch (e) {
                console.error(e)
            }
        }

        useEffect(() => {
            fetchData()
        }, [])

        return (
            <>
            <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
                <h1 className="display-5 fw-bold">Shoes</h1>
            </div>
            <div className="container">
                <div className="row">
                {shoeColumns.map((shoeList, index) => {
                    return (
                    <ShoeColumn key={index} list={shoeList} />
                    );
                })}
                </div>
            </div>
            </>
        )
    }

    export default ShoesList
