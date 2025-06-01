import React, { useState } from 'react';
import styles from '../styles/AddUser.module.css';
import {toast} from 'react-toastify'
import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

const AddUser = ({ onClose, setUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    mobile: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid 10-digit mobile number';
    }
    return newErrors;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
     
      try {
     
        const response = await axios.post(`${API_BASE_URL}/api/user/`,formData)
        if(response.status === 200){
          toast.success('User added successfully')
          localStorage.setItem('user',JSON.stringify(response.data.user))
          setUser(response.data)
          setFormData({ name: '', address: '', mobile: '' });
          setErrors({});
          onClose(); 
        }          
      } catch (error) {
         toast.error(error||'Something went wrong')
        
      }
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.title}>Add User</h2>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? styles.errorInput : ''}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? styles.errorInput : ''}
          />
          {errors.address && <p className={styles.errorText}>{errors.address}</p>}

          <label>Mobile</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className={errors.mobile ? styles.errorInput : ''}
          />
          {errors.mobile && <p className={styles.errorText}>{errors.mobile}</p>}

          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
