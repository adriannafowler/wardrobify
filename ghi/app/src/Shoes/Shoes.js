import React, {useEffect, useState} from 'react'
import DeleteModal from './delete_modal.js';
import { useParams} from 'react-router-dom'
import EditShoeModal from './edit_modal.js'
import './Shoes.css'



const ShoesList = () => {
    const [bins, setBins] = useState([])
    const [shoes, setShoes] = useState([])
    const [filteredShoes, setFilteredShoes] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedShoeId, setSelectedShoeId] = useState(null)
    const [currentBin, setCurrentBin] = useState(null)

    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedShoeData, setSelectedShoeData] = useState(null);

    const param = useParams()
    const locationId = param.id

    useEffect(() => {
        const filtered = shoes.filter(item => item.bin === `/api/bins/${locationId}/`);
        setFilteredShoes(filtered);
    }, [shoes, locationId]);


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

    useEffect(() => {
        const foundBin = bins.find(bin => bin.id.toString() === locationId);
        setCurrentBin(foundBin);
    }, [bins, locationId]);


    const fetchShoesData = async () => {
        const url = "http://localhost:8080/shoes/"

        try {
            const response = await fetch(url)
            if (response.ok) {
                const shoesData = await response.json()
                setShoes(shoesData.shoes)
            }

        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchShoesData()
    }, [bins])

    const handleDeleteClick = (id) => {
        setSelectedShoeId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedShoeId(null);
    };

    const handleDelete = async () => {
        // Perform the delete operation
        if (selectedShoeId) {
            const request = await fetch(`http://localhost:8080/shoes/${selectedShoeId}`, {
                method: "DELETE"
            });

            const resp = await request.json();
            if (resp.deleted) {
                fetchShoesData();
            } else {
                alert("Could not delete item");
            }
        }
        handleCloseModal();
    };

    const handleEdit = (shoe) => {
        setSelectedShoeData(shoe);
        setEditModalShow(true);
    };

    const updateShoe = (updatedData) => {
        // Logic to send the updated data to the server
        console.log('Updating shoe with', updatedData);
        // Close the modal after updating
        setEditModalShow(false);
    };

    return (
        <>
            <div className="px-4 py-5 my-5 mt-0 text-center">
                <h1 className="display-5 fw-bold" id='wardrobe-title'>{currentBin ? currentBin.closet_name : 'Items'} </h1>
            </div>
            <div className='container text-center'>
                <div className='row g-2 align-items-center'>
                    {filteredShoes
                        .map((item) => (
                            <div key={item.id} className='col'  >
                                <div className='d-flex justify-content-center'>
                                    <div className="card h-100" id='card-container'>
                                        <img src={`${process.env.REACT_APP_SHOES_URL}${item.image}`} className='card-img-top'/>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.model_name}</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">
                                                {item.manufacturer}
                                            </h6>
                                            <p className="card-text">
                                                {`${process.env.REACT_APP_SHOES_URL}${item.image}    ${item.color}`}
                                            </p>
                                        </div>
                                        <div className='card-footer' id='card-footer'>
                                            <button onClick={() => handleEdit(item)} className='btn btn-success m-3'>Edit</button>
                                            <EditShoeModal
                                                show={editModalShow}
                                                handleClose={() => setEditModalShow(false)}
                                                shoeData={selectedShoeData}
                                                updateShoe={updateShoe}
                                            />
                                            <button onClick={() => handleDeleteClick(item.id)} id={item.id} className='btn btn-danger m-3'>Delete</button>
                                            <DeleteModal
                                                show={showModal}
                                                onClose={handleCloseModal}
                                                onDelete={handleDelete}
                                            />
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

export default ShoesList


{/* <>
    <div className='container text-center'>
        <div className='row g-2 align-items-center'>
            {shoes.map((item) => (
                <div className="col" key={item.id} style={{ minWidth: '200px' }} id='card'>
                    <div className="d-flex justify-content-center">
                        <div className="card h-100" style={{ width: '100%' }}>
                            <img className="card-img-top" src={`${process.env.REACT_APP_API_URL}${location.image}` || default_closet} alt="Storage location" />
                            <div className="card-body">
                                <p className="card-text">{item.name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
</> */}
