import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

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

  const handleCreateBook = () => {
    setLoading(true);
    axios
      .post('http://localhost:8888/books', formData)
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
      {loading && <Spinner />}
      <h1 className='text-3xl my-4 text-center'>Create book</h1>
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            name='author'
            value={formData.author}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>PublishYear</label>
          <input
            type='text'
            name='publishYear'
            value={formData.publishYear}
            onChange={handleInputChange}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-200' onClick={handleCreateBook}>
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateBook;
