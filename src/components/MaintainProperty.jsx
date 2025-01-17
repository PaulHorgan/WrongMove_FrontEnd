import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CustomAlert from "./CustomAlert";

export default function MaintainProperty() {

    const params = useParams();
    const [street, setStreet] = useState()
    const [town, setTown] = useState("")
    const [price, setPrice] = useState('')
    const [bedrooms, setBedrooms] = useState('')
    const [bathrooms, setBathrooms] = useState('')
    const [garden, setGarden] = useState('')
    const [state, setState] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleCloseAlert = () => {
        if (alertMessage === "Failed to update property details. Please try again.") {
            setShowAlert(false);
        } else {
            setShowAlert(false);
            navigate("/propertyadmin");
        }
    };

    useEffect(() => {
        axios.get("http://34.142.58.221:8080/property/" + params.id).then(res => {
            console.log(res)
            setStreet(res.data.street);
            setTown(res.data.town);
            setPrice(res.data.price);
            setBedrooms(res.data.bedrooms);
            setBathrooms(res.data.bathrooms);
            setGarden(res.data.garden);
            setState(res.data.state);
            setImageUrl(res.data.imageUrl);
        }).catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            street,
            town,
            price,
            bedrooms,
            bathrooms,
            garden,
            state,
            imageUrl
        };
        axios.patch(`http://34.142.58.221:8080/property/update/${params.id}`, data)
            .then(() => {
                setAlertMessage("Property details updated successfully.");
                setShowAlert(true);
            })
            .catch(err => {
                console.error("Error updating property:", err);
                setAlertMessage("Failed to update property details. Please try again.");
                setShowAlert(true);
            });
    }


    return (
        <div className="body">
            <h1 className="pagetitle"> Property Updates - Change all required </h1>
            <br />
            {showAlert && <CustomAlert message={alertMessage} onClose={handleCloseAlert} />}
            <form onSubmit={handleSubmit}>
                <label className="label1">Street Name: </label>
                <input type="text"
                    className="input1"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)} />
                <br />
                <br />
                <label className="label1">Town: </label>
                <input type="text"
                    className="input1"
                    required
                    value={town}
                    onChange={(e) => setTown(e.target.value)} />
                <br />
                <br />
                <label className="label1">Price: </label>
                <input type="number"
                    className="input1"
                    required
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <br />
                <br />
                <label className="label1">Bedrooms: </label>
                <input type="number"
                    className="input1"
                    required
                    min="0"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)} />
                <br />
                <br />
                <label className="label1">Bathrooms: </label>
                <input type="number"
                    className="input1"
                    required
                    min="0"
                    value={bathrooms}
                    defaultValue={bedrooms}
                    onChange={(e) => setBathrooms(e.target.value)} />
                <br />
                <br />
                <label className="label1">Garden: </label>
                <select
                    value={garden}
                    onChange={(e) => setGarden(e.target.value)} >
                    <option selected value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                <br />
                <br />
                <label className="label1">Image URL: </label>
                <input type="text"
                    className="input1"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} />
                <br />
                <br />
                <label className="label1">Current Status: </label>
                <select type="text"
                    className="input1"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)} >
                    <option>For Sale</option>
                    <option>Withdrawn</option>
                    <option>Sold</option>
                </select>
                <br />
                <br />
                <button className="button1" type="submit">Update Property Details</button>
            </form>
        </div>
    )
}


