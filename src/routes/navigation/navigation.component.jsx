import { React, Fragment} from 'react';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import {NavigationContainer, LogoContainer, NavLink, NavLinksContainer} from  './navigation.styles';

import { selectCurrentUser } from '../../store/user/user.selector';
import {selectIsCartOpen} from '../../store/cart/cart.selector';

import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);
   
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