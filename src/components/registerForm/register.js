import { useState } from 'react';
import './register.css';

const UserRegisterForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        const userDetails = { name, address };
        const url = 'http://localhost:4000/users/register';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDetails),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            } else {
                const data = await response.json();
                // console.log('User registered successfully', data);
                const { message } = data;
                setStatus(message);

                // Clear the form inputs
                setName('');
                setAddress('');

                // Clear the status message after 3 seconds
                setTimeout(() => {
                    setStatus('');
                }, 3000);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setStatus(error.message);
        }
    };

    return (
        <div className='main-container'>
            <h2>User Registration Form</h2>
            <form onSubmit={handleSubmitForm}>
                <div>
                    <label>Name</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Address</label>
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </div>
                <button type='submit'>Register</button>
                {status && <p>{status}</p>}
            </form>
        </div>
    );
};

export default UserRegisterForm;
