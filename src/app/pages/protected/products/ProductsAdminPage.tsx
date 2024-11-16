import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Table,
  Form,
  Input,
  Carousel,
  Upload,
  message,
  Select,
} from "antd";
import {
  PlusOutlined,
  MinusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useProduct } from "../../../hooks/useProduct";
import { uploadFileToCloudinary } from "../../../../api/services/cloudinaryService";

interface Product {
  id?: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
  description?: string;
  photos?: string[];
  variants: Variant[];
  quantity: number;
  status: string;
}

interface Variant {
  name?: string;
  price?: number;
  quantity?: number;
  size?: string;
  color?: string;
  photos: string[];
}

const ProductsAdminPage = () => {
  const { getProducts, createProduct, updateProduct, deleteProduct } =
    useProduct();
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    subcategory: "",
    quantity: 1,
    status: "active",
    description: "",
    photos: [],
    variants: [],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response: any = await getProducts();
      console.log(response);
      setProducts(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const showModal = (product?: Product) => {
    if (product) {
      setNewProduct(product);
      setEditingProduct(product);
    } else {
      setNewProduct({
        name: "",
        price: 0,
        category: "",
        subcategory: "",
        quantity: 1,
        status: "active",
        description: "",
        photos: [],
        variants: [],
      });
      setEditingProduct(null);
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      if (editingProduct) {
        // Update existing product
        await updateProduct(editingProduct.id!, newProduct);
      } else {
        // Create new product
        await createProduct(newProduct);
      }
      fetchProducts(); // Refresh product list
      setIsModalVisible(false);
      setNewProduct({
        name: "",
        price: 0,
        category: "",
        subcategory: "",
        quantity: 1,
        status: "active",
        description: "",
        photos: [],
        variants: [],
      });
    } catch (error) {
      console.error("Error creating/updating product:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      variants: updatedVariants,
    }));
  };

  const addVariant = () => {
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      variants: [
        ...prevProduct.variants,
        { name: "", price: 0, quantity: 1, photos: [] },
      ],
    }));
  };

  const removeVariant = (index: number) => {
    const updatedVariants = newProduct.variants.filter((_, i) => i !== index);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      variants: updatedVariants,
    }));
  };

  const handlePhotoUpload = async (file: any, variantIndex?: number) => {
    try {
      const uploadResponse = await uploadFileToCloudinary(
        file,
        "product-photos"
      );
      const photoUrl = uploadResponse.secure_url;

      if (variantIndex !== undefined) {
        // Add photo to the variant
        const updatedVariants = [...newProduct.variants];
        updatedVariants[variantIndex].photos = [
          ...updatedVariants[variantIndex].photos,
          photoUrl,
        ];

        setNewProduct((prevProduct) => ({
          ...prevProduct,
          variants: updatedVariants,
        }));
      } else {
        // Add photo to the main product
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          photos: [...prevProduct.photos!, photoUrl],
        }));
      }

      message.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("Error uploading photo:", error);
      message.error("Failed to upload photo.");
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      fetchProducts(); // Refresh product list after deletion
      message.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      message.error("Failed to delete product.");
    }
  };

  const columns = [
    {
      title: "Photos",
      dataIndex: "photos",
      key: "photos",
      render: (photos: string[]) => (
        <Carousel autoplay className="w-40" dotPosition="top">
          {(photos ?? []).map((photo, index) => (
            <div key={index}>
              <img
                src={photo}
                alt={`Product Image ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </Carousel>
      ),
    },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Subcategory", dataIndex: "subcategory", key: "subcategory" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <div>
          <Button
            type="primary"
            onClick={() => showModal(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id!)} danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-hidden">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <div className="text-right">
        <Button type="primary" className="mb-4" onClick={() => showModal()}>
          Add Product
        </Button>
      </div>

      <Table
        dataSource={products}
        columns={columns}
        pagination={false}
        className="overflow-y-auto h-[780px]"
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Form layout="vertical">
          <Form.Item label="Product Name">
            <Input
              name="name"
              value={newProduct.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Price">
            <Input
              name="price"
              type="number"
              value={newProduct.price}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              name="description"
              value={newProduct.description}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Category">
            <Select
              defaultValue="hot coffee"
              options={[
                { value: "Hot Coffee", label: <span>Hot Coffee</span> },
                { value: "Iced Coffee", label: <span>Iced Coffee</span> },
                { value: "Milktea", label: <span>Milktea</span> },
                { value: "Fruit Tea", label: <span>Fruit Tea</span> },
                { value: "Quick Bites", label: <span>Quick Bites</span> },
                { value: "Combo", label: <span>Combo</span> },
              ]}
              value={newProduct.category}
              onChange={(value) =>
                setNewProduct((prev) => ({ ...prev, category: value }))
              }
            />
          </Form.Item>
          <Form.Item label="Subcategory">
            <Select
              options={[
                { value: "normal", label: <span>Normal</span> },
                { value: "b1t1", label: <span>Buy 1 Take 1</span> },
              ]}
              value={newProduct.subcategory}
              defaultValue={"normal"}
              onChange={(value) =>
                setNewProduct((prev) => ({ ...prev, subcategory: value }))
              }
            />
          </Form.Item>

          <Form.Item label="Upload Product Photos">
            <Upload
              customRequest={({ file }) => handlePhotoUpload(file)}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          <h3>Variants</h3>
          {newProduct.variants.map((variant, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <Form.Item label="Variant Name">
                <Input
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Variant Price">
                <Input
                  type="number"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Variant Quantity">
                <Input
                  type="number"
                  value={variant.quantity}
                  onChange={(e) =>
                    handleVariantChange(index, "quantity", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Size">
                <Input
                  value={variant.size}
                  onChange={(e) =>
                    handleVariantChange(index, "size", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Color">
                <Input
                  value={variant.color}
                  onChange={(e) =>
                    handleVariantChange(index, "color", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item label="Upload Variant Photos">
                <Upload
                  customRequest={({ file }) => handlePhotoUpload(file, index)}
                  listType="picture"
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Button
                icon={<MinusCircleOutlined />}
                onClick={() => removeVariant(index)}
              >
                Remove Variant
              </Button>
            </div>
          ))}
          <Button
            icon={<PlusOutlined />}
            type="dashed"
            onClick={addVariant}
            style={{ width: "100%" }}
          >
            Add Variant
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductsAdminPage;
