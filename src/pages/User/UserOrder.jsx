import React, { useEffect, useMemo, useState } from "react";
import { Tabs, Tag, Table, Space, Button, Timeline, Typography } from "antd";

const { Text } = Typography;

const statusTag = {
  processing: <Tag color="gold">Processing</Tag>,
  shipped: <Tag color="blue">Shipped</Tag>,
  delivered: <Tag color="green">Delivered</Tag>,
  cancelled: <Tag color="red">Cancelled</Tag>,
};

const columns = [
  { title: "Order ID", dataIndex: "id", key: "id" },
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Items", dataIndex: "itemCount", key: "itemCount" },
  { title: "Total", dataIndex: "total", key: "total" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (value) => statusTag[value],
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <Space>
        <Button size="small" type="link">
          Invoice
        </Button>
        {record.status === "delivered" && (
          <Button size="small" type="link">
            Re-order
          </Button>
        )}
        {record.status === "processing" && (
          <Button size="small" danger>
            Cancel
          </Button>
        )}
      </Space>
    ),
  },
];

const mockData = [
  {
    id: "ORD-1001",
    date: "2026-02-01",
    total: "$120.00",
    status: "processing",
    itemCount: 3,
    timeline: [
      { label: "Order placed", time: "2026-02-01 09:10", color: "green" },
      { label: "Payment confirmed", time: "2026-02-01 09:12", color: "green" },
      { label: "Packaging", time: "2026-02-01 11:05", color: "blue" },
      { label: "Awaiting pickup", time: "—", color: "gray" },
    ],
    shipping: { carrier: "DHL", tracking: "DHL-9834521", eta: "2026-02-05" },
    items: [
      { name: "Wireless Mouse", qty: 1 },
      { name: "Keyboard", qty: 1 },
      { name: "USB-C Cable", qty: 1 },
    ],
  },
  {
    id: "ORD-1002",
    date: "2026-01-28",
    total: "$89.00",
    status: "delivered",
    itemCount: 2,
    timeline: [
      { label: "Order placed", time: "2026-01-28 08:22", color: "green" },
      { label: "Payment confirmed", time: "2026-01-28 08:24", color: "green" },
      { label: "Shipped", time: "2026-01-28 12:10", color: "green" },
      { label: "Out for delivery", time: "2026-01-29 09:15", color: "green" },
      { label: "Delivered", time: "2026-01-29 14:05", color: "green" },
    ],
    shipping: { carrier: "FedEx", tracking: "FDX-552210", eta: "Delivered" },
    items: [
      { name: "Bluetooth Speaker", qty: 1 },
      { name: "Gift Wrap", qty: 1 },
    ],
  },
  {
    id: "ORD-1003",
    date: "2026-01-25",
    total: "$45.00",
    status: "cancelled",
    itemCount: 1,
    timeline: [
      { label: "Order placed", time: "2026-01-25 10:05", color: "green" },
      { label: "Payment pending", time: "—", color: "red" },
      { label: "Cancelled", time: "2026-01-25 12:00", color: "red" },
    ],
    shipping: { carrier: "-", tracking: "-", eta: "-" },
    items: [{ name: "USB Hub", qty: 1 }],
  },
  {
    id: "ORD-1004",
    date: "2026-01-20",
    total: "$210.00",
    status: "shipped",
    itemCount: 5,
    timeline: [
      { label: "Order placed", time: "2026-01-20 07:50", color: "green" },
      { label: "Payment confirmed", time: "2026-01-20 07:52", color: "green" },
      { label: "Shipped", time: "2026-01-20 16:30", color: "blue" },
      { label: "In transit", time: "2026-01-21 09:00", color: "blue" },
      { label: "Out for delivery", time: "—", color: "gray" },
    ],
    shipping: { carrier: "UPS", tracking: "1Z-4455X", eta: "2026-01-23" },
    items: [
      { name: "Laptop Stand", qty: 1 },
      { name: "HDMI Cable", qty: 2 },
      { name: "Mouse Pad", qty: 2 },
    ],
  },
];

const MyOrders = () => {
  const [activeKey, setActiveKey] = useState("all");

  const filtered = useMemo(() => {
    if (activeKey === "all") return mockData;
    return mockData.filter((o) => o.status === activeKey);
  }, [activeKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const table = (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={filtered}
      expandable={{
        expandedRowRender: (record) => (
          <div style={{ margin: 0, paddingInline: 12 }}>
            <Space direction="vertical" size="small" style={{ width: "100%" }}>
              <Text strong>Shipping</Text>
              <div>
                <Text type="secondary">Carrier: </Text>
                <Text>{record.shipping.carrier}</Text>
                <br />
                <Text type="secondary">Tracking: </Text>
                <Text>{record.shipping.tracking}</Text>
                <br />
                <Text type="secondary">ETA: </Text>
                <Text>{record.shipping.eta}</Text>
              </div>

              <Text strong>Items</Text>
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {record.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} &times; {item.qty}
                  </li>
                ))}
              </ul>

              <Text strong>Timeline</Text>
              <Timeline
                items={record.timeline.map((step) => ({
                  color: step.color,
                  children: (
                    <div>
                      <Text strong>{step.label}</Text>
                      <div>
                        <Text type="secondary">{step.time}</Text>
                      </div>
                    </div>
                  ),
                }))}
              />
            </Space>
          </div>
        ),
      }}
    />
  );

  return (
    <Tabs
      activeKey={activeKey}
      onChange={setActiveKey}
      items={[
        { key: "all", label: "All", children: table },
        { key: "processing", label: "Processing", children: table },
        { key: "shipped", label: "Shipped", children: table },
        { key: "delivered", label: "Delivered", children: table },
        { key: "cancelled", label: "Cancelled", children: table },
      ]}
    />
  );
};

export default MyOrders;