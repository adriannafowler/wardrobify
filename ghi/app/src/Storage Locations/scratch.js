import React, { useEffect, useState } from 'react';

function Scratch() {
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
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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
        data.append('manufacturer', formData.manufacturer);
        data.append('model_name', formData.model_name);
        data.append('color', formData.color);
        data.append('bin', formData.bin);

        if (file) {
            data.append('image', file);
        }

        const response = await fetch('http://localhost:8080/shoes/', {
            method: "POST",
            body: data,
        });

        if (response.ok) {
            console.log(response)
            setFormData({
                manufacturer: "",
                model_name: "",
                color: "",
                bin: "",
                image: "",
            });
            setPreviewUrl("");
            setFile(null);
        } else {
            console.error("Could NOT add shoe");
        }
    }

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
                <h1>Add a new item</h1>
                <form onSubmit={handleSubmit} id="create-shoe-form" encType="multipart/form-data">
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                        <label htmlFor="manufacturer">Brand</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.model_name} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                        <label htmlFor="model_name">Item Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormInput} value={formData.bin} required name="bin" id="bin" className="form-select">
                            <option value="">Choose storage location</option>
                            {bins.map(bin => {
                                return (
                                    <option key={bin.id} value={bin.id}>
                                    {`${bin.id} ${bin.closet_name}`}
                                    </option>
                                );
                                })}
                        </select>
                    </div>
                    <div className="form mb-3">
                        <label htmlFor="image">Select Image File</label>
                        <input
                                type="file"
                                onChange={handleImageChange}
                                className="form-control"
                                id="image"
                            />
                        {previewUrl && <img src={previewUrl} alt="Preview" id="image" />}
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
        );
}

export default Scratch;
