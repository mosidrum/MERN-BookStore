import React, {useEffect, useState} from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import {useSnackbar} from 'notistack';
import BookForm from '../components/BookForm';

const EditBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
  });
  const [loading, setLoading] = useState(false);
  const {enqueueSnackbar} = useSnackbar();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8888/books/${id}`)
      .then((response) => {
        setLoading(false);
        const {title, author, publishYear} = response.data;
        setFormData({title, author, publishYear});
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleUpdateBook = () => {
    setLoading(true);
    axios
      .put(`http://localhost:8888/books/${id}`, formData)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book edited successfully', {variant: 'success'});
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar('Error', {variant: 'error'});
      });
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <BookForm
        formData={formData}
        setFormData={setFormData}
        loading={loading}
        handleInputChange={handleInputChange}
        handleSubmit={handleUpdateBook}
        buttonText="Update Book"
        formTitle="Edit book"
      />
    </div>
  );
};

export default EditBook;
