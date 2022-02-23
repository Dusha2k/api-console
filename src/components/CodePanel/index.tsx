import React, {useEffect, useRef, useState} from 'react';
import SplitPane, {Pane} from 'react-split-pane';
import styled from 'styled-components';
import dotsImg from '../../assets/dots.svg';
import {useSelector} from 'react-redux';

export const CodePanel = ({myRef}: any) => {
  const [initialSize, setInitialSize] = useState(200);
  const secondRef: any = useRef(null);
  const templateJson = useSelector((state: {apiHistory: {lastTemplateJson: Array<string>}}) => state.apiHistory.lastTemplateJson);

  useEffect(() => {
    if (secondRef) {
      myRef.current.value = templateJson?.[0];
      secondRef.current.value = templateJson?.[1];
    }
  }, [templateJson]);

  return (
    <Wrapper>
      <SplitPane style={{padding: '10px 15px'}} minSize={'200px'} split="vertical" primary="second" onChange={(e) => setInitialSize(e)}>
        <div style={{height: '100%'}}>
          <PanelLabel>Запрос:</PanelLabel>
          <TextArea
            style={{width: '100%'}}
            ref={myRef}
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
            ref={secondRef}
            readOnly={true}
            style={{width: `${initialSize}px`}}
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
`;

const Wrapper = styled.div`
  height: 440px;
  position: relative;
  background: #fff;
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
  .invalid-json {
    border: 1px solid #cf2c00;
    box-shadow: 0px 0px 5px rgba(207, 44, 0, 0.5);
  }
`;

const PanelLabel = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;
