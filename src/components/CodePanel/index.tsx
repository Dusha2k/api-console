import React, {useEffect, useRef} from 'react';
import SplitPane from 'react-split-pane';
import styled from 'styled-components';
import dotsImg from '../../assets/dots.svg';
import {useSelector} from 'react-redux';
import {IHistoryRequest} from '../../store/reducers/jsonResponse';

export const CodePanel = ({leftCodePanelRef}: {leftCodePanelRef: React.RefObject<HTMLTextAreaElement>}) => {
  const rightCodePanelRef: React.RefObject<HTMLTextAreaElement> = useRef(null);
  const wrapperRef: React.RefObject<HTMLDivElement> = useRef(null);
  const templateJson = useSelector(
    (state: {apiHistory: {lastTemplateJson: {template: Array<string>; status: string | null}}}) => state.apiHistory.lastTemplateJson
  );
  const lastRequest = useSelector((state: {apiHistory: {historyRequests: Array<IHistoryRequest>}}) => state.apiHistory.historyRequests);
  //const fullScreenMode = useSelector((state: {userSettings: {fullScreen: boolean}}) => state.userSettings.fullScreen);

  useEffect(() => {
    if (rightCodePanelRef.current && leftCodePanelRef.current) {
      leftCodePanelRef.current.value = templateJson.template?.[0];
      rightCodePanelRef.current.value = templateJson.template?.[1];
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateJson]);

  useEffect(() => {
    if (lastRequest?.length > 0 && rightCodePanelRef.current)
      rightCodePanelRef.current.value = JSON.stringify(lastRequest[0]?.response, null, 2);
  }, [lastRequest]);

  //useEffect(() => {
  //     if (rightCodePanelRef.current) {
  //       const panelWidth = rightCodePanelRef!.current.style.width.replace('px', '');
  //       if (!fullScreenMode && Number(panelWidth) > 800) {
  //         rightCodePanelRef.current.style.width = '800px';
  //       } else if (fullScreenMode) {
  //         rightCodePanelRef.current.style.width = '100%';
  //       }
  //     }
  //   }, [fullScreenMode]);

  useEffect(() => {
    if (rightCodePanelRef?.current && localStorage.getItem('codePanel')) {
      const storageWidth = localStorage.getItem('codePanel');
      rightCodePanelRef.current.style.width = `${storageWidth}px`;
    }
  }, []);

  const getSizeForPanel = () => {
    const currentSize = Number(localStorage.getItem('codePanel'));
    if (currentSize === 0) return 800;
    return currentSize;
  };

  return (
    <Wrapper ref={wrapperRef}>
      <SplitPane
        style={{padding: '10px 15px'}}
        split="vertical"
        primary="second"
        maxSize={1500}
        minSize={500}
        defaultSize={getSizeForPanel()}
        onChange={(e) => (rightCodePanelRef!.current!.style.width = `${e}px`)}
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
            ref={rightCodePanelRef}
            style={{width: '100%'}}
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
