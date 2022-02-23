import React, {useEffect, useRef} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {ApiHistory} from '../components/ApiHistory';
import {CodePanel} from '../components/CodePanel';
import {sendJson} from '../store/actions';
import {Button} from '../components/Button';
import {logout} from '../store/actions/auth';

const MainPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoggedIn = useSelector((state: {auth: {sessionKey: string | null}}) => !!state.auth.sessionKey?.length);
  const userLogin = useSelector((state: {auth: {login: string; subLogin: string | null}}) => state.auth.login);
  const userSubLogin = useSelector((state: {auth: {login: string; subLogin: string | null}}) => state.auth.subLogin);
  //Вот тут лишний рендер из за loading
  const loading = useSelector((state: {apiHistory: {loading: boolean}}) => state.apiHistory.loading);

  const firstRef: any = useRef(null);
  const consoleRef: any = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  const handleSendJson = (e: any) => {
    if (firstRef.current) {
      try {
        JSON.parse(firstRef.current.value);
        dispatch(sendJson(JSON.parse(JSON.stringify(firstRef.current.value, null, 2))));
      } catch (e) {
        console.log(e);
        firstRef.current.className = `${firstRef.current.className} invalid-json`;
      }
    }
  };

  const switchScreenMode = () => {
    if (consoleRef?.current) {
      const classNames = consoleRef.current.className;
      consoleRef.current.className = `${
        classNames.includes('fullscreen-mode') ? `${classNames.replace('fullscreen-mode', '')}` : `${classNames} fullscreen-mode`
      }`;
    }
  };

  return (
    <Wrapper>
      <Console ref={consoleRef}>
        <Header>
          <div className="left-side">
            <svg width="115" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#C4C4C4" />
              <circle cx="70" cy="15" r="15" fill="#C4C4C4" />
              <path fill="#C4C4C4" d="M35 0h15v30H35zM100 0h15l-15 30H85l15-30Z" />
            </svg>
            <span>API-консолька</span>
          </div>
          <div className="right-side">
            <div className="right-side__info">
              {userLogin}
              <span>:</span>
              {userSubLogin ? userSubLogin : 'Сублогин'}
            </div>
            <div
              className="right-side__logout"
              onClick={() => {
                handleLogout();
              }}
            >
              <span>Выйти</span>
              <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity=".8" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                </g>
              </svg>
            </div>
            <FullScreenBtn
              onClick={(e) => {
                e.preventDefault();
                switchScreenMode();
                e.currentTarget.blur();
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
                  stroke="#0D0D0D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </FullScreenBtn>
          </div>
        </Header>
        <ApiHistory />
        <CodePanel myRef={firstRef} />
        <Footer>
          <Button text={'Отправить'} disabled={false} loading={loading} type={'button'} onClick={handleSendJson} />
          <a href="https://github.com/Dusha2k" target="_blank" rel="noreferrer noopener">
            github.com/Dusha2k
          </a>
          <button
            className="footer__format"
            onClick={(e) => {
              e.preventDefault();
              firstRef.current.value = JSON.stringify(JSON.parse(firstRef.current.value), null, 2);
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
      </Console>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .fullscreen-mode {
    width: 100vw;
    height: 100%;
    > div:nth-child(3n) {
      height: calc(100% - 178px);
    }
  }
`;

const Console = styled.div`
  width: 50vw;
  background: #f6f6f6;
`;

const Header = styled.div`
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .left-side {
    display: flex;
    gap: 20px;
    align-item: center;
    text-align: center;
    span {
      font-size: 20px;
      line-height: 30px;
      color: #0d0d0d;
    }
  }
  .right-side {
    display: flex;
    align-items: center;
    gap: 30px;
    &__info {
      display: flex;
      align-items: center;
      padding: 5px 15px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      span {
        color: rgba(0, 0, 0, 0.2);
        margin: 0 5px 0 5px;
      }
    }
    &__logout {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }
  }
`;

const FullScreenBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  &:focus {
    border: 1px solid #45a5ff;
    border-radius: 7px;
    outline: none;
    svg {
      filter: invert(23%) sepia(88%) saturate(5067%) hue-rotate(217deg) brightness(98%) contrast(107%);
    }
  }
  svg {
    padding-top: 3px;
    &:hover {
      filter: invert(23%) sepia(88%) saturate(5067%) hue-rotate(217deg) brightness(98%) contrast(107%);
    }
  }
`;

const Panel = styled.div`
  position: relative;
  height: 400px;
`;

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

export {MainPage};
