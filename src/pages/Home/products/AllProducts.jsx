import React, { useEffect, useState } from 'react';
import { useNavigationType, Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { products } from '../../../data/products';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice'; 
import ProductCard from '../../../components/common/ProductCart';
import { message } from 'antd';

const ITEMS_PER_PAGE = 24;

const fetchProducts = async ({ pageParam = 0 }) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const startIndex = pageParam * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const pageData = products.slice(startIndex, endIndex);

    return {
        data: pageData,
        nextPage: endIndex < products.length ? pageParam + 1 : undefined,
    };
};



// --- মেইন কম্পোনেন্ট ---
const AllProducts = () => {
    const navigationType = useNavigationType();
    const { ref, inView } = useInView();
    const dispatch = useDispatch();

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: ['products-infinite'],
        queryFn: fetchProducts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30, // React Query v5 এ cacheTime কে gcTime বলা হয়। v4 হলে cacheTime রাখুন।
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    useEffect(() => {
        if (navigationType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [navigationType]);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const handleAddToCartClick = (product, qty) => {
        console.log('Added to cart:', product.name, 'Qty:', qty, 'ta');
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl?.[0],
                qty: qty,
            })
        );
        message.success(`${qty} ${product.name} added to cart`);
    };

    if (status === 'loading') {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-2 py-6 pb-20">
            <h2 className="text-xl font-bold mb-4 px-1 text-gray-800">
                All Products
                <span className="text-sm font-normal text-gray-500 ml-2">
                    ({data?.pages.reduce((total, page) => total + page.data.length, 0)} items)
                </span>
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-3 mb-6">
                {data?.pages.map((group, i) => (
                    <React.Fragment key={i}>
                        {group.data.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={handleAddToCartClick}
                            /> 
                        ))}
                    </React.Fragment>
                ))}
            </div>

            <div ref={ref} className="flex justify-center py-6 h-16">
                {isFetchingNextPage && (
                    <div className="flex items-center space-x-2 text-blue-600">
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-75"></span>
                        <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></span>
                    </div>
                )}
                {!hasNextPage && status !== 'loading' && (
                    <span className="text-xs text-gray-400 font-medium">No more products</span>
                )}
            </div>
        </div>
    );
};

export default AllProducts;