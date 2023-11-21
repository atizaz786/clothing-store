import React from 'react';
import { signInWithGoogle, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGoogle();
        console.log(user)
        const userDocRef = await createUserDocumentFromAuth(user);
        console.log(userDocRef)
    }
    return (
        <div>
            <h1>Sign In</h1>
            <button onClick={logGoogleUser}>Sign In With Google</button>
        </div>
    )
}
export default SignIn;