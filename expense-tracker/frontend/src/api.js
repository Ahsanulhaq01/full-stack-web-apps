import axios from 'axios';

const API = axios.create({
    baseURL: 'https://expensepro-1od3.onrender.com/api'
});

// Add token to requests
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const login = (formData) => API.post('/auth/login', formData);
export const register = (formData) => API.post('/auth/register', formData);
export const fetchTransactions = () => API.get('/transactions');
export const createTransaction = (newTransaction) => API.post('/transactions', newTransaction);
export const deleteTransaction = (id) => API.delete(`/transactions/${id}`);
