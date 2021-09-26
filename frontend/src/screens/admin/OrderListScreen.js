import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'
import { listOrders } from '../../actions/orderActions'
//import { types } from "../../types/types";
import Pagination from "@material-ui/lab/Pagination";


const UserListScreen = ({ history }) => {

  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  /* const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate */

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



    useEffect(() => {
        /* dispatch({ type: types.productTypes.PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        } 
        if( successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts())
        } */
        dispatch(listOrders())
        
    //}, [dispatch, history, userInfo, successDelete, successCreate, createdProduct ])
    }, [dispatch, history, userInfo ])

   /*  const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
        dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    } */

    const handlePagination = ( e, value ) => {
        dispatch(listOrders(value))
    }

  return (
    <>

        <Row className='align-items-center'>
            <Col>
                <h1>Orders</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' /* onClick={createProductHandler} */>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
     {/*    {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
        {loading ? (
        <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <>
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    { orders.orders.map( order => (

                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice}</td>

                            <td>{order.isPaid ? order.paidAt.substring(0,10) : 
                            (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                            )}
                            </td>

                            <td> {order.isDelivered ? ( order.deliveredAt.substring(0, 10) ) : 
                                (
                                <i className='fas fa-times' style={{ color: 'red' }}></i>
                                )}
                            </td>

                            <td>
                                {/* <LinkContainer to={`/order/${order._id}`}> */}
                                <LinkContainer to={`/admin/order/${order._id}/edit`}>
                                <Button className='btn-sm' variant='light'>
                                    Details
                                </Button>
                                </LinkContainer>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination count={orders.pages} page={orders.page} onChange={handlePagination} />
            </>
        )}
    </>
  )
}

export default UserListScreen