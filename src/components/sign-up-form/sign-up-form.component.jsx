import { React, useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import { useDispatch } from 'react-redux';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { signUpStart } from '../../store/user/user.action';

import { SignUpContainer } from './sign-up-form.styles';

const defaultFormValues = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}


const SignUpForm = () => {
    const dispatch = useDispatch();

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
         dispatch(signUpStart(email, password, displayName));
            setFormValues(defaultFormValues);
         
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
        <SignUpContainer>
            <h2>Don't have any account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput label="Display Name" type="text" name="displayName" required onChange={handleChange} value={displayName} />


                <FormInput label="Email" type="email" name="email" onChange={handleChange} required value={email} />


                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />


                <FormInput label="Confirm Passowrd" type="password" name="confirmPassword" required onChange={handleChange} value={confirmPassword} />
                <Button type="submit" >Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}

export default SignUpForm;
