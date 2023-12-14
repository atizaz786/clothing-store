import { React, useState, useContext } from 'react';
import { signInWithGoogle, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import './sign-in-form.styles.scss';
import { UserContext } from '../../contexts/user.context';

const defaultFormValues = {

    email: '',
    password: '',

}


const SignInForm = () => {

    const [formValues, setFormValues] = useState(defaultFormValues);
    const { email, password } = formValues;

    const { setCurrentUser } = useContext(UserContext);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });


    }

    const signInWithGooglePopUp = async () => {
        const { user } = await signInWithGoogle();
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            console.log(user)
            setCurrentUser(user);
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
        <div className='sign-up-container'>
            <h2>Already have any account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>



                <FormInput label="Email" type="email" name="email" onChange={handleChange} required value={email} />


                <FormInput label="Password" type="password" name="password" required onChange={handleChange} value={password} />

                <div className='buttons-container'>
                    <Button type="submit" >Sign In</Button>
                    <Button type="button" onClick={signInWithGooglePopUp} buttonType="google" >Google sign in </Button>

                </div>
            </form>
        </div>
    )
}

export default SignInForm;
