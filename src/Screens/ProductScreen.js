import React from 'react'
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import { Rating } from '../components/Rating';
import { Product } from '../components/Product';
//import products from '../products';
import { useFetch } from '../hooks/useFetch'

export const ProductScreen = ({ match }) => {

    //const product = products.find( p => p._id === match.params.id )
    //const { data : product , loading } = useFetch(`http://localhost:5000/api/v1/products/${match.params.id }`)
    const { data : product , loading } = useFetch(`https://localhost:44372/api/v1/products/${match.params.id }`)

    return (

        <>

        { loading
            ?
            (
                <h1 className="text-center">
                Loading ...
                </h1>
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
                                <h3>{Product.name}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: ${product.description}
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

                            <ListGroup.Item>
                            <Button
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
