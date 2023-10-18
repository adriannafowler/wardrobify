import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


function ShoeColumn(props) {
    return (
        <div className='col'>
            {props.list.map(data => {
                const shoe = data
                // console.log(shoe)
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
                    // console.log(data)
                    const requests = []
                    for (let shoe of data.shoes) {
                        const detailUrl = `http://localhost:8080/shoes/${shoe.id}`
                        // console.log(shoe)
                        requests.push(fetch(detailUrl))
                    }
                    // console.log(data)

                    const responses = await Promise.all(requests)

                    const columns = [[], [], [], []]

                    data.shoes.forEach((shoe, index) => {
                        columns[index % 4].push(shoe); // Distribute shoes into columns in a circular manner
                    });

                    // let i = 0
                    // for (const shoeResponse of responses) {
                    //     if (shoeResponse.ok) {
                    //         const details = await shoeResponse.json()
                    //         columns[i] = i + 1
                    //         if (i > 3) {
                    //             i = 0
                    //         }
                    //     } else {
                    //         console.error("shoe response:", shoeResponse)
                    //     }
                    // }
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
