import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'
import {FormContainer} from '../../components/FormContainer'
import { listProductDetails, updateProduct } from '../../actions/productActions'
import { types } from '../../types/types'
import { logout } from '../../actions/userActions'

import { axios } from "axios";

const ProductEditScreen = ({ match, history }) => {
    
    const productId = match.params.id
  
    const [uploading, setUploading] = useState(false)
    const [editProduct, setEditProduct] = useState({
      name : '',
      price : 0,
      image : '',
      brand : '',
      category : '',
      countInStock : '0',
      description : ''
    })
  
    const dispatch = useDispatch()
  
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
  
    const productUpdate = useSelector((state) => state.productUpdate)
    const { loading: loadingUpdate,  error: errorUpdate,  success: successUpdate, } = productUpdate
  
    useEffect(() => {
      if (userInfo && userInfo.isAdmin) {
          if (successUpdate) {
              dispatch({ type: types.productTypes.PRODUCT_UPDATE_RESET })
              dispatch({ type: types.productTypes.PRODUCT_DETAILS_RESET })
              history.push('/productsList')
              } else {
                  if (!product.name || product._id !== productId) {
                    dispatch(listProductDetails(productId))
                  } else {
                    setEditProduct( prev => ({
                      ...prev,
                      name : product.name,
                      price : product.price,
                      image : product.image,
                      brand : product.brand,
                      category : product.category,
                      countInStock : product.countInStock,
                      description : product.description 
                    }))
                  }
              }
        } else {
          dispatch(logout())
          history.push('/login')
        } 
    }, [dispatch, history, productId, product, successUpdate, userInfo])
  
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          //setImage(data)
          setEditProduct( prev => ({
            ...prev,
            image : data 
          }))

          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditProduct( prev => ({
        ...prev,
        [name] : value
      }))
    }

    
    const submitHandler = (e) => {
        e.preventDefault()
        console.log(editProduct)
        dispatch(
          updateProduct({
            _id: productId,
            name : editProduct.name,
            price : editProduct.price,
            image : editProduct.image,
            brand : editProduct.brand,
            category : editProduct.category,
            description : editProduct.description,
            countInStock : editProduct.countInStock,
          })
        )
    }
  
    return (
        <>
          <Link to='/productsList' className='btn btn-light my-3'>
            Go Back
          </Link>
          <FormContainer>
            <h1>Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name='name'
                    type='name'
                    placeholder='Enter name'
                    value={editProduct.name}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    name='price'
                    type='number'
                    placeholder='Enter price'
                    value={editProduct.price}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name='image'
                    type='text'
                    placeholder='Enter image url'
                    value={editProduct.image}
                    onChange={handleInputChange}
                  ></Form.Control>
                  <Form.File
                    id='image-file'
                    label='Choose File'
                    custom
                    onChange={uploadFileHandler}
                  ></Form.File>
                  {uploading && <Loader />}
                </Form.Group>
    
                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                    name='brand'
                    type='text'
                    placeholder='Enter brand'
                    value={editProduct.brand}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='countInStock'>
                  <Form.Label>Count In Stock</Form.Label>
                  <Form.Control
                    name='countInStock'
                    type='number'
                    placeholder='Enter countInStock'
                    value={editProduct.countInStock}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    name='category'
                    type='text'
                    placeholder='Enter category'
                    value={editProduct.category}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
    
                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name='description'
                    type='text'
                    placeholder='Enter description'
                    value={editProduct.description}
                    onChange={handleInputChange}
                  ></Form.Control>
                </Form.Group>
    
                <Button type='submit' variant='primary'>
                  Update
                </Button>
              </Form>
            )}
          </FormContainer>
        </>
      )
    }

export default ProductEditScreen
