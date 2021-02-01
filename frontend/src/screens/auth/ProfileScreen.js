import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import validator from 'validator'


import { Form, Button, Row, Col } from 'react-bootstrap'
import { useForm } from '../../hooks/useForm'

import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'

import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { types } from "../../types/types";





export const ProfileScreen = ({ location, history }) => {

    const dispatch = useDispatch();

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile  = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile 


    const [registerFormValues, handleInputChange, setInputValues ] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState(null)

    const { name, email, password, confirmPassword } = registerFormValues;

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword) {
          setMessage('Passwords do not match')
        } else {
          dispatch( updateUserProfile({
              id: user._id,
              name,
              email,
              password
          }))
        }
    }


    useEffect(() => {
        if (!userInfo) {
          history.push('/login')
        } else {
            if( !user || !user.email || success ) {
                dispatch( {type: types.userTypes.USER_UPDATE_PROFILE_RESET} )
                dispatch(getUserDetails('profile'))
            } else {
                setInputValues(
                    { ...registerFormValues,
                        name : user.name,
                        email : user.email
                    })
            }
        }
        // eslint-disable-next-line
    }, [ dispatch, history, userInfo, user, success])


    return (
        
        <Row>
            <Col md={3}>

                <h1>User Profile</h1>

                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'>Profile Updated</Message>}
                {loading && <Loader />}

                <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                    name='name'
                    type='text'
                    placeholder='Enter your name'
                    value={name}
                    onChange={ handleInputChange }
                    >
                    </Form.Control>
                </Form.Group>

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
