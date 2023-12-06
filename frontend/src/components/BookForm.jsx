import React from 'react'

const BookForm = ({
  formData,
  setFormData,
  loading,
  handleInputChange,
  handleSubmit,
  buttonText,
  formTitle,
}) => (
  <div className='p-4'>
  <h1 className='text-3xl my-4 text-center'>{formTitle}</h1>
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
    <button className='p-2 bg-sky-200' onClick={handleSubmit} disabled={loading}>
      {loading ? 'Loading...' : buttonText}
    </button>
  </div>
</div>
)

export default BookForm