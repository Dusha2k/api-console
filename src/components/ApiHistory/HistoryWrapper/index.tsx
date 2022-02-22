import React, {useRef, useState} from 'react';
import {HistoryItem} from '../HistoryItem';
import styled from 'styled-components';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {reorderArray} from '../../../helpers/functions';

type ItemType = {items: Array<{name: string; status: string}>};

export const HistoryWrapper = ({items}: ItemType) => {
  const [list, setList] = useState<Array<{name: string; status: string}>>(items);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const onWheel = (e: any) => {
    if (wrapperRef?.current) {
      const el = wrapperRef.current;
      if (e.deltaY == 0) return;
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
    const items = reorderArray(list, result.source.index, result.destination.index);
    setList(items);
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <ItemsWrapper ref={wrapperRef} onWheel={onWheel}>
          <Droppable droppableId={'list'} direction="horizontal">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{display: 'flex', gap: '10px'}}>
                {list.map((item, index) => (
                  <HistoryItem status={item.status} name={item.name} id={index} key={index} />
                ))}
              </div>
            )}
          </Droppable>
        </ItemsWrapper>
      </DragDropContext>
      <ClearButton>
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
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ItemsWrapper = styled.div`
  overflow: scroll;
  position: relative;
  padding: 10px 0 10px 15px;
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
  &:before {
    content: ' ';
    height: 100%;
    position: absolute;
    top: 0;
    width: 15px;
    background: linear-gradient(269.93deg, #f6f6f6 0.06%, rgba(246, 246, 246, 0) 99.93%);
    left: -16px;
  }
`;
