import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {ApiHistory} from '../components/ApiHistory';
import {CodePanel} from '../components/CodePanel';
import {MainFooter} from './MainFooter';
import MainHeader from './MainHeader';

const MainPage = () => {
  const history = useHistory();

  const isLoggedIn = useSelector((state: {auth: {sessionKey: string | null}}) => !!state.auth.sessionKey?.length);

  const leftCodePanelRef: any = useRef(null);
  const consoleRef: any = useRef(null);

  useEffect(() => {
    if (!isLoggedIn) history.push('/');
  }, [isLoggedIn]);

  return (
    <Wrapper>
      <Console ref={consoleRef}>
        <MainHeader consoleRef={consoleRef} />
        <ApiHistory />
        <CodePanel leftCodePanelRef={leftCodePanelRef} />
        <MainFooter leftCodePanelRef={leftCodePanelRef} />
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

export {MainPage};
