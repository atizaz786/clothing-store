import styled from 'styled-components';
import { BaseButton, GoogleSignInButton, InvertedButton } from '../button/button.styles';

export const CartDropdownContainer = styled.div`
 position: absolute;
    width: 280px;
    height: 340px;
    display: flex;
    flex-direction: column;
    padding: 20px;
    border: 1px solid black;
    background-color: white;
    top: 90px;
    right: 40px;
    z-index: 5;

    ${BaseButton}, ${GoogleSignInButton}, ${InvertedButton} {
    margin-top: auto;
    width: 100%; // Ensure button width does not exceed container width
      box-sizing: border-box; // This ensures padding is included in width calculation
    }
    `

export const EmptyMessage = styled.span`
    font-size: 18px;
      margin: 50px auto;
    `

export const CartItems = styled.div`
    height: 240px;
      display: flex;
      flex-direction: column;
      overflow-y: auto; // Change to auto for vertical scrollbar
      overflow-x: hidden; // Hide horizontal scrollbar
    `

