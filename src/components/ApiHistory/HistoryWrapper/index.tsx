import React, {useRef} from 'react';
import {HistoryItem} from '../HistoryItem';
import styled from 'styled-components';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {reorderArray} from '../../../helpers/functions';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {jsonHistoryUpdate} from '../../../store/actions';
import {IHistoryRequest} from '../../../store/reducers/jsonResponse';

export const HistoryWrapper = () => {
  const dispatch = useDispatch();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const historyItems = useSelector(
    (state: {apiHistory: {historyRequests: Array<IHistoryRequest> | null}}) => state.apiHistory.historyRequests
  );

  const onWheel = (e: any) => {
    if (e.currentTarget.outerHTML.toString().includes('openedDropdown')) return;
    if (wrapperRef?.current) {
      const el = wrapperRef.current;
      if (e.deltaY === 0) return;
      el.scrollTo({
        left: el.scrollLeft + e.deltaY * 1.5,
        behavior: 'smooth',
      });
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = reorderArray(historyItems || [], result.source.index, result.destination.index);
    dispatch(jsonHistoryUpdate(items));
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <ItemsWrapper ref={wrapperRef} onWheel={onWheel}>
          <Droppable droppableId={'list'} direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{display: 'flex', gap: '10px', width: 'fit-content'}}>
                {historyItems?.map((item, index) => {
                  return (
                    <HistoryItem
                      status={item.status}
                      body={item.body as string}
                      action={item.action}
                      id={index}
                      key={index}
                      response={item.response as string}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ItemsWrapper>
      </DragDropContext>
      <ClearButton onClick={() => dispatch(jsonHistoryUpdate([]))}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L19 19" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" />
          <path d="M19 1L1 19" stroke="#0D0D0D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </ClearButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ItemsWrapper = styled.div`
  overflow: scroll;
  position: relative;
  padding: 10px 0 10px 15px;
  width: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ClearButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 13px;
  position: relative;
  cursor: pointer;
  &:before {
    pointer-events: none;
    content: ' ';
    height: 100%;
    position: absolute;
    top: 0;
    width: 15px;
    background: linear-gradient(269.93deg, #f6f6f6 0.06%, rgba(246, 246, 246, 0) 99.93%);
    left: -16px;
  }
`;
