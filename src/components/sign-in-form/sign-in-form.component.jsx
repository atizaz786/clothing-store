import { React, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, {BUTTON_TYPES} from '../button/button.component';
import {  googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import { useDispatch } from 'react-redux';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';


const defaultFormValues = {

    email: '',
    password: '',

}


const SignInForm = () => {
    const dispatch = useDispatch();

    const [formValues, setFormValues] = useState(defaultFormValues);
    const { email, password } = formValues;


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });


    }

    const signInWithGooglePopUp = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password ));
            setFormValues(defaultFormValues);

        }
        catch (error) {
            console.log(error)
            if(error.code === 'auth/invalid-login-credentials'){
                alert('Invalid login credentials');
            }

        }
    }

    return (
        <SignInContainer>
            <h2>Already have any account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>



                <FormInput label="Email" type="email" name="email" onChange={handleChange} required value={email} />


                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />

                <ButtonsContainer>
                    <Button type="submit" >Sign In</Button>
                    <Button type="button" onClick={signInWithGooglePopUp} buttonType={BUTTON_TYPES?.google} >Google sign in </Button>

                </ButtonsContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;
