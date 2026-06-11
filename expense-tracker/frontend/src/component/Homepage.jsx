import { useState, useEffect } from "react";
import { fetchTransactions, createTransaction, deleteTransaction as apiDeleteTransaction } from "../api";
import "./dashboard.css";

function Homepage({ onLogout }) {
  const [listOfTransaction, setListOfTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchItem , setSearchItem] = useState("");

  const [formData, setFormData] = useState({
    nameOfProduct: "",
    priceOfProduct: "",
    type: "expense"
  });

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const { data } = await fetchTransactions();
      setListOfTransaction(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setLoading(false);
    }
  };

  const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'USD');

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  const formatAmount = (amount) => {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
      }).format(amount);
    } catch (e) {
      // Fallback if currency code is invalid
      return `${currency} ${amount.toLocaleString()}`;
    }
  };

  const totals = listOfTransaction.reduce((acc, item) => {
    if (item.type === 'budget') {
      acc.budget += item.priceOfProduct;
      acc.balance += item.priceOfProduct;
    } else {
      acc.expense += item.priceOfProduct;
      acc.balance -= item.priceOfProduct;
    }
    return acc;
  }, { budget: 0, expense: 0, balance: 0 });

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if(!formData.nameOfProduct || !formData.priceOfProduct) return;

    try {
      const { data } = await createTransaction({
        ...formData,
        priceOfProduct: Number(formData.priceOfProduct)
      });
      setListOfTransaction([data, ...listOfTransaction]);
      setFormData({ nameOfProduct: "", priceOfProduct: "", type: "expense" });
      setShowAddForm(false);
    } catch (err) {
      console.error("Error adding transaction:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiDeleteTransaction(id);
      setListOfTransaction(listOfTransaction.filter(item => item._id !== id));
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const filteredTransactions = listOfTransaction.filter((item) =>
    item.nameOfProduct.toLowerCase().includes(searchItem.toLowerCase()) ||
    item.priceOfProduct.toString().includes(searchItem)
  );

  if (loading) return <div className="loading-screen">Loading dashboard...</div>;

  return (
    <div className="dashboard-layout">
      <nav className="top-nav">
        <div className="nav-container">
          <h1 className="brand">💰 ExpensePro</h1>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard-content">
        <header className="content-header">
          <div>
            <h2>Dashboard</h2>
            <p className="text-muted">Manage your finances with ease</p>
          </div>
          <div className="header-actions">
            <div className="currency-selector">
              <label>Currency:</label>
              <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                <option value="USD">USD - Dollar</option>
                <option value="PKR">PKR - Rupee</option>
                <option value="INR">INR - Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - Pound</option>
                <option value="AED">AED - Dirham</option>
                <option value="SAR">SAR - Riyal</option>
                <option value="CAD">CAD - Dollar</option>
                <option value="AUD">AUD - Dollar</option>
              </select>
            </div>
            <button className="add-transaction-btn" onClick={() => setShowAddForm(!showAddForm)}>
              {showAddForm ? 'Cancel' : '+ New Transaction'}
            </button>
          </div>
        </header>

        <section className="summary-grid">
          <div className="card summary-card balance">
            <span className="label">Total Balance</span>
            <h3 className="amount">{formatAmount(totals.balance)}</h3>
          </div>
          <div className="card summary-card income">
            <span className="label">Total Budget</span>
            <h3 className="amount">{formatAmount(totals.budget)}</h3>
          </div>
          <div className="card summary-card expenses">
            <span className="label">Total Expenses</span>
            <h3 className="amount">{formatAmount(totals.expense)}</h3>
          </div>
        </section>

        {showAddForm && (
          <section className="card transaction-form-section">
            <form onSubmit={handleAddTransaction} className="transaction-form">
              <div className="form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Monthly Rent"
                  value={formData.nameOfProduct}
                  onChange={(e) => setFormData({...formData, nameOfProduct: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input 
                  type="number" 
                  placeholder="0.00"
                  value={formData.priceOfProduct}
                  onChange={(e) => setFormData({...formData, priceOfProduct: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="expense">Expense</option>
                  <option value="budget">Budget</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">Add Transaction</button>
            </form>
          </section>
        )}

        <section className="card transactions-section">
          <div className="transactions-header">
            <h3>Recent Transactions</h3>
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search transactions..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
          </div>

          <div className="transactions-list-container">
            {filteredTransactions.length === 0 ? (
              <div className="empty-state">No transactions found.</div>
            ) : (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((item) => (
                    <tr key={item._id}>
                      <td className="desc" data-label="Description">{item.nameOfProduct}</td>
                      <td data-label="Type">
                        <span className={`badge ${item.type}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="date" data-label="Date">{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td className={`amount ${item.type}`} data-label="Amount">
                        {item.type === 'expense' ? '-' : '+'}{formatAmount(item.priceOfProduct)}
                      </td>
                      <td data-label="Action">
                        <button className="delete-action" onClick={() => handleDelete(item._id)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Homepage;
