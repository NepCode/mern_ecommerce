import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import validator from 'validator'


import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'

import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'

import { getUserDetails } from '../../actions/userActions'





export const ProfileScreen = ({ location, history }) => {

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const [registerFormValues, handleInputChange, setInputValues ] = useForm({
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
          //DISPATCH UPDATE PROFILE
        }
    }


    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        } else {
            if(!user.email) {
                dispatch(getUserDetails('profile'))
            } else {
                setInputValues(
                    { ...registerFormValues,
                        email : user.email
                    })
            }
        }
        // eslint-disable-next-line
    }, [ dispatch, history, userInfo, user])


    return (
        
        <Row>
            <Col md={3}>

                <h1>User Profile</h1>

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
                        Update
                    </Button>
                </Form>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
        
    )
}
