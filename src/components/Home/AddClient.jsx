import React, { useState } from "react";
import "./AddClient.css";
import { useFirebase } from "../../context/firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddClient = () => {
  const { db, storage } = useFirebase();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    depositAmount: "",
    roomNumber: "",
    checkInDate: "",
    checkOutDate: "",
    file: null,
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      if (formData.file) {
        const fileRef = ref(storage, `pdfs/${formData.file.name}`);
        await uploadBytes(fileRef, formData.file);
        const fileURL = await getDownloadURL(fileRef);
        const formDataWithFileURL = {
          ...formData,
          file: fileURL,
        };

        await addDoc(collection(db, "clients"), formDataWithFileURL);
        // console.log('Form Data:', formDataWithFileURL);

        toast.success("Data added successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Reset form
        setFormData({
          name: "",
          phoneNumber: "",
          depositAmount: "",
          roomNumber: "",
          checkInDate: "",
          checkOutDate: "",
          file: null,
        });
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error uploading data");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Deposit Amount:</label>
          <input
            type="number"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Check-in Date:</label>
          <input
            type="date"
            name="checkInDate"
            value={formData.checkInDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Check-out Date:</label>
          <input
            type="date"
            name="checkOutDate"
            value={formData.checkOutDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Upload AadharCard (pdf)</label>
          <input
            type="file"
            name="file"
            accept="application/pdf"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="uploadButton" disabled={uploading}>
          {uploading ? "Uploading..." : "Submit"}
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddClient;
