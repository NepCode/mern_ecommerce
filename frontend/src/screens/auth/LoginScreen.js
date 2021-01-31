import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import validator from 'validator'

import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'

import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'
import {FormContainer} from '../../components/FormContainer'

import { login } from '../../actions/userActions'





export const LoginScreen = ({ location, history }) => {

    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [loginFormValues, handleInputChange] = useForm({
        email: '',
        password: ''
    });

    const { email, password } = loginFormValues;

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }


    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
    }, [history, userInfo, redirect])


    return (
        <FormContainer>

        <h1>Sign In</h1>

        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={ handleInputChange }
            >
            </Form.Control>
        </Form.Group>
  
        <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
                name='password'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={ handleInputChange }
            >
            </Form.Control>
        </Form.Group>

            <Button type='submit' variant='primary'>
                Sign In
            </Button>
        </Form>
  
        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>

      </FormContainer>
    )
}
