import React, { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  Descriptions,
  Typography,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Spin,
  Popconfirm,
  Upload,
} from "antd";
import { useAuth } from "../../../hooks/useAuth";
import { useLocalStorage } from "../../../utils/useLocalStorage";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";
import { uploadFileToCloudinary } from "../../../../api/services/cloudinaryService";

const { Title, Text } = Typography;

interface Profile {
  documentId: string;
  avatar: string;
  email: string;
  username: string;
  name: string;
  role: string;
  isAuthenticated: boolean;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { getProfile, updateProfile, deleteProfile } = useAuth(); // Include logout here
  const { getLocalStorage } = useLocalStorage();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const storedAuth = getLocalStorage("auth");
      if (storedAuth) {
        const fetchedProfile: any = await getProfile(storedAuth.id);
        setProfile(fetchedProfile);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    try {
      const updatedData = form.getFieldsValue();
      if (file) {
        const uploadedFile = await uploadFileToCloudinary(file, "avatars");
        updatedData.avatar = uploadedFile.secure_url; // Use the returned URL from Cloudinary
      }

      if (profile) {
        await updateProfile(profile.documentId, updatedData);
        message.success("Profile updated successfully");
        fetchProfile(); // Refresh the profile data after update
        setEditModalVisible(false);
        setAvatarPreview(null); // Reset the avatar preview
        setFile(null); // Clear the file state
      }
    } catch (error) {
      message.error("Error updating profile");
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    try {
      if (profile) {
        await deleteProfile(profile.documentId);
        message.success("Profile deleted successfully");
      }
    } catch (error) {
      message.error("Error deleting profile");
      console.error("Error deleting profile:", error);
    }
  };

  const handleFileChange = (info: any) => {
    const fileObj = info.file.originFileObj;
    if (fileObj) {
      setFile(fileObj); // Save the file object

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string); // Set the preview URL
      };
      reader.readAsDataURL(fileObj); // Read the file as a data URL
    }
  };

  const handleModalOpen = () => {
    form.resetFields(); // Reset form fields
    setFile(null); // Clear the file state
    setAvatarPreview(null); // Clear avatar preview
    setEditModalVisible(true);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("auth");
      message.success("Logged out successfully");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
      // Optionally, redirect to login page or perform other actions
    } catch (error) {
      message.error("Error logging out");
      console.error("Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data available</div>;
  }

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <Space direction="vertical" align="center" style={{ width: "100%" }}>
        <Avatar size={120} src={profile.avatar} />
        <Title level={3}>{profile.name}</Title>
        <Text type="secondary">@{profile.username}</Text>
      </Space>
      <Descriptions
        title="User Information"
        bordered
        column={1}
        style={{ marginTop: 24 }}
      >
        <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
        <Descriptions.Item label="Role">{profile.role}</Descriptions.Item>
        <Descriptions.Item label="Authenticated">
          {profile.isAuthenticated ? "Yes" : "No"}
        </Descriptions.Item>
      </Descriptions>
      <Space
        style={{ marginTop: 24, display: "flex", justifyContent: "center" }}
      >
        <Button type="primary" onClick={handleModalOpen}>
          Edit Profile
        </Button>
        <Popconfirm
          title="Are you sure you want to delete this profile?"
          onConfirm={handleDelete}
          okText="Yes"
          cancelText="No"
        >
          <Button danger>Delete Profile</Button>
        </Popconfirm>
        <Button type="default" onClick={handleLogout}>
          Logout
        </Button>
      </Space>

      {/* Edit Profile Modal */}
      <Modal
        title="Edit Profile"
        visible={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        onOk={handleEdit}
        okButtonProps={{ disabled: loading }} // Disable the button while loading
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: profile.name,
            username: profile.username,
            email: profile.email,
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Avatar">
            <Space
              direction="vertical"
              style={{ display: "flex", alignItems: "center" }}
            >
              <Avatar
                size={120}
                src={avatarPreview || profile.avatar || <UserOutlined />}
              />
              <Upload
                beforeUpload={() => false} // Prevent auto upload
                onChange={handleFileChange}
                showUploadList={false}
                accept="image/*" // Ensure only image files are accepted
              >
                <Button icon={<UploadOutlined />}>Upload New Avatar</Button>
              </Upload>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProfilePage;
