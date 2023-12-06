import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8888/books/${id}`)
      .then((response) => {
        setLoading(false);
        const { title, author, publishYear } = response.data;
        setFormData({ title, author, publishYear });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateBook = () => {
    setLoading(true);
    axios
      .put(`http://localhost:8888/books/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', { variant: 'success' });
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
      <h1 className='text-3xl my-4 text-center'>Edit book</h1>
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
        <button className='p-2 bg-sky-200' onClick={handleUpdateBook}>
          Update Book
        </button>
      </div>
    </div>
  );
};

export default EditBook;
