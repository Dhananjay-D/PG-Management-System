import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useFirebase } from "../../context/firebase";
import { collection, getDocs } from "firebase/firestore";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import moment from "moment";

const ViewClient = () => {
  const { db } = useFirebase();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "clients"));
        const clients = querySnapshot.docs.map((doc) => ({
          key: doc.id, // Use Firestore document ID as the key
          ...doc.data(),
        }));
        setData(clients);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clients: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [db]);

  const showEditModal = (client) => {
    setEditingClient(client);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...client,
      checkInDate: moment(client.checkInDate),
      checkOutDate: moment(client.checkOutDate),
    });
  };

  const handleEdit = async (values) => {
    try {
      const updatedClient = {
        ...values,
        checkInDate: values.checkInDate.format("YYYY-MM-DD"),
        checkOutDate: values.checkOutDate.format("YYYY-MM-DD"),
      };

      await updateDoc(doc(db, "clients", editingClient.key), updatedClient);

      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingClient.key
            ? {
                ...item,
                ...updatedClient,
                checkInDate: values.checkInDate,
                checkOutDate: values.checkOutDate,
              }
            : item
        )
      );

      setIsModalVisible(false);
      setEditingClient(null);
      toast.success("Client updated successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating client: ", error);
      toast.error("Error updating client");
    }
  };

  const handleDelete = async (clientKey) => {
    try {
      await deleteDoc(doc(db, "clients", clientKey));
      setData((prevData) => prevData.filter((item) => item.key !== clientKey));
      toast.success("Client deleted successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error deleting client: ", error);
      toast.error("Error deleting client");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Deposit Amount",
      dataIndex: "depositAmount",
      key: "depositAmount",
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
    },
    {
      title: "Check-in",
      dataIndex: "checkInDate",
      key: "checkInDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "Check-out",
      dataIndex: "checkOutDate",
      key: "checkOutDate",
      render: (text) => (text ? moment(text).format("YYYY-MM-DD") : ""),
    },
    {
      title: "Aadhar",
      dataIndex: "file",
      key: "file",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View PDF
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <span>
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            style={{ marginRight: 8 }}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            danger
          />
        </span>
      ),
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        style={{ minHeight: "700px" }}
        pagination={{ pageSize: 5 }} // Optional: to show pagination
      />
      <Modal
        title="Edit Client"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleEdit}
          style={{ backgroundColor: "white", boxShadow: "none" }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter the name" }]}
            style={{ marginBottom: "0" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: "Please enter the phone number" },
            ]}
            style={{ marginBottom: "0" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="depositAmount"
            label="Deposit Amount"
            rules={[
              { required: true, message: "Please enter the deposit amount" },
            ]}
            style={{ marginBottom: "0" }}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="roomNumber"
            label="Room Number"
            rules={[
              { required: true, message: "Please enter the room number" },
            ]}
            style={{ marginBottom: "0" }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="checkInDate"
            label="Check-in Date"
            rules={[
              { required: true, message: "Please select the check-in date" },
            ]}
            style={{ marginBottom: "0" }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="checkOutDate"
            label="Check-out Date"
            rules={[
              { required: true, message: "Please select the check-out date" },
            ]}
            style={{ marginBottom: "0" }}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default ViewClient;
