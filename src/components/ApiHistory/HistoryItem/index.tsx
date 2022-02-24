import React, {useEffect, useRef, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';
import {useDispatch} from 'react-redux';
import {deleteHistoryRequest, setLastTemplate} from '../../../store/actions';
import {useOnClickOutside} from '../../../helpers/useClickOutside';
import {sendJson} from '../../../store/actions';

export const HistoryItem = ({
  status,
  body,
  action,
  id,
  response,
}: {
  status: string;
  body: string;
  action: string;
  id: number;
  response: string;
}) => {
  const dispatch = useDispatch();
  const [copied, setCopied] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const itemRef: any = useRef();
  const dropdownRef = useRef();
  useOnClickOutside([itemRef, dropdownRef], () => setDropdownOpen(false));
  const jsonBody = JSON.stringify(body, null, 2);
  const jsonResponse = JSON.stringify(response, null, 2);

  const handleCopied = () => {
    setCopied(true);
    navigator.clipboard.writeText(jsonBody);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  useEffect(() => {
    console.log(itemRef.current?.getBoundingClientRect());
  }, [itemRef]);

  const dispatchLastTemplate = () => {
    dispatch(setLastTemplate({template: [jsonBody, jsonResponse], status: status}));
  };

  const handleSendJson = () => {
    dispatchLastTemplate();
    dispatch(sendJson(JSON.stringify(body, null, 2)));
  };

  return (
    <Draggable draggableId={`${id}${action}`} index={id}>
      {(provided) => (
        <Item ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={dispatchLastTemplate}>
          <div style={{backgroundColor: status === 'fail' ? 'red' : 'green', width: '10px', height: '10px', borderRadius: '50%'}} />
          <div style={{textAlign: 'center', position: 'relative'}}>{action ? action : 'undefined'}</div>
          <svg
            width="9"
            height="18"
            viewBox="0 0 6 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setDropdownOpen(!dropdownOpen);
            }}
            ref={itemRef as any}
          >
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
          {copied && <CopiedMessage>Скопировано</CopiedMessage>}
          {dropdownOpen && (
            <>
              <DropdownWrapper
                ref={dropdownRef as any}
                className="openedDropdown"
                style={{
                  position: 'fixed',
                  left: `${itemRef.current?.getBoundingClientRect().x - 80}px`,
                  top: `${itemRef.current?.getBoundingClientRect().y + 25}px`,
                }}
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSendJson();
                    setDropdownOpen(false);
                  }}
                >
                  Выполнить
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopied();
                    setDropdownOpen(false);
                  }}
                >
                  Скопировать
                </div>
                <span />
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(deleteHistoryRequest(body));
                    setDropdownOpen(false);
                  }}
                >
                  Удалить
                </div>
              </DropdownWrapper>
            </>
          )}
        </Item>
      )}
    </Draggable>
  );
};

const Item = styled.div`
  display: flex;
  position: relative;
  gap: 5px;
  align-items: center;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  }
  svg {
    cursor: pointer;
    margin: 0 2px;
  }
`;

const DropdownWrapper = styled.div`
  cursor: pointer;
  background: #fff;
  padding: 5px 0;
  position: fixed;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  z-index: 3;
  > div {
    padding: 10px 15px;
    &:hover {
      color: white;
      background-color: #0055fb;
    }
  }
  > div:nth-child(4n) {
    &:hover {
      background-color: #cf2c00;
    }
  }
  span {
    display: block;
    background-color: rgba(0, 0, 0, 0.2);
    height: 1px;
    margin: 5px 0;
  }
`;

const slideUp = keyframes`
  from {
    top: 5px;
  }
  
  to {
    top: -20px;
    opacity: 0
  }
`;

const CopiedMessage = styled.span`
  display: block;
  position: absolute;
  background-color: #f6f6f6;
  border-radius: 5px;
  font-size: 12px;
  padding: 3px 5px;
  left: 50%;
  transform: translateX(-50%);
  top: 5px;
  animation: ${slideUp} 1s ease-out 1;
`;
