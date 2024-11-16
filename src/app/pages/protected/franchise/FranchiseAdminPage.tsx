import { useEffect, useState } from "react";
import { useFranchise } from "../../../hooks/useFranchise";
import { Modal, Button, Form, Input, Table, Popconfirm } from "antd"; // Importing Ant Design components

const FranchiseAdminPage = () => {
  const { getFranchises, createFranchise, updateFranchise, deleteFranchise } =
    useFranchise();
  const [franchises, setFranchises] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedFranchise, setSelectedFranchise] = useState<any>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchFranchises();
  }, []); // Added dependency array to run effect only on mount

  const fetchFranchises = async () => {
    try {
      const result: any = await getFranchises();
      setFranchises(result);
      console.log(result);
    } catch (error) {
      console.error("Error fetching franchises:", error);
    }
  };

  const handleCreateFranchise = async (values: any) => {
    try {
      if (editMode) {
        await updateFranchise(selectedFranchise.documentId, {
          ...selectedFranchise,
          ...values,
        });
      } else {
        await createFranchise(values);
      }
      setModalVisible(false);
      form.resetFields();
      fetchFranchises(); // Refresh the franchise list
    } catch (error) {
      console.error("Error saving franchise:", error);
    }
  };

  const handleEditFranchise = (franchise: any) => {
    setSelectedFranchise(franchise);
    setEditMode(true);
    form.setFieldsValue(franchise); // Pre-fill form fields with franchise data
    setModalVisible(true);
  };

  const handleDeleteFranchise = async (documentId: string) => {
    try {
      await deleteFranchise(documentId);
      fetchFranchises(); // Refresh the franchise list
    } catch (error) {
      console.error("Error deleting franchise:", error);
    }
  };

  // Define the columns for the table
  const columns = [
    {
      title: "Franchise Name",
      dataIndex: "franchiseName",
      key: "franchiseName",
    },
    {
      title: "Email",
      dataIndex: ["contactDetails", "email"],
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: ["contactDetails", "phone"],
      key: "phone",
    },
    {
      title: "Established Year",
      dataIndex: "establishedYear",
      key: "establishedYear",
    },
    {
      title: "Location",
      dataIndex: ["location", "city"],
      key: "city",
    },
    {
      title: "Number of Employees",
      dataIndex: "numberOfEmployees",
      key: "numberOfEmployees",
    },
    {
      title: "Annual Revenue",
      dataIndex: "annualRevenue",
      key: "annualRevenue",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button onClick={() => handleEditFranchise(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this franchise?"
            onConfirm={() => handleDeleteFranchise(record.documentId)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ marginLeft: 8 }} danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-800 mb-4 ">Franchises</h1>
      <div className="flex gap-2 mb-4 justify-end">
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
            setEditMode(false);
            form.resetFields();
          }}
        >
          Add Store
        </Button>
      </div>

      <div>
        <Table dataSource={franchises} columns={columns} rowKey="documentId" />
      </div>

      <Modal
        title={editMode ? "Edit Franchise" : "Add Franchise"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateFranchise}>
          <Form.Item
            name="franchiseName"
            label="Franchise Name"
            rules={[
              { required: true, message: "Please enter franchise name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["contactDetails", "email"]}
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please enter a valid email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["contactDetails", "phone"]}
            label="Phone"
            rules={[
              { required: true, message: "Please enter a phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="establishedYear"
            label="Established Year"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter established year!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name={["location", "state"]}
            label="State"
            rules={[{ required: true, message: "Please enter state!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["location", "city"]}
            label="City"
            rules={[{ required: true, message: "Please enter city!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["location", "postalCode"]}
            label="Postal Code"
            rules={[{ required: true, message: "Please enter postal code!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["location", "address"]}
            label="Address"
            rules={[{ required: true, message: "Please enter address!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["location", "country"]}
            label="Country"
            rules={[{ required: true, message: "Please enter country!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="numberOfEmployees"
            label="Number of Employees"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter number of employees!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="annualRevenue"
            label="Annual Revenue"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter annual revenue!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="ownerName"
            label="Owner Name"
            rules={[{ required: true, message: "Please enter owner name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editMode ? "Update Franchise" : "Add Franchise"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FranchiseAdminPage;
