import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import BookForm from '../components/BookForm';

const CreateBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateBook = (data) => {
    setLoading(true);
    axios
      .post('http://localhost:8888/books', data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book created successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', { variant: 'error' });
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <BookForm
        formData={formData}
        loading={loading}
        handleInputChange={handleInputChange}
        handleCreate={handleCreateBook}
        buttonText="Create"
        formTitle="Create book"
      />
    </div>
  );
};

export default CreateBook;
