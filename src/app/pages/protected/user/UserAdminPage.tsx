import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import {
  Modal,
  Button,
  Form,
  Input,
  Table,
  Popconfirm,
  Avatar,
  Upload,
  message,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFileToCloudinary } from "../../../../api/services/cloudinaryService";

const UserAdminPage = () => {
  const { getProfiles, signup, updateProfile, deleteProfile } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // State to hold the uploaded file
  const [uploading, setUploading] = useState(false); // State for upload progress
  const [avatarUrl, setAvatarUrl] = useState<string>(""); // State for the avatar URL

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result: any = await getProfiles();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCreateOrUpdateUser = async (values: any) => {
    try {
      let finalAvatarUrl = avatarUrl || selectedUser?.avatar || ""; // Keep existing avatar URL if not changing

      // Check if there's a new avatar file to upload
      if (avatarFile) {
        setUploading(true); // Set uploading state to true
        const uploadResult = await uploadFileToCloudinary(
          avatarFile,
          "avatars"
        );
        finalAvatarUrl = uploadResult.secure_url; // Get the uploaded file's URL
        setUploading(false); // Upload completed
      }

      const userData = { ...values, avatar: finalAvatarUrl }; // Merge avatar URL with form data

      if (editMode) {
        await updateProfile(selectedUser.documentId, {
          ...selectedUser,
          ...userData,
        });
      } else {
        await signup(userData);
      }

      setModalVisible(false);
      form.resetFields();
      setAvatarUrl(""); // Reset avatarUrl
      setAvatarFile(null); // Reset the file
      fetchUsers(); // Refresh the user list
    } catch (error) {
      setUploading(false); // In case of error, reset uploading state
      console.error("Error saving user:", error);
      message.error("Error saving user. Please try again.");
    }
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setEditMode(true);
    form.setFieldsValue(user);
    setAvatarUrl(user.avatar || ""); // Pre-fill the avatar in the modal
    setModalVisible(true);
  };

  const handleDeleteUser = async (documentId: string) => {
    try {
      await deleteProfile(documentId);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (avatar: string) => <Avatar src={avatar} />,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Authenticated",
      dataIndex: "isAuthenticated",
      key: "isAuthenticated",
      render: (isAuthenticated: boolean) => (isAuthenticated ? "Yes" : "No"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: any) => (
        <>
          <Button onClick={() => handleEditUser(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record.documentId)}
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

  const handleFileChange = (info: any) => {
    const file = info.file.originFileObj;
    setAvatarFile(file); // Set the uploaded file to state
    setAvatarUrl(URL.createObjectURL(file)); // Create a preview URL
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User</h1>
      <div className="mb-4 flex justify-end">
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
            setEditMode(false);
            form.resetFields();
            setAvatarUrl(""); // Clear avatar URL when adding new user
          }}
        >
          Add User
        </Button>
      </div>

      <div>
        <Table dataSource={users} columns={columns} rowKey="documentId" />
      </div>

      <Modal
        title={editMode ? "Edit User" : "Add User"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreateOrUpdateUser}>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true, message: "Please enter username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
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
            name="password"
            label="Password"
            rules={[{ required: !editMode, message: "Please enter password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Role"
            rules={[{ required: true, message: "Please enter role!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Avatar">
            <Space direction="vertical">
              {avatarUrl && <Avatar size={64} src={avatarUrl} />}{" "}
              {/* Show uploaded avatar */}
              <Upload
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </Space>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={uploading}>
              {uploading
                ? "Uploading..."
                : editMode
                ? "Update User"
                : "Add User"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserAdminPage;
