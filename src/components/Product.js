import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { Rating } from './Rating';

export const Product = ({ product }) => {
    
    let link = ``
    product._id ? link = `/product/${product._id}` : link = `/product/${product.id}`

    return (
        <Card className='my-3 p-3 rounded'>
        <Link to={`${link}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>
  
        <Card.Body>
            <Link to={`${link}`}>
              <Card.Title as='div'>
                  <strong>{product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text as='div'>
              {/*   <div className="my-3">
                    {product.rating} from {product.numReviews} reviews
                </div> */}
                <Rating 
                value={product.rating} 
                text={`${product.numReviews} reviews`} 
                />
            </Card.Text>

            <Card.Text className='rating__title_product_card_home' as='h3'>${product.price}</Card.Text>
        </Card.Body>
      </Card>
    )
}
