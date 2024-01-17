import React, { useState } from "react";
import './locations.css'



function StorageLocationForm( ) {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");
    const [formData, setFormData] = useState({
        closet_name: "",
        bin_number: 0,
        bin_size: 0,
        image: "",
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setFormData({
                ...formData,
                image: `/media/images/${file.name}`
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData();
        data.append('closet_name', formData.closet_name);
        data.append('bin_number', formData.bin_number);
        data.append('bin_size', formData.bin_size);

        if (file) {
            data.append('image', file);
        }

        const response = await fetch('http://localhost:8100/api/bins/', {
            method: "POST",
            body: data,
        });

        if (response.ok) {
            console.log("Storage location added successfully");
            setFormData({
                closet_name: "",
                bin_number: 0,
                bin_size: 0,
                image: "",
            });
            setPreviewUrl("");
            setFile(null);
        } else {
            console.error("Could NOT add storage location");
        }
    };

    function handleFormInput(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                <h1>Add a new storage location</h1>
                <form
                    onSubmit={handleSubmit}
                    id="create-location-form"
                    method="POST"
                    encType="multipart/form-data"
                    >
                    <div className="form-floating mb-3">
                        <input
                            onChange={handleFormInput}
                            value={formData.closet_name}
                            placeholder="Location name"
                            required type="text"
                            name="closet_name"
                            id="closet_name"
                            className="form-control"/>
                        <label htmlFor="closet_name">Location name</label>
                    </div>
                    <div className='form mb-3' id='image-selection-container'>
                        <label for="formFile" class="form-label">Select Image File</label>
                        <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="form-control"
                                    id="image"
                                />
                                {previewUrl && <img src={previewUrl} alt="Preview" />}
                    </div>
                    <button className="btn btn-primary">Add</button>
                </form>
                </div>
            </div>
        </div>
        );
}

export default StorageLocationForm;
