import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import validator from 'validator'

import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'

import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'
import {FormContainer} from '../../components/FormContainer'

import { register } from '../../actions/userActions'





export const RegisterScreen = ({ location, history }) => {

    const dispatch = useDispatch();

    const userRegister = useSelector((state) => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const [registerFormValues, handleInputChange] = useForm({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState(null)

    const { email, password, confirmPassword } = registerFormValues;

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
          setMessage('Passwords do not match')
        } else {
          setMessage(null)
          dispatch(register(email, password))
        }
    }


    useEffect(() => {
        if (userInfo) {
          history.push(redirect)
        }
    }, [history, userInfo, redirect])


    return (
        <FormContainer>

        <h1>Sign Up</h1>

        {message && <Message variant='danger'>{message}</Message>}
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

        <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
                name='confirmPassword'
                type='password'
                placeholder='confirm password'
                value={confirmPassword}
                onChange={ handleInputChange }
            >
            </Form.Control>
        </Form.Group>

            <Button type='submit' variant='primary'>
                Register
            </Button>
        </Form>
  
        <Row className='py-3'>
          <Col>
            Have an Account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>

      </FormContainer>
    )
}
