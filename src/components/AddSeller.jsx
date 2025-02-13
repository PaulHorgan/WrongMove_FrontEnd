import { useState } from "react";
import axios from 'axios';
import '../css/RegisterUser.css';
import CustomAlert from "./CustomAlert";

const AddSeller = ({onAddSeller}) => {
    window.scrollTo(0, 0);
    const [firstname, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Function to convert names to title case
    const toTitleCase = (name) => {
        return name.split(' ').map((word) => {
            if (/^mc/i.test(word)) {
                return word.charAt(0).toUpperCase() + 'c' + word.charAt(2).toUpperCase() + word.slice(3).toLowerCase();
            } else if (/^mac/i.test(word)) {
                return word.charAt(0).toUpperCase() + 'ac' + word.charAt(3).toUpperCase() + word.slice(4).toLowerCase();
            } else {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }
        }).join(' ');
    };

    const firstToTitleCase = (name) => {
        return name.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }).join(' ');
    };

    // Function to handle the form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Convert input names to title case
        const titleCaseFirstName = firstToTitleCase(firstname);
        const titleCaseSurname = toTitleCase(surname);

        // Create the user object
        const user = {
            firstname: titleCaseFirstName,
            surname: titleCaseSurname
        };

        try {
            // Check if the combination already exists
            const checkResponse = await axios.get(`http://34.142.58.221:8080/seller/get/all`);
            const existingData = checkResponse.data;

            const dataExists = existingData.some(data =>
                data.firstname === titleCaseFirstName &&
                data.surname === titleCaseSurname
            );

            if (dataExists) {
                setAlertMessage('Seller Already Exists. Please enter a different name.');
                setShowAlert(true);
                return;
            }

            // Send a POST request to add the new seller
            const postResponse = await axios.post('http://34.142.58.221:8080/seller/add', user);
            const data = postResponse.data;

            setAlertMessage(`New Seller Added. Your Unique ID is ${data.id}`);
            setShowAlert(true);

            setFirstName('');
            setSurname('');

            onAddSeller(); // Trigger fetching new data

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <br></br>
                <br></br>

                <label className="label1">First Name: </label>
                <input
                    className="input1"
                    type="text"
                    required
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <br></br>
                <br></br>

                <label className="label1">Surname: </label>
                <input
                    className="input1"
                    type="text"
                    required
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <br></br>
                <br></br>

                <button className="button1"> Add Seller</button>

                {showAlert && (
                    <CustomAlert
                        message={alertMessage}
                        onClose={() => {
                            setShowAlert(false);
//                             window.location.reload();
                        }}
                    />
                )}

            </form>
        </div>
    );
};

export default AddSeller;
