import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import { Rating } from '../components/Rating';
//import { Product } from '../components/Product';
//import products from '../products';
//import { useFetch } from '../hooks/useFetch'
import { Loader } from '../components/Loader';
import { Message } from '../components/Message';

import { listProductDetails } from "../actions/productActions";


export const ProductScreen = ({ history, match }) => {

    //const product = products.find( p => p._id === match.params.id )
    //const { data : product , loading } = useFetch(`http://localhost:5000/api/v1/products/${match.params.id }`)
    //const { data : product , loading } = useFetch(`https://localhost:44372/api/v1/products/${match.params.id }`)
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()
    const productDetails = useSelector( state => state.productDetails );
    const { loading, error, product } = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])


    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (

        <>

        { loading
            ?
            (
                <Loader/>
            )
            : error ?
            (
                <Message variant={'danger'}>
                {error}
                </Message>
            )  
            :
            (
                <>

                <Link className='btn btn-light my-3' to='/'>
                    Go Back
                </Link>

                <Row>

                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid rounded />
                    </Col>

                    <Col md={3}>
                        <ListGroup>

                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>

                        </ListGroup>
                    </Col>

                    <Col md={3}>
                        <ListGroup>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            { product.countInStock > 0 && (
                                
                                <ListGroup.Item>
                                    <Row>
                                        <Col> Qty </Col>
                                        <Col> 
                                            <Form.Control
                                            as='select'
                                            value={qty}
                                            onChange={(e) => setQty(e.target.value)}
                                            >
                                            {[...Array(product.countInStock).keys()].map(
                                                (x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                    </option>
                                                )
                                            )}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                            )}

                            <ListGroup.Item>
                            <Button
                            onClick={addToCartHandler}
                            className='btn-block'
                            type='button'
                            disabled={product.countInStock === 0}
                            >
                            Add To Cart
                            </Button>
                        </ListGroup.Item>

                        </ListGroup>
                    </Col>

                </Row>
                </>
            ) 
        
        }

        
        
       
      
      </>
    )
}
