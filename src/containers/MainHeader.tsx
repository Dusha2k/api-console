import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {logout} from '../store/actions';
import styled from 'styled-components';
import {switchScreenMode as switchScreenAction} from '../store/actions/userSettings';

const MainHeader = ({consoleRef}: {consoleRef: React.RefObject<HTMLDivElement>}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userLogin = useSelector((state: {auth: {login: string; subLogin: string | null}}) => state.auth.login);
  const userSubLogin = useSelector((state: {auth: {login: string; subLogin: string | null}}) => state.auth.subLogin);
  const fullScreenMode = useSelector((state: {userSettings: {fullScreen: boolean}}) => state.userSettings.fullScreen);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  useEffect(() => {
    if (consoleRef?.current) {
      const classNames = consoleRef.current.className;
      consoleRef.current.className = `${
        !fullScreenMode ? `${classNames.replace('fullscreen-mode', '')}` : `${classNames} fullscreen-mode`
      }`;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullScreenMode]);

  const switchScreenMode = () => {
    dispatch(switchScreenAction());
  };

  return (
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
          {fullScreenMode ? (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 6H4C4.53043 6 5.03914 5.78929 5.41421 5.41421C5.78929 5.03914 6 4.53043 6 4V1M14 1V4C14 4.53043 14.2107 5.03914 14.5858 5.41421C14.9609 5.78929 15.4696 6 16 6H19M19 14H16C15.4696 14 14.9609 14.2107 14.5858 14.5858C14.2107 14.9609 14 15.4696 14 16V19M6 19V16C6 15.4696 5.78929 14.9609 5.41421 14.5858C5.03914 14.2107 4.53043 14 4 14H1"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </FullScreenBtn>
      </div>
    </Header>
  );
};

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

export default MainHeader;
