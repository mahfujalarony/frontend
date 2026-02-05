import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Button, FloatButton } from "antd";
import { DeleteOutlined, PlusOutlined, MinusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { removeFromCart, updateQty, clearCart } from "./../../redux/cartSlice"
import { Badge } from "antd";

const CartButton = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
  const cartItems = useSelector((state) => state.cart.items);
  
  // Calculate total price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Increase quantity
  const handleIncrease = (id, currentQty) => {
    dispatch(updateQty({ id, qty: currentQty + 1 }));
  };

  // Decrease quantity
  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQty({ id, qty: currentQty - 1 }));
    }
  };

  // Remove item
  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  // Clear all items
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      {/* Floating Cart Button */}
        <FloatButton
          icon={
            <div style={{ position: "relative" }}>
              <ShoppingCartOutlined style={{ fontSize: 20 }} />

              {cartItems.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -10,
                    background: "#f97316",
                    color: "#fff",
                    borderRadius: "50%",
                    padding: "0 6px",
                    fontSize: "12px",
                    lineHeight: "18px",
                    minWidth: "18px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          }
          type="primary"
          style={{
            right: 24,
            bottom: 24,
            backgroundColor: "#f97316",
          }}
          onClick={showDrawer}
        />



      {/* Cart Drawer */}
      <Drawer
        title={`Your Cart (${cartItems.length} items)`}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
        width={400}
      >
        {cartItems.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>
            <p>🛒 Your cart is empty!</p>
          </div>
        ) : (
          <>
            {/* Cart Items List */}
            <div style={{ maxHeight: "calc(100vh - 250px)", overflowY: "auto" }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "12px",
                    borderBottom: "1px solid #f0f0f0",
                    alignItems: "center",
                  }}
                >
                  {/* Product Image */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: 0, fontSize: "14px" }}>{item.name}</h4>
                    <p style={{ margin: "4px 0", color: "#f97316", fontWeight: "bold" }}>
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <Button
                        size="small"
                        icon={<MinusOutlined />}
                        onClick={() => handleDecrease(item.id, item.qty)}
                        disabled={item.qty <= 1}
                      />
                      <span style={{ minWidth: "20px", textAlign: "center" }}>
                        {item.qty}
                      </span>
                      <Button
                        size="small"
                        icon={<PlusOutlined />}
                        onClick={() => handleIncrease(item.id, item.qty)}
                      />
                    </div>
                  </div>

                  {/* Item Total & Delete */}
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontWeight: "bold" }}>
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemove(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div
              style={{
                borderTop: "2px solid #f0f0f0",
                paddingTop: "16px",
                marginTop: "16px",
              }}
            >
              {/* Total Price */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "18px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                <span>Total:</span>
                <span style={{ color: "#f97316" }}>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Action Buttons */}
              <Button
                type="primary"
                block
                size="large"
                style={{ backgroundColor: "#f97316", borderColor: "#f97316" }}
              >
                Checkout
              </Button>
              
              <Button
                block
                danger
                style={{ marginTop: "8px" }}
                onClick={handleClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </Drawer>
    </>
  );
};

export default CartButton;