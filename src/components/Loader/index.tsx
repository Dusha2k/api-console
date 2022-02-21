import React from 'react';
import styled, {keyframes} from 'styled-components';

export const Loader = () => {
  return (
    <Wrapper>
      <div className="lds-spinner">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </Wrapper>
  );
};

const rotate = keyframes`
  0% {
  opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
  .lds-spinner {
    color: #ffffff;
    display: inline-block;
    position: relative;
    width: 80px;
    height: 70px;
    div {
      transform-origin: 40px 40px;
      animation: ${rotate} 1.2s linear infinite;
      &:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 23px;
        left: 37px;
        width: 4px;
        height: 10px;
        border-radius: 20%;
        background: #ffffff;
      }
      &:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.05s;
      }
      &:nth-child(2) {
        transform: rotate(45deg);
        animation-delay: -0.9s;
      }
      &:nth-child(3) {
        transform: rotate(90deg);
        animation-delay: -0.75s;
      }
      &:nth-child(4) {
        transform: rotate(135deg);
        animation-delay: -0.6s;
      }
      &:nth-child(5) {
        transform: rotate(180deg);
        animation-delay: -0.45s;
      }
      &:nth-child(6) {
        transform: rotate(225deg);
        animation-delay: -0.3s;
      }
      &:nth-child(7) {
        transform: rotate(270deg);
        animation-delay: -0.15s;
      }
      &:nth-child(8) {
        transform: rotate(315deg);
        animation-delay: 0s;
      }
    }
  }
`;
