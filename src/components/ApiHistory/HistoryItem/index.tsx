import React from 'react';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

export const HistoryItem = ({status, name, id}: {status: string; name: string; id: number}) => {
  return (
    <Draggable draggableId={`${id}${name}`} index={id}>
      {(provided) => (
        <Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          <div style={{backgroundColor: status === 'fail' ? 'red' : 'green', width: '10px', height: '10px', borderRadius: '50%'}} />
          <div style={{textAlign: 'center'}}>{name ? name : 'undefined'}</div>
          <svg width="6" height="18" viewBox="0 0 6 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0)">
              <circle cx="3" cy="2" r="2" fill="black" fillOpacity="0.2" />
              <circle cx="3" cy="9" r="2" fill="black" fillOpacity="0.2" />
              <circle cx="3" cy="16" r="2" fill="black" fillOpacity="0.2" />
            </g>
            <defs>
              <clipPath id="clip0">
                <rect x="0" width="6" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Item>
      )}
    </Draggable>
  );
};

const Item = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
`;
