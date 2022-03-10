import React from 'react';
import styled from 'styled-components';
import {Loader} from '../Loader';

interface IButton {
  text: string;
  disabled: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset' | undefined;
  loading?: boolean;
}

const StyledButton = styled.button`
  width: 110px;
  height: 40px;
  background: linear-gradient(180deg, #45a6ff 0%, #0055fb 100%), #c4c4c4;
  border-radius: 5px;
  border: none;
  font-size: 16px;
  line-height: 30px;
  position: relative;
  color: #ffffff;
  &:focus {
    border: 2px solid #45a5ff;
    border-radius: 7px;
    outline: none;
  }
  &:hover {
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)),
      linear-gradient(180deg, #45a6ff 0%, #0055fb 100%), #c4c4c4;
  }
  &:active {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), linear-gradient(180deg, #45a6ff 0%, #0055fb 100%), #c4c4c4;
  }
  &:disabled,
  button[disabled] {
    background: linear-gradient(0deg, #c4c4c4, #c4c4c4), linear-gradient(180deg, #45a6ff 0%, #0055fb 100%);
  }
`;

export const Button = ({text, disabled = false, onClick, type = 'button', loading}: IButton) => {
  return (
    <StyledButton
      onClick={(e) => {
        if (!loading) onClick(e);
      }}
      disabled={disabled}
      type={type}
    >
      {loading ? <Loader /> : text}
    </StyledButton>
  );
};
