import { React, Fragment, useContext } from 'react';
import { Outlet, Link } from "react-router-dom";

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../contexts/user.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext);
    const signOutHandler = async () => {
        await signOutUser();
        setCurrentUser(null);

    }

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to="/">
                    <CrwnLogo className='logo' />

                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>SHOP</Link>
                    {currentUser ? <Link className='nav-link' to='/auth' onClick={signOutHandler}>SIGN OUT</Link> :

                        <Link className='nav-link' to='/auth'>SIGN IN</Link>


                    }
                    <CartIcon />
                </div>
                <CartDropdown />

            </div>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;