import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './Shoes.css'

const EditShoeModal = ({ show, handleClose, shoeData, updateShoe }) => {
    const [bins, setBins] = useState([]);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        manufacturer: "",
        model_name: "",
        color: "",
        bin: "",
        image: "",
    });


    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setBins(data.bins);
        } else {
            console.error("Error updating shoe:", await response.text());
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (shoeData) {
            setFormData({
                manufacturer: shoeData.manufacturer,
                model_name: shoeData.model_name,
                color: shoeData.color,
                bin: shoeData.bin,
                image: shoeData.image,
            });
            if (shoeData.image) {
                setPreviewUrl(shoeData.image);
            }
        }
    }, [shoeData]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleFormInput = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            manufacturer: formData.manufacturer,
            model_name: formData.model_name,
            color: formData.color,
            bin: formData.bin,
        }

        const response = await fetch(`http://localhost:8080/shoes/${shoeData.id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const updatedShoe = await response.json();
            updateShoe(updatedShoe);
            handleClose();
        } else {
            console.error("Update failed");
        }
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title id="form-title">Edit Item</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form
                    onSubmit={handleSubmit}
                    id="update-shoe-form"
                >
                    <Form.Group className="mb-3">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Brand"
                            name="manufacturer"
                            value={formData.manufacturer}
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Item Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Model Name"
                            name="model_name"
                            value={formData.model_name}
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Color"
                            name="color"
                            value={formData.color}
                            onChange={handleFormInput}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Storage Location</Form.Label>
                        <Form.Select
                            name="bin"
                            value={formData.bin}
                            onChange={handleFormInput}
                            className="form-select"
                        >
                            <option value="">Choose storage location</option>
                            {bins.map(bin => {
                                return (
                                    <option key={bin.id} value={bin.id}>
                                    {`${bin.id} ${bin.closet_name}`}
                                    </option>
                                );
                                })}
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" id='save-btn'>
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditShoeModal;
