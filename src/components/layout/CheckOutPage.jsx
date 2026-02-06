import React, { useMemo, useState } from "react";
import {
  Card,
  Radio,
  Button,
  Space,
  Form,
  Input,
  Modal,
  Divider,
  message,
  Typography,
  Tag,
  Select,
  List,
  Popconfirm,
} from "antd";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { updateQty, removeFromCart } from "./../../redux/cartSlice";
import { useLocation } from "react-router-dom";

const { Title, Text } = Typography;

const paymentOptions = [
  { value: "cod", label: "Cash on Delivery" },
  { value: "card", label: "Credit/Debit Card" },
  { value: "bkash", label: "bKash/Nagad" },
];

const initialAddresses = [
  {
    id: "addr-1",
    label: "Home",
    name: "Mahfuja Rahman",
    phone: "017XXXXXXXX",
    line1: "House 10, Road 3",
    city: "Dhaka",
    zip: "1212",
  },
];

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const location = useLocation();

  const computedSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totals = useMemo(
    () => ({
      subtotal: computedSubtotal,
      shipping: 0,
      discount: 0,
      payable: computedSubtotal,
    }),
    [computedSubtotal]
  );


  const [addresses, setAddresses] = useState(initialAddresses);
  const [selectedAddress, setSelectedAddress] = useState(
    initialAddresses[0]?.id || null
  );
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [form] = Form.useForm();

  const hasAddress = addresses.length > 0;

  const handleAddAddress = () => {
    form
      .validateFields()
      .then((values) => {
        const newAddr = {
          id: `addr-${Date.now()}`,
          label: values.label || "New",
          name: values.name,
          phone: values.phone,
          line1: values.line1,
          city: values.city,
          zip: values.zip,
        };
        const next = [...addresses, newAddr];
        setAddresses(next);
        setSelectedAddress(newAddr.id);
        setIsAddModalOpen(false);
        form.resetFields();
        message.success("Address added");
      })
      .catch(() => {});
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      message.error("Please select an address");
      return;
    }
    if (!paymentMethod) {
      message.error("Please select a payment method");
      return;
    }
    message.success("Order placed!");
  };

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQty({ id, qty: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQty({ id, qty: currentQty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const cartSummary = (
    <Card title="Your Items">
      {cartItems.length === 0 ? (
        <Text type="secondary">Cart empty</Text>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Space key="qtyctrl" size={4}>
                  <Button
                    size="small"
                    icon={<MinusOutlined />}
                    onClick={() => handleDecrease(item.id, item.qty)}
                    disabled={item.qty <= 1}
                  />
                  <Text style={{ minWidth: 20, textAlign: "center" }}>
                    {item.qty}
                  </Text>
                  <Button
                    size="small"
                    icon={<PlusOutlined />}
                    onClick={() => handleIncrease(item.id, item.qty)}
                  />
                </Space>,
                <Text key="line" strong>
                  ৳{(item.price * item.qty).toFixed(2)}
                </Text>,
                <Popconfirm
                  key="del"
                  title="Remove this item?"
                  onConfirm={() => handleRemove(item.id)}
                >
                  <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: 56,
                      height: 56,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                }
                title={item.name}
                description={
                  <Text type="secondary">Unit: ৳{item.price.toFixed(2)}</Text>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <Title level={3}>Checkout</Title>

      {cartSummary}

      <Card
        title="Order Summary"
        extra={<Tag color="orange">Pay ৳{totals.payable.toFixed(2)}</Tag>}
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <Space justify="space-between" style={{ width: "100%" }}>
            <Text>Subtotal</Text>
            <Text>৳{totals.subtotal.toFixed(2)}</Text>
          </Space>
          <Space justify="space-between" style={{ width: "100%" }}>
            <Text>Shipping</Text>
            <Text>৳{totals.shipping.toFixed(2)}</Text>
          </Space>
          <Space justify="space-between" style={{ width: "100%" }}>
            <Text>Discount</Text>
            <Text type="success">- ৳{totals.discount.toFixed(2)}</Text>
          </Space>
          <Divider style={{ margin: "8px 0" }} />
          <Space justify="space-between" style={{ width: "100%" }}>
            <Title level={5} style={{ margin: 0 }}>
              Payable
            </Title>
            <Title level={5} style={{ margin: 0 }}>
              ৳{totals.payable.toFixed(2)}
            </Title>
          </Space>
        </Space>
      </Card>

      <Card
        title="Delivery Address"
        extra={
          <Button type="primary" onClick={() => setIsAddModalOpen(true)}>
            + Add new
          </Button>
        }
      >
        {hasAddress ? (
          <Radio.Group
            style={{ width: "100%" }}
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
          >
            <Space direction="vertical" style={{ width: "100%" }}>
              {addresses.map((addr) => (
                <Card
                  key={addr.id}
                  size="small"
                  style={{ width: "100%" }}
                  bodyStyle={{ padding: 12 }}
                  onClick={() => setSelectedAddress(addr.id)}
                  hoverable
                >
                  <Space align="start">
                    <Radio value={addr.id} />
                    <Space direction="vertical" size={2}>
                      <Space size="small">
                        <Text strong>{addr.label}</Text>
                        <Tag>{addr.city}</Tag>
                      </Space>
                      <Text>{addr.name}</Text>
                      <Text type="secondary">{addr.phone}</Text>
                      <Text type="secondary">
                        {addr.line1}, {addr.city} - {addr.zip}
                      </Text>
                    </Space>
                  </Space>
                </Card>
              ))}
            </Space>
          </Radio.Group>
        ) : (
          <Space direction="vertical">
            <Text type="secondary">No address added.</Text>
            <Button type="dashed" onClick={() => setIsAddModalOpen(true)}>
              + Add Address
            </Button>
          </Space>
        )}
      </Card>

      <Card title="Payment Method">
        <Select
          value={paymentMethod}
          options={paymentOptions}
          onChange={setPaymentMethod}
          style={{ width: 260 }}
        />
      </Card>

      <Space style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button type="primary" size="large" onClick={handlePlaceOrder}>
          Pay ৳{totals.payable.toFixed(2)}
        </Button>
      </Space>

      <Modal
        title="Add new address"
        open={isAddModalOpen}
        onOk={handleAddAddress}
        onCancel={() => setIsAddModalOpen(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Label" name="label">
            <Input placeholder="Home / Office" />
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Name required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Phone required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address Line"
            name="line1"
            rules={[{ required: true, message: "Address required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "City required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ZIP/Postal"
            name="zip"
            rules={[{ required: true, message: "ZIP required" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  );
};

export default CheckoutPage;