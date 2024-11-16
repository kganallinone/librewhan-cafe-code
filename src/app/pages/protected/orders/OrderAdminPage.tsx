import { useEffect, useState } from "react";
import {
  Table,
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Select,
  Card,
  Col,
  Row,
} from "antd";
import { useOrders } from "../../../hooks/useOrders";

const { Option } = Select;

export const OrderAdminPage = () => {
  const { getOrders, updateOrder, deleteOrder } = useOrders();
  const [orders, setOrders] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const result: any = await getOrders();
      console.log(result);
      const formattedOrders = result.map((order: any) => ({
        id: order.documentId,
        customerName: order.customer.name,
        totalAmount: order.totalAmount,
        status: order.status,
        createdAt: order.createdAt,
        items: order.items,
      }));
      setOrders(formattedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleEdit = (order: any) => {
    setSelectedOrder(order);
    form.setFieldsValue({
      status: order.status,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      message.success(`Deleted order ${id}`);
      fetchOrders();
    } catch (error) {
      console.error("Failed to delete order:", error);
      message.error("Failed to delete order");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const updatedOrder = {
        ...selectedOrder,
        items: selectedOrder.items, // Keep items unchanged
        status: values.status,
      };

      await updateOrder(selectedOrder.id, updatedOrder);
      message.success(`Updated order ${updatedOrder.id}`);
      setIsModalVisible(false);
      fetchOrders();
    } catch (error) {
      console.error("Failed to update order:", error);
      message.error("Failed to update order");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount: number) => `Php ${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: any) => new Date(date.seconds * 1000).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <span>
          <Button onClick={() => handleEdit(record)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this order?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <Table dataSource={orders} columns={columns} rowKey="id" />

      <Modal
        title="Edit Order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please select the status!" }]}
          >
            <Select placeholder="Select a status">
              <Option value="pending">Pending</Option>
              <Option value="completed">Completed</Option>
              <Option value="canceled">Canceled</Option>
            </Select>
          </Form.Item>

          <h3>Items:</h3>
          <Row gutter={16}>
            {selectedOrder?.items.map((item: any, index: number) => (
              <Col span={12} key={index}>
                <Card title={item.name} bordered={true}>
                  <p>Category: {item.category}</p>
                  <p>Variant: {item.variant}</p>
                  <p>Price: Php {item.price.toFixed(2)}</p>
                  <p>Quantity: {item.quantity}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </Form>
      </Modal>
    </div>
  );
};
