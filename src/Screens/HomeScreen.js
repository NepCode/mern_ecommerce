import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";

import { Col, Row } from 'react-bootstrap';
import { Product } from '../components/Product';
//import products from "../products";
//import { useFetch } from '../hooks/useFetch'

import { listProducts } from "../actions/productActions";

const HomeScreen = () => {

    //const { data : products , loading } = useFetch(`${process.env.REACT_APP_API_URL}products`)

    const dispatch = useDispatch()
    const productList = useSelector( state => state.productList );
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(listProducts())
     }, [dispatch])


    return (
        <>

            { loading ?
                ( 
                    <h1 className="text-center">
                    Loading ...
                    </h1>
                )
                : error ?
                (
                    <h1 className="text-center">
                    {error}
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
