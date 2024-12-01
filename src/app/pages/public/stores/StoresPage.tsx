import { Form, Input, InputNumber, Button } from "antd";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import { useFranchise } from "../../../hooks/useFranchise";
import { ChatBotFab } from "../../../components/fab/ChatBotFab";

const StoresPage = () => {
  const { createFranchise } = useFranchise();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      await createFranchise(values);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Store Section */}
      <section id="stores" className="mb-24 scroll-smooth">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-12 text-center">
          Our Store Locations
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Store Locations */}
          <div className="bg-white shadow-lg p-8 rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              LIBREWHAN CAFE BANKERS VILLAGE, CALOOCAN
            </h3>
            <p className="flex items-center mb-3 text-gray-700">
              <FaMapMarkerAlt className="text-teal-500 mr-2" />
              Lot 11 Block 2 Quirino Highway Bankers Village 2, North Caloocan
            </p>
            <p className="flex items-center mb-3 text-gray-700">
              <FaPhoneAlt className="text-teal-500 mr-2" />
              0981 725 1782 or 8642 0110
            </p>
            <p className="flex items-center text-gray-700">
              <FaEnvelope className="text-teal-500 mr-2" />
              <a
                href="mailto:librewhancafecaloocan@gmail.com"
                className="text-teal-500 hover:underline"
              >
                librewhancafecaloocan@gmail.com
              </a>
            </p>
          </div>

          {/* Store Locations */}
          <div className="bg-white shadow-lg p-8 rounded-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-semibold text-teal-600 mb-4">
              LIBREWHAN CAFE LAGRO, QUEZON CITY
            </h3>
            <p className="flex items-center mb-3 text-gray-700">
              <FaMapMarkerAlt className="text-teal-500 mr-2" />
              B59 L3 La Naval Street Lagro Subdivision, Quezon City
            </p>
            <p className="flex items-center mb-3 text-gray-700">
              <FaPhoneAlt className="text-teal-500 mr-2" />
              0931 096 4514 or 8255 7057
            </p>
            <p className="flex items-center text-gray-700">
              <FaEnvelope className="text-teal-500 mr-2" />
              <a
                href="mailto:librewhancafelagro@gmail.com"
                className="text-teal-500 hover:underline"
              >
                librewhancafelagro@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Franchise Section */}
      <section className="mt-16" id="franchise">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
          Franchise With Us
        </h2>
        <p className="text-lg text-gray-600 mb-10 text-center">
          If you're a business owner and want to join our family, fill out the
          form below to start your franchise journey!
        </p>
        <div className="max-w-lg mx-auto bg-white shadow-lg p-8 rounded-lg">
          <Form onFinish={onFinish}>
            <Form.Item
              label="Franchise Name"
              name="franchiseName"
              rules={[
                { required: true, message: "Please enter franchise name!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Owner Name"
              name="ownerName"
              rules={[{ required: true, message: "Please enter owner name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address"
              name={["location", "address"]}
              rules={[{ required: true, message: "Please enter address!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="City"
              name={["location", "city"]}
              rules={[{ required: true, message: "Please enter city!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="State"
              name={["location", "state"]}
              rules={[{ required: true, message: "Please enter state!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Postal Code"
              name={["location", "postalCode"]}
              rules={[{ required: true, message: "Please enter postal code!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Country"
              name={["location", "country"]}
              rules={[{ required: true, message: "Please enter country!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Established Year"
              name="establishedYear"
              rules={[
                { required: true, message: "Please enter established year!" },
              ]}
            >
              <InputNumber
                min={1900}
                max={new Date().getFullYear()}
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Number of Employees"
              name="numberOfEmployees"
              rules={[
                {
                  required: true,
                  message: "Please enter number of employees!",
                },
              ]}
            >
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Annual Revenue"
              name="annualRevenue"
              rules={[
                { required: true, message: "Please enter annual revenue!" },
              ]}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Contact Phone"
              name={["contactDetails", "phone"]}
              rules={[
                { required: true, message: "Please enter contact phone!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Contact Email"
              name={["contactDetails", "email"]}
              rules={[
                { required: true, message: "Please enter contact email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-teal-600 hover:bg-teal-700"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
      <ChatBotFab />
    </div>
  );
};

export default StoresPage;
