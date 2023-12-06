import React from 'react';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
			<App />
		</SnackbarProvider>
	</BrowserRouter>
);
