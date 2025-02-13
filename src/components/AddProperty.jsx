import { useState } from "react";
import axios from 'axios';
import CustomAlert from "./CustomAlert";
import { Link } from "react-router-dom";



export default function AddProperty({onAddProperty}) {

    const [street, setStreet] = useState('')
    const [town, setTown] = useState('')
    const [price, setPrice] = useState(0)
    const [bedrooms, setBedrooms] = useState(0)
    const [bathrooms, setBathrooms] = useState(0)
    const [garden, setGarden] = useState('Yes')
    const [state, setState] = useState('For Sale')
    const [imageUrl, setImageUrl] = useState('')
    const [sellerId, setSellerId] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [seller, setSeller] = useState('');


    const handleSubmit = async (e) => {
        window.scrollTo(0, 0);
        e.preventDefault();

        // Fetch sellers data
        try {
            const response = await axios.get(`http://34.142.58.221:8080/seller/get/all`);
            const sellersData = response.data

             // Convert sellerId to a number if it's a string
                    const numericSellerId = Number(sellerId);

            // Check if seller ID exists
            const sellerExists = sellersData.some((data) => data.id === numericSellerId);
            if (!sellerExists) {
                setAlertMessage(`Seller ID ${sellerId} does not exist. Please enter a valid seller ID`);
                setShowAlert(true);
                return;
            }

            const task = { seller: {id:sellerId}, street, town, price, bedrooms, bathrooms, garden, state, imageUrl }

            const postResponse = await axios.post('http://34.142.58.221:8080/property/add', task);
                        const data = postResponse.data;

            setAlertMessage(`Property Added Succesfully`);
            setShowAlert(true);

            setSellerId('')
            setStreet('')
            setTown('')
            setPrice(0)
            setBedrooms(0)
            setBathrooms(0)
            setGarden('Yes')
            setState('For Sale')
            setImageUrl('')

            onAddProperty(); // Trigger fetching new data

        } catch (error) {
            console.error("Error fetching sellers data:", error);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <label className="label1">Seller ID: </label>
            <input type="text"
                className="input1"
                required
                value={sellerId}
                onChange={(e) => setSellerId(e.target.value)} />
                 <div style={{ fontSize: '14px', color: '#800880', marginBottom: '10px', marginTop: '5px' }}>
          Not currently registered? <Link to="/sellers" style={{ color: '#800880' }}>Click here to register</Link>
        </div>
          
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
                onChange={(e) => setPrice(parseInt(e.target.value))} />
            <br />
            <br />
            <label className="label1">Bedrooms: </label>
            <input type="number"
                className="input1"
                required
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(parseInt(e.target.value))} />
            <br />
            <br />
            <label className="label1">Bathrooms: </label>
            <input type="number"
                className="input1"
                required
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(parseInt(e.target.value))} />
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
            <button className="button1" type="submit">Add Property</button>

            {showAlert && (
                    <CustomAlert

                        message={alertMessage}
                        onClose={() => setShowAlert(false)} // Close button action
                    />
                )}
        </form>
    )




}