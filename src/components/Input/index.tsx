import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{error: boolean}>`
  display: flex;
  flex-direction: column;
  input {
    border: ${({error}) => (error ? `1px solid rgba(207, 44, 0, 0.4)` : `1px solid rgba(0, 0, 0, 0.2)`)};
    border-radius: 5px;
    padding: 5px 10px;
    font-size: 18px;
    line-height: 30px;
    cursor: pointer;
    &:hover {
      border: ${({error}) => (error ? `1px solid rgba(207, 44, 0, 0.6)` : `1px solid rgba(0, 0, 0, 0.4)`)};
    }
    &:focus {
      border: ${({error}) => (error ? `1px solid rgba(207, 44, 0, 0.6)` : `1px solid rgba(0, 0, 0, 0.4)`)};
      outline: ${({error}) => (error ? `1px solid rgba(207, 44, 0, 0.4)` : `2px solid rgba(0, 0, 0, 0.2)`)};
    }
  }
  .error-message {
    font-size: 12px;
    color: rgba(207, 44, 0, 0.8);
  }
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin-bottom: 5px;
  label {
    font-size: 16px;
    line-height: 20px;
    cursor: pointer;
  }
  .required-input {
    color: #999999;
    font-size: 12px;
  }
`;

interface IInput {
  value: string | number | null;
  handleChange(v: {[p: string]: string}): void;
  placeholder?: string;
  type?: string;
  label?: string;
  id?: string;
  required?: boolean;
  errorMessage?: string | undefined;
}

export const Input = React.memo(
  ({value, handleChange, placeholder = '', type = 'text', label, id, required = true, errorMessage}: IInput) => {
    return (
      <Wrapper error={!!errorMessage}>
        <LabelWrapper>
          {label && id && <label htmlFor={id}>{label}</label>}
          {!required && <span className={'required-input'}>Опционально</span>}
        </LabelWrapper>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value || ''}
          // @ts-ignore
          onChange={handleChange}
        />
        {errorMessage && <span className={'error-message'}>{errorMessage}</span>}
      </Wrapper>
    );
  }
);
