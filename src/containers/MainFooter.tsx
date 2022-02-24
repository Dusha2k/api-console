import React from 'react';
import {Button} from '../components/Button';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {sendJson} from '../store/actions';

export const MainFooter = ({leftCodePanelRef}: {leftCodePanelRef: React.RefObject<HTMLTextAreaElement>}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state: {apiHistory: {loading: boolean}}) => state.apiHistory.loading);

  const handleSendJson = () => {
    if (leftCodePanelRef.current) {
      try {
        JSON.parse(leftCodePanelRef.current.value);
        dispatch(sendJson(JSON.parse(JSON.stringify(leftCodePanelRef.current.value, null, 2))));
      } catch (e) {
        console.log(e);
        leftCodePanelRef.current.className = `${leftCodePanelRef.current.className} invalid-json`;
      }
    }
  };

  return (
    <Footer>
      <Button text={'Отправить'} disabled={false} loading={loading} type={'button'} onClick={handleSendJson} />
      <a href="https://github.com/Dusha2k" target="_blank" rel="noreferrer noopener">
        github.com/Dusha2k
      </a>
      <button
        className="footer__format"
        onClick={(e) => {
          e.preventDefault();
          leftCodePanelRef!.current!.value = JSON.stringify(JSON.parse(leftCodePanelRef?.current!.value), null, 2);
          e.currentTarget.blur();
        }}
      >
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity=".8" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10H7M11 6H3M12 14H7M7 18H3" />
          </g>
        </svg>
        Форматировать
      </button>
    </Footer>
  );
};

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  > a {
    font-size: 16px;
    line-height: 20px;
    color: #999999;
    text-decoration: none;
    &:focus {
      outline: none;
    }
  }
  > div,
  .footer__format {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
  }
  .footer__format {
    background: none;
    border: none;
    &:hover,
    &:focus {
      color: #0055fb;
      svg {
        filter: invert(23%) sepia(88%) saturate(5067%) hue-rotate(217deg) brightness(98%) contrast(107%);
      }
    }
    &:focus {
      outline: none;
      border: 1px solid #45a5ff;
      border-radius: 7px;
    }
  }
`;
