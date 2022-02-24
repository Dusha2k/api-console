import React, {useEffect, useRef, useState} from 'react';
import SplitPane, {Pane} from 'react-split-pane';
import styled from 'styled-components';
import dotsImg from '../../assets/dots.svg';
import {useSelector} from 'react-redux';

export const CodePanel = ({leftCodePanelRef}: any) => {
  const secondRef: any = useRef(null);
  const wrapperRef: any = useRef(null);
  const templateJson = useSelector(
    (state: {apiHistory: {lastTemplateJson: {template: Array<string>; status: string | null}}}) => state.apiHistory.lastTemplateJson
  );
  const fullScreenMode = useSelector((state: {userSettings: {fullScreen: boolean}}) => state.userSettings.fullScreen);

  useEffect(() => {
    if (secondRef) {
      leftCodePanelRef.current.value = templateJson.template?.[0];
      secondRef.current.value = templateJson.template?.[1];
    }
  }, [templateJson]);

  useEffect(() => {
    if (secondRef?.current) {
      secondRef.current.style.width = `${localStorage.getItem('codePanel')}px`;
    }
  }, []);

  const getSizeForPanel = () => {
    const currentSize = Number(localStorage.getItem('codePanel'));
    if (!fullScreenMode) {
      return currentSize > 800 ? 800 : currentSize;
    }
    return currentSize;
  };

  return (
    <Wrapper ref={wrapperRef}>
      <SplitPane
        style={{padding: '10px 15px'}}
        split="vertical"
        primary="second"
        maxSize={fullScreenMode ? 1600 : 800}
        minSize={200}
        defaultSize={getSizeForPanel()}
        onChange={(e) => (secondRef.current.style.width = `${e}px`)}
        onDragFinished={(e) => localStorage.setItem('codePanel', e.toString())}
      >
        <div style={{height: '100%'}}>
          <PanelLabel>Запрос:</PanelLabel>
          <TextArea
            style={{width: '100%'}}
            ref={leftCodePanelRef}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                return;
              }
            }}
          />
        </div>
        <div style={{height: '100%'}}>
          <PanelLabel>Ответ:</PanelLabel>
          <TextArea
            className={templateJson.status ? templateJson.status : ''}
            ref={secondRef}
            readOnly={true}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                e.preventDefault();
                return;
              }
            }}
          />
        </div>
      </SplitPane>
    </Wrapper>
  );
};

const TextArea = styled.textarea`
  height: calc(100% - 20px);
  display: block;
  resize: none;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px;
`;

const Wrapper = styled.div`
  height: 440px;
  position: relative;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  .Resizer {
    z-index: 1;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -moz-background-clip: padding;
    -webkit-background-clip: padding;
    background-clip: padding-box;
  }
  .Resizer.vertical {
    background-image: url(${dotsImg});
    background-repeat: no-repeat;
    background-position: center center;
    width: 20px;
    margin: 0 -5px;
    border-left: 5px solid rgba(255, 255, 255, 0);
    border-right: 5px solid rgba(255, 255, 255, 0);
    cursor: col-resize;
  }
  .invalid-json,
  .fail {
    border: 1px solid #cf2c00;
    box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);
  }
`;

const PanelLabel = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;
