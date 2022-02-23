import React, {useState} from 'react';
import SplitPane, {Pane} from 'react-split-pane';
import styled from 'styled-components';
import dotsImg from '../../assets/dots.svg';

export const CodePanel = ({myRef}: any) => {
  const [initialSize, setInitialSize] = useState(200);
  return (
    <Wrapper>
      <SplitPane
        style={{height: '440px', padding: '10px 15px'}}
        minSize={'200px'}
        split="vertical"
        primary="second"
        onChange={(e) => setInitialSize(e)}
      >
        <div>
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
        <div>
          <PanelLabel>Ответ:</PanelLabel>
          <TextArea
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
  height: 400px;
  display: block;
  resize: none;
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
`;

const PanelLabel = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #999999;
`;
