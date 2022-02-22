import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {ApiHistory} from '../components/ApiHistory';

const myArr = [
  {status: 'failure', name: 'track'},
  {status: 'success', name: 'mom'},
  {status: 'failure', name: 'like'},
  {status: 'failure', name: 'sandwioch'},
  {status: 'failure', name: 'ololo'},
  {status: 'success', name: 'track'},
  {status: 'failure', name: 'track'},
  {status: 'failure', name: 'sandwioch'},
  {status: 'success', name: 'track'},
  {status: 'failure', name: 'track'},
  {status: 'failure', name: 'ololo'},
  {status: 'failure', name: 'like'},
  {status: 'failure', name: 'sandwioch'},
  {status: 'success', name: 'track'},
  {status: 'failure', name: 'like'},
  {status: 'success', name: 'ololo'},
  {status: 'failure', name: 'track'},
  {status: 'failure', name: 'like'},
  {status: 'success', name: 'sandwioch'},
  {status: 'failure', name: 'track'},
];

const MainPage = () => {
  const history = useHistory();
  const isLoggedIn = useSelector((state: {auth: {sessionKey: string | null}}) => !!state.auth.sessionKey?.length);
  const userInfo = useSelector((state: {auth: {login: string; subLogin: string | null}}) => ({
    login: state.auth.login,
    subLogin: state.auth.subLogin,
  }));

  useEffect(() => {
    if (!isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <Console>
        <Header>
          <div className="left-side">
            <svg width="115" height="30" viewBox="0 0 115 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="15" fill="#C4C4C4" />
              <circle cx="70" cy="15" r="15" fill="#C4C4C4" />
              <rect x="35" width="15" height="30" fill="#C4C4C4" />
              <path d="M100 0H115L100 30H85L100 0Z" fill="#C4C4C4" />
            </svg>
            <span>API-консолька</span>
          </div>
          <div className="right-side">
            <div className="right-side__info">
              {userInfo.login} <span>:</span> {userInfo.subLogin ? userInfo.subLogin : 'sublogin'}
            </div>
            <div className="right-side__logout">
              <span>Выйти</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.8">
                  <path
                    d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                    stroke="#0D0D0D"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M16 17L21 12L16 7" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 12H9" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </div>
            <FullScreenImg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 1H3C2.46957 1 1.96086 1.21071 1.58579 1.58579C1.21071 1.96086 1 2.46957 1 3V6M19 6V3C19 2.46957 18.7893 1.96086 18.4142 1.58579C18.0391 1.21071 17.5304 1 17 1H14M14 19H17C17.5304 19 18.0391 18.7893 18.4142 18.4142C18.7893 18.0391 19 17.5304 19 17V14M1 14V17C1 17.5304 1.21071 18.0391 1.58579 18.4142C1.96086 18.7893 2.46957 19 3 19H6"
                stroke="#0D0D0D"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </FullScreenImg>
          </div>
        </Header>
        <ApiHistory items={myArr} />
      </Console>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
      svg {
        padding-top: 3px;
      }
    }
  }
`;

const FullScreenImg = styled.svg`
  cursor: pointer;
  padding-top: 3px;
`;

export {MainPage};
