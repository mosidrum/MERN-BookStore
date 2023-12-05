import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BookTable from '../components/home/BookTable';
import BookCard from '../components/home/BookCard';

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [showType, setShowType] = useState('card');

	useEffect(() => {
		setLoading(true);
		axios
			.get('http://localhost:8888/books')
			.then((response) => {
				setBooks(response.data.books);
				setLoading(false);
			})
			.catch((error) => {
				console.log(error);
				setLoading(false);
			});
	}, []);
	return (
		<div className="p-4">
			<div className="flex justify-center items-center gap-x-4">
        <h2 className='text-2xl'>Choose a view: </h2>
				<button
					className=" hover:bg-sky-200 px-4 py-1 border border-slate-600 rounded-md"
					onClick={() => setShowType('table')}
				>
					Table
				</button>
				<button
					className=" hover:bg-sky-200 px-4 py-1 border border-slate-600 rounded-md"
					onClick={() => setShowType('card')}
				>
					Card
				</button>
			</div>
			<div className="flex justify-between items-center">
				<h1 className="text-3xl my-8">My Book List</h1>
				<Link to="/books/create">
					<MdOutlineAddBox className="text-sky-800 text-4xl" />
				</Link>
			</div>
			{loading ? (
				<Spinner />
			) : showType === 'card' ? (
				<BookCard books={books} />
			) : (
				<BookTable books={books} />
			)}
		</div>
	);
};

export default Home;
