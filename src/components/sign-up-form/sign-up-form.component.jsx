import { React, useState } from 'react';
import { createUserWithEmailAndPasswordFirebase, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {

    const [formValues, setFormValues] = useState(defaultFormValues);
    const { displayName, email, password, confirmPassword } = formValues;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });


    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        try {
            //Create user in firebase
            const user = await createUserWithEmailAndPasswordFirebase(email, password);
            //Create user in firestore database and pass the user object and displayName
            const response = await createUserDocumentFromAuth(user, { displayName });
            //Reset form values
            setFormValues(defaultFormValues);
            console.log(response)
        }
        catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Email already in use');
            }
            else {
                console.log('Error creating user', error.message)
            }
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Don't have any account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />


                <FormInput label="Email" type="email" name="email" onChange={handleChange} required value={email} />


                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />


                <FormInput label="Confirm Passowrd" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} />
                <Button type="submit" >Sign Up</Button>
            </form>
        </div>
    )
}

export default SignUpForm;
