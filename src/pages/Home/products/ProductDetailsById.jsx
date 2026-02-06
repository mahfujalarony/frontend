import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Space,
  Button,
  Tag,
  Image,
  Rate,
  Alert,
  Input,
  InputNumber,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux"; 
import { addToCart, updateQty } from "./../../../redux/cartSlice.js"; 
import { products } from "./../../../data/products.js";

const demoReviews = [
  {
    id: 1,
    name: "Rahim",
    rating: 5,
    comment: "Product ta onek valo, quality expected er cheye better.",
    date: "2026-02-01",
    likes: 3,
    replies: [
      {
        id: 11,
        name: "Seller",
        comment: "Thanks for your feedback ❤️",
        date: "2026-02-02",
      },
    ],
  },
  {
    id: 2,
    name: "Karim",
    rating: 4,
    comment: "Delivery fast chilo, packaging o bhalo.",
    date: "2026-01-28",
    likes: 1,
    replies: [],
  },
];

const { Title, Text, Paragraph } = Typography;

const ProductDetailsById = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); 
  
  const [activeImg, setActiveImg] = useState(null);
  const [reviews, setReviews] = useState(demoReviews);
  const [replyText, setReplyText] = useState("");
  const [activeReplyId, setActiveReplyId] = useState(null);
 
  const cartItem = cartItems.find(item => String(item.id) === String(id));
  const [qty, setQty] = useState(cartItem ? cartItem.qty : 1);

  const product = useMemo(
    () => products.find((p) => String(p.id) === String(id)),
    [id]
  );

  const images = product?.imageUrl || [];
  const mainImg = activeImg || images[0];

  const handleLike = (reviewId) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleReply = (reviewId) => {
    if (!replyText.trim()) return;
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId
          ? {
              ...r,
              replies: [
                ...r.replies,
                {
                  id: Date.now(),
                  name: "You",
                  comment: replyText,
                  date: "Just now",
                },
              ],
            }
          : r
      )
    );
    setReplyText("");
    setActiveReplyId(null);
  };


  const handleQtyChange = (value) => {
    setQty(value);
    if (product && value > 0 && value <= product.stock) {
      dispatch(updateQty({ id: product.id, qty: value }));
    }
  };

  const handleIncrease = () => {
    if (qty < product.stock) {
      const newQty = qty + 1;
      setQty(newQty);
      dispatch(updateQty({ id: product.id, qty: newQty }));
    }
  };


  const handleDecrease = () => {
    if (qty > 1) {
      const newQty = qty - 1;
      setQty(newQty);
      dispatch(updateQty({ id: product.id, qty: newQty }));
    }
  };

  const handleAdd = () => {
    if (product && qty > 0) {
      dispatch(
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl?.[0],
          qty: qty,
        })
      );
      message.success("Product added to cart!");
    }
  };

  if (!product) {
    return (
      <div style={{ padding: 24 }}>
        <Alert
          type="warning"
          message="Product not found"
          description="Invalid product id"
          showIcon
        />
      </div>
    );
  }

  return (
    <>
      <Card bodyStyle={{ padding: 24 }}>
        <Space align="start" size="large" wrap>
          <Space direction="vertical" size="small">
            <Image
              src={mainImg}
              alt={product.name}
              width={320}
              height={320}
              style={{ objectFit: "cover", borderRadius: 12 }}
              fallback="https://via.placeholder.com/320"
            />
            <Space wrap>
              {images.map((src, idx) => (
                <Image
                  key={idx}
                  src={src}
                  preview={false}
                  alt={`${product.name} ${idx + 1}`}
                  width={64}
                  height={64}
                  style={{
                    objectFit: "cover",
                    borderRadius: 8,
                    border:
                      src === mainImg ? "2px solid #f97316" : "1px solid #eee",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveImg(src)}
                  fallback="https://via.placeholder.com/64"
                />
              ))}
            </Space>
          </Space>

          <Space direction="vertical" size="middle" style={{ maxWidth: 520 }}>
            <Title level={3} style={{ marginBottom: 4 }}>
              {product.name}
            </Title>

            <Space size="small">
              {product.category && <Tag>{product.category}</Tag>}
              {product.stock > 0 ? (
                <Tag color="green">In stock</Tag>
              ) : (
                <Tag color="red">Out of stock</Tag>
              )}
            </Space>

            <Space align="center">
              <Rate disabled allowHalf value={product.rating} />
              <Text type="secondary">{product.rating?.toFixed(1)}</Text>
            </Space>

            <Title level={4} style={{ margin: 0, color: "#f97316" }}>
              ৳{product.price.toFixed(2)}
            </Title>

            <Paragraph style={{ marginBottom: 4 }}>
              {product.description || "No description available."}
            </Paragraph>

                <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                justifyContent: 'flex-start'
                }}>
                {/* Quantity Section */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    minWidth: '200px',
                    flex: '1'
                }}>
                    <Text strong style={{ marginRight: 8 }}>Quantity:</Text>
                    
                    <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                    }}>
                    <Button 
                        size="small" 
                        onClick={handleDecrease}
                        disabled={qty <= 1}
                        style={{ minWidth: '32px' }}
                    >
                        -
                    </Button>
                    
                    <InputNumber
                        min={1}
                        max={product.stock}
                        value={qty}
                        onChange={handleQtyChange}
                        style={{ 
                        width: '70px',
                        textAlign: 'center'
                        }}
                    />
                    
                    <Button 
                        size="small" 
                        onClick={handleIncrease}
                        disabled={qty >= product.stock}
                        style={{ minWidth: '32px' }}
                    >
                        +
                    </Button>
                    </div>
                </div>

                {/* Add to Cart Button */}
                <Button
                    type="primary"
                    size="large"
                    disabled={product.stock <= 0}
                    onClick={handleAdd}
                    style={{ 
                    flex: '1 0 200px',
                    minWidth: '200px',
                    maxWidth: '300px'
                    }}
                >
                    {cartItem ? "Update Cart" : "Add to Cart"}
                </Button>
                
                {/* Stock Info and Cart Tag */}
                <div style={{ 
                    display: 'flex', 
                    gap: '12px',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    flex: '1'
                }}>
                    {product.stock > 0 && (
                    <Text type="secondary" style={{ whiteSpace: 'nowrap' }}>
                        Available: {product.stock}
                    </Text>
                    )}
                    
                    {cartItem && (
                    <Tag color="blue" style={{ whiteSpace: 'nowrap' }}>
                        In cart: {cartItem.qty}
                    </Tag>
                    )}
                </div>
                </div>
        

          </Space>
        </Space>
      </Card>

      <Card style={{ marginTop: 24 }}>
        <Title level={4}>Customer Reviews</Title>

        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {reviews.map((review) => (
            <Card key={review.id} size="small">
              <Space direction="vertical" size={6} style={{ width: "100%" }}>
                <Space align="center">
                  <Text strong>{review.name}</Text>
                  <Rate disabled allowHalf value={review.rating} />
                  <Text type="secondary">{review.rating}</Text>
                </Space>

                <Paragraph>{review.comment}</Paragraph>

                <Space size="middle">
                  <Button type="text" onClick={() => handleLike(review.id)}>
                    👍 Helpful ({review.likes})
                  </Button>

                  <Button
                    type="text"
                    onClick={() => setActiveReplyId(review.id)}
                  >
                    Reply
                  </Button>
                </Space>

                {activeReplyId === review.id && (
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <Input.TextArea
                      rows={2}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                    />
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleReply(review.id)}
                    >
                      Submit Reply
                    </Button>
                  </Space>
                )}

                {review.replies.length > 0 && (
                  <Space
                    direction="vertical"
                    style={{
                      marginLeft: 24,
                      marginTop: 8,
                      width: "100%",
                    }}
                  >
                    {review.replies.map((rep) => (
                      <Card key={rep.id} size="small" type="inner">
                        <Text strong>{rep.name}</Text>
                        <Paragraph style={{ marginBottom: 4 }}>
                          {rep.comment}
                        </Paragraph>
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          {rep.date}
                        </Text>
                      </Card>
                    ))}
                  </Space>
                )}
              </Space>
            </Card>
          ))}
        </Space>
      </Card>
    </>
  );
};

export default ProductDetailsById;