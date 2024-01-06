import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './locations.css'
import default_closet from './default_closet.svg'


const Locations = () => {
    const [bins, setBins] = useState([])
    const navigate = useNavigate();

    const fetchBinsData = async () => {
        const binsUrl = "http://localhost:8100/api/bins"

        const binsResponse = await fetch(binsUrl)
        if (binsResponse.ok) {
            const binsData = await binsResponse.json()
            setBins(binsData.bins)
        }
    }
    useEffect(() => {
        fetchBinsData()
    }, [])

    const handleCardClick = (locationId) => {
        navigate(`/storage-locations/${locationId}/`);
    };

    return (
        <>
            <div className='container text-center'>
                <div className='row g-2 align-items-center'>
                    {bins.map((location) => (
                        <div className="col" key={location.id} style={{ minWidth: '200px' }} id='card' onClick={() => handleCardClick(location.id)}>
                            <div className="d-flex justify-content-center"> {/* Flex container for horizontal centering */}
                                <div className="card h-100" style={{ width: '100%' }}> {/* Set the width of the card to fill the flex container */}
                                    <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}${location.image}` || default_closet} alt="Storage location" />
                                    <div className="card-body">
                                        <p className="card-text">{location.closet_name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Locations
