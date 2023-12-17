import { React, Fragment, useContext } from 'react';
import { Outlet, Link } from "react-router-dom";

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {NavigationContainer, LogoContainer, NavLink, NavLinksContainer} from  './navigation.styles';
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {

    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);
   
    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer  to="/">
                    <CrwnLogo className='logo' />

                </LogoContainer>
                <NavLinksContainer>
                    <NavLink  to='/shop'>SHOP</NavLink>
                    {currentUser ? <NavLink as='span' to='/auth' onClick={signOutUser}>SIGN OUT</NavLink> 
                    
                    :

                        <NavLink  to='/auth'>SIGN IN</NavLink>


                    }
                    <CartIcon />
                </NavLinksContainer>
                {isCartOpen && <CartDropdown /> }

            </NavigationContainer>
            <Outlet />
        </Fragment>
    )
}

export default Navigation;