import React from 'react';
import { useForm } from 'react-hook-form';

const BookForm = ({
                    formData,
                    loading,
                    handleCreate,
                    buttonText,
                    formTitle,
                  }) => {
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: formData
  });

  const submitForm = handleSubmit((data) => {
    handleCreate(data);
  });

  return (
    <div className="p-4">
      <h1 className="text-3xl my-4 text-center">{formTitle}</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Title</label>
            <input
              type="text"
              name="title"
              {...register('title', { required: 'Title is required' })}
              value={formData.title}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
            {errors.title && <p className="text-red-500">{errors.title.message}</p>}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Author</label>
            <input
              type="text"
              name="author"
              {...register('author', { required: 'Author is required' })}
              value={formData.author}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
            {errors.author && <p className="text-red-500">{errors.author.message}</p>}
          </div>
          <div className="my-4">
            <label className="text-xl mr-4 text-gray-500">Publish Year</label>
            <input
              type="text"
              name="publishYear"
              {...register('publishYear', {
                required: 'Publish Year is required',
                pattern: {
                  value: /^[0-9]{4}$/,
                  message: 'Enter a valid year (YYYY format)',
                },
              })}
              value={formData.publishYear}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
            {errors.publishYear && <p className="text-red-500">{errors.publishYear.message}</p>}
          </div>
          <button className="p-2 bg-sky-200" type="submit" disabled={loading}>
            {loading ? 'Loading...' : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
