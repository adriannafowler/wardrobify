import React, {useEffect, useState} from 'react';

function ShoeForm( ) {
    const [bins, setBins] = useState([])

    const [formData, setFormData] = useState({
        manufacturer: "",
        model_name: "",
        color: "",
        image: "",
        bin: "",
    })

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/bins';
        const response = await fetch(url);
        if (response.ok) {
        const data = await response.json();
        setBins(data.bins)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()


        const response = await fetch('http://localhost:8080/shoes/', {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            setFormData({
                manufacturer: "",
                model_name: "",
                color: "",
                image: "",
                bin: "",
            })
        } else {
            console.log("Could NOT add shoe")
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
                <h1>Add a new shoe</h1>
                <form onSubmit={handleSubmit} id="create-shoe-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.manufacturer} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                        <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.model_name} placeholder="Model Name" required type="text" name="model_name" id="model_name" className="form-control"/>
                        <label htmlFor="model_name">Model Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                        <label htmlFor="color">Color</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleFormInput} value={formData.image} placeholder="Image" required type="url" name="image" id="image" className="form-control"/>
                        <label htmlFor="image">Image URL</label>
                    </div>
                    <div className="mb-3">
                        <select onChange={handleFormInput} value={formData.bin} required name="bin" id="bin" className="form-select">
                            <option value="">Choose a bin</option>
                            {bins.map(bin => {
                                return (
                                    <option key={bin.id} value={bin.id}>
                                    {bin.closet_name}
                                    </option>
                                );
                                })}
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
                </div>
            </div>
        </div>
        );
}

export default ShoeForm;
