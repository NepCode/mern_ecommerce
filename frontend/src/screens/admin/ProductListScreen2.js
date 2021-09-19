import React, { useEffect, useCallback } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Message} from '../../components/Message'
import {Loader} from '../../components/Loader'
import { listProducts, deleteProduct, createProduct } from '../../actions/productActions'
import { types } from "../../types/types";
import ReactDataGrid from '@inovua/reactdatagrid-community'
//import '@inovua/reactdatagrid-community/index.css'
import '@inovua/reactdatagrid-community/base.css'
import '@inovua/reactdatagrid-community/theme/default-light.css'

const UserListScreen = ({ history }) => {

  //const [dataSource, setDataSource] = useState([]);   

  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  /* reactdatagrid */
  const gridStyle = { minHeight: 550, marginTop: 10 }
  const columns = [
    { name: '_id', header: 'ID', defaultVisible: false, minWidth: 150 },
    { name: 'name', defaultFlex: 1, header: 'Name' },
    { name: 'price', defaultFlex: 1, header: ' Price', type: 'number' },
    { name: 'brand', defaultFlex: 1, header: 'Brand' },
    { name: 'category', groupBy: false, defaultFlex: 1, header: 'Category' },
    {
        name: 'actions', header: 'Actions', minWidth: 80, sortable: false,
        render: ({data}) => {
            return <>
                <LinkContainer to={`/admin/product/${data._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                    <i className='fas fa-edit'></i>
                    </Button>
                </LinkContainer> 
                <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(data._id)}
                    >
                    <i className='fas fa-trash'></i>
                </Button> 
            </> 
        }
    }
  ]
  const filterValue = [
    { name: 'name', operator: 'contains', type: 'string', value: '' }
  ];
  
  const loadData = ({ skip, limit, sortInfo, groupBy, filterValue }) => {
    console.log(JSON.stringify(filterValue))
    //dispatch({  type: types.productTypes.PRODUCT_LIST_REQUEST })
    //DATASET_URL + '?skip='+skip+'&limit='+limit+(groupBy && groupBy.length?'&groupBy='+groupBy:'')+'&sortInfo='+JSON.stringify(sortInfo) + '&filterBy='+JSON.stringify(filterValue))
    return fetch(`${process.env.REACT_APP_API_URL}products` + '?skip='+skip + '&limit='+limit+ '&filterBy='+JSON.stringify(filterValue) + (sortInfo ? '&keyword='+JSON.stringify(sortInfo) : '')).then(response => {
      return response.json().then(data => {
        dispatch({ type: types.productTypes.PRODUCT_LIST_SUCCESS, payload : data });
        return { data: data.products , count: parseInt(data.count),  };
      })
    })
  }
  const loadData2 = ({ skip, limit, sortInfo }) => async () => {
    console.log(sortInfo+'sort')
    await dispatch(listProducts(skip,limit))
    
    /* return fetch(`${process.env.REACT_APP_API_URL}products` + '?skip='+skip + '&limit='+limit+(sortInfo ? '&keyword='+JSON.stringify(sortInfo) : '')).then(response => {
      return response.json().then(data => {
        return { data: data.products , count: parseInt(data.count),  };
      })
    }) */
    return { data: products.products , count: products.count,  };
  }
  const dataSource = useCallback(loadData, [])
  

    useEffect(() => {
        dispatch({ type: types.productTypes.PRODUCT_CREATE_RESET })
        if (!userInfo.isAdmin) {
            history.push('/login')
        } 
        if( successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        }else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, productDelete ])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

  return (
    <>

        <Row className='align-items-center'>
            <Col>
                <h1>Products</h1>
            </Col>
            <Col className='text-right'>
                <Button className='my-3' onClick={createProductHandler}>
                    <i className='fas fa-plus'></i> Create Product
                </Button>
            </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
        <Loader />
        ) : error ? (
            <Message variant='danger'>{error}</Message>
        ) : (
            <Table striped bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {products.products.map((product) => (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.category}</td>
                    <td>{product.brand}</td>
                
                    <td>

                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                        </Button>
                    </LinkContainer>

                    <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(product._id)}
                    >
                        <i className='fas fa-trash'></i>
                    </Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
            /* <ReactDataGrid
                idProperty="id"
                style={gridStyle}
                columns={columns}
                pagination="remote"
                defaultLimit={10}
                defaultSkip={0}
                pageSizes={[5, 10, 15, 30]}
                dataSource={dataSource}
                defaultFilterValue={filterValue}
                loading={loading}
            /> */
         )}
    </>
  )
}

export default UserListScreen