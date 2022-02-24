import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import {Formik} from 'formik';
import {Input} from '../components/Input';
import {Button} from '../components/Button';

import {authenticate} from 'src/store/actions/auth';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  > a {
    font-size: 16px;
    line-height: 20px;
    color: #999999;
    text-decoration: none;
    margin-top: 20px;
  }
`;

const Form = styled.section`
  width: 520px;
  top: 222px;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 40px 30px;
  .form-header {
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const ErrorWrapper = styled.div`
  background: rgba(207, 44, 0, 0.1);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  div {
    display: flex;
    flex-direction: column;
    > span:first-child {
      color: #cf2c00;
      font-size: 18px;
      line-height: 30px;
    }
    > span:last-child {
      font-size: 12px;
      line-height: 20px;
      color: #cf2c00;
      opacity: 0.5;
    }
  }
`;

const LogoStyled = styled.img`
  margin-bottom: 20px;
`;

function LoginPage({history}) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const isLoggedIn = useSelector((state) => !!state.auth.sessionKey?.length);
  const error = useSelector((state) => state.auth.loginError);

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/console');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  const fetchLogin = (login, sublogin, password) => {
    dispatch(
      authenticate({
        login,
        sublogin,
        password,
      })
    );
  };

  const handleSubmit = (event) => {
    fetchLogin(event.login, event.subLogin, event.password);
  };

  if (isLoggedIn) return <></>;

  return (
    <Wrapper>
      <LogoStyled src="/icons/logo.svg" alt="" />
      <Form>
        <div className={'form-header'}>API-консолька</div>
        {error && (
          <ErrorWrapper>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.8">
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#CF2C00"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M8 15H16" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 9H9.01" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 9H15.01" stroke="#CF2C00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            </svg>
            <div>
              <span>Вход не вышел</span>
              <span>{`${JSON.stringify(error)}`}</span>
            </div>
          </ErrorWrapper>
        )}
        <Formik
          initialValues={{login: '', subLogin: '', password: ''}}
          onSubmit={handleSubmit}
          validate={(values) => {
            const errors = {};

            if (!values.login) {
              errors.login = 'Это поле обязательное!';
            } else if (!/^[a-zA-Z0-9_.@]+$/.test(values.login)) {
              errors.login = 'Поле заполнено некорректно';
            }

            if (!values.password) {
              errors.password = 'Это поле обязательное!';
              //eslint-disable-next-line
            } else if (!/^[a-zA-Z0-9\s!@#\$%\^\&*\)\(+=.,:;'"_-]+$/.test(values.password)) {
              errors.password = 'Поле заполнено некорректно';
            }

            return errors;
          }}
        >
          {({errors, values, handleChange, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <Input
                handleChange={handleChange}
                value={values.login}
                placeholder={'Логин'}
                label={'Логин'}
                id={'login'}
                errorMessage={errors.login}
              />
              <Input
                handleChange={handleChange}
                value={values.subLogin}
                placeholder={'Сублогин'}
                label={'Сублогин'}
                id={'subLogin'}
                required={false}
              />
              <Input
                handleChange={handleChange}
                value={values.password}
                placeholder={'Пароль'}
                label={'Пароль'}
                id={'password'}
                type={'password'}
                errorMessage={errors.password}
              />
              <Button
                text={'Войти'}
                onClick={(e) => {
                  handleSubmit();
                  e.currentTarget.blur();
                }}
                type={'submit'}
                loading={loading}
                disabled={Object.keys(errors).length > 0}
              />
            </form>
          )}
        </Formik>
      </Form>
      <a href="https://github.com/Dusha2k" target="_blank" rel="noreferrer noopener">
        github.com/Dusha2k
      </a>
    </Wrapper>
  );
}

export default withRouter(LoginPage);
