import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { Product } from '../components/Product';
//import products from "../products";
import { useFetch } from '../hooks/useFetch'

const HomeScreen = () => {

    const { data : products , loading } = useFetch(`http://localhost:5000/api/v1/products`)
    //const { data : products , loading } = useFetch(`https://localhost:44372/api/v1/products`)

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
                    <h1>latest products</h1>
                    <Row>
                        { products.map((product) => (
                        <Col key={ product._id ? product._id : product.id } sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                        ))}
                    </Row>
                </>
                )
            }
        </>
    )
}

export default HomeScreen
