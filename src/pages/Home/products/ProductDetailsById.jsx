import React, { useEffect } from 'react'
import { useParams, useNavigationType } from 'react-router-dom';
import { products } from '../../../data/products';

const ProductDetailsById = () => {

    const { id } = useParams();
    const navigationType = useNavigationType(); 

    useEffect(() => {
        if (navigationType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [navigationType]);


  return (
    <div>
        Product Details for ID: {id}
        <div className='h-[100vh]'>hello</div>
        <div className='h-[100vh]'>hello 2</div>
    </div>
  )
}

export default ProductDetailsById