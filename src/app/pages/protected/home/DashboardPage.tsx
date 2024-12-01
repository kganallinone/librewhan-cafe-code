import React, { useEffect, useState } from "react";
import { useOrders } from "../../../hooks/useOrders";
import { useFranchise } from "../../../hooks/useFranchise";
import { useProduct } from "../../../hooks/useProduct";
import { Card, Row, Col, Statistic, List, Typography } from "antd";
import { ChatBotFab } from "../../../components/fab/ChatBotFab";

const { Title } = Typography;

const DashboardPage: React.FC = () => {
  const { getOrders } = useOrders();
  const { getFranchises } = useFranchise();
  const { getProducts } = useProduct();

  const [orders, setOrders] = useState<any[]>([]);
  const [franchises, setFranchises] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const ordersData: any = await getOrders();
      const franchisesData: any = await getFranchises();
      const productsData: any = await getProducts();

      setOrders(ordersData);
      setFranchises(franchisesData);
      setProducts(productsData);
      calculateTotalRevenue(ordersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const calculateTotalRevenue = (ordersData: any[]) => {
    const revenue = ordersData.reduce(
      (total, order) => total + order.totalAmount,
      0
    );
    setTotalRevenue(revenue);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}

      {/* Main content */}
      <div className="flex-1 p-6">
        <Title level={2}>Dashboard</Title>

        <Row gutter={16} style={{ marginBottom: 24 }}>
          <Col span={8}>
            <Card>
              <Statistic title="Total Orders" value={orders.length} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic
                title="Total Revenue"
                value={totalRevenue}
                prefix="Php"
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Total Franchises" value={franchises.length} />
            </Card>
          </Col>
        </Row>

        <Title level={3}>Recent Orders</Title>
        <List
          bordered
          dataSource={orders}
          renderItem={(order) => (
            <List.Item>
              <List.Item.Meta
                title={`Order ID: ${order.id}`}
                description={`Customer: ${order.customer.name}, Status: ${order.status}`}
              />
              <div>Total Amount: Php {order.totalAmount}</div>
            </List.Item>
          )}
        />

        <Title level={3} style={{ marginTop: 24 }}>
          Franchise Information
        </Title>
        <List
          bordered
          dataSource={franchises}
          renderItem={(franchise) => (
            <List.Item>
              <List.Item.Meta
                title={franchise.franchiseName}
                description={`Owner: ${franchise.ownerName}, Location: ${franchise.location.city}, ${franchise.location.state}`}
              />
              <div>Annual Revenue: Php {franchise.annualRevenue}</div>
            </List.Item>
          )}
        />

        <Title level={3} style={{ marginTop: 24 }}>
          Product Availability
        </Title>
        <List
          bordered
          dataSource={products}
          renderItem={(product) => (
            <List.Item>
              <List.Item.Meta
                title={product.name}
                description={`Category: ${product.category}, Price: Php ${product.price}, Status: ${product.status}`}
              />
              <div>Variants Available: {product.variants.length}</div>
            </List.Item>
          )}
        />
      </div>
      <ChatBotFab />
    </div>
  );
};

export default DashboardPage;
