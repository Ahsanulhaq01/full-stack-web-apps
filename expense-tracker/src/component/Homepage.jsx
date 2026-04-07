import { useState } from "react";
import "./homepage.css";

function Homepage() {
  const [isTrue, setIsTrue] = useState(false);
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [budget, setBudget] = useState(0);
  const [priceOfProduct, setPriceOfProduct] = useState(0);
  const [nameOfProduct, setNameOfProduct] = useState("ahsan");
  const [listOfTransaction, setListOfTransaction] = useState([
    { priceOfProduct: 0, nameOfProduct: "ahsan" },
    { priceOfProduct: 1, nameOfProduct: "haris" },
  ]);

  function showTransactionContainer() {
    setIsTrue(isTrue ? false : true);
  }
  function addTransaction() {
    setListOfTransaction([...listOfTransaction , {priceOfProduct , nameOfProduct}])
  }

  function deleteTransaction(deleteIdx){
    const itemToDelete = listOfTransaction[deleteIdx];
    const updatedList = listOfTransaction.filter((_ , index) => index !== deleteIdx);

    setListOfTransaction(updatedList);

    setBalance(balance - itemToDelete.priceOfProduct)
  }
  return (
    <>
      <div className="hero-section">
        <p className="name-of-web-app">Expense Tracker</p>
        <div className="balance-section">
          <span className="balance-amount">Balance : {balance}</span>
          {isTrue ? (
            <button
              className="cancel-amount"
              onClick={showTransactionContainer}
            >
              cancel
            </button>
          ) : (
            <button className="add-amount" onClick={showTransactionContainer}>
              Add
            </button>
          )}
        </div>
        <div className={isTrue ? "add-amount-container" : "active"}>
          <input type="text" placeholder="amount" value={priceOfProduct} onChange={(e) => setPriceOfProduct(Number(e.target.value))} />
          <input type="text" placeholder="material-name" value={nameOfProduct} onChange={(e) => setNameOfProduct(e.target.value)} />
          <div className="checked-container-for-expense-and-budget">
            <div className="expense-check">
              <label htmlFor="expense-checked">expense</label>
              <input
                type="radio"
                name="budget-and-expense"
                id="expense-checked"
              />
            </div>
            <div className="budget-check">
              <label htmlFor="budget-checked">budget</label>
              <input
                type="radio"
                name="budget-and-expense"
                id="budget-checked"
              />
            </div>
          </div>
          <button className="add-transaction" onClick={addTransaction}>
            Add Transaction
          </button>
        </div>
        <div className="expense-and-budget-section">
          <div className="expense-container">
            <p className="expense-text">Expense</p>
            <p className="expense-amount">{expense}</p>
          </div>
          <div className="budget-container">
            <p className="budget-text">Budget</p>
            <p className="budget-amount">{budget}</p>
          </div>
        </div>

        <div className="transaction-container">
          <p className="transaction-head">Transaction</p>
          <input type="text" placeholder="search" />

          <ul className="list-of-transaction">
            {listOfTransaction.map((item , index) => {
              return (
                <li key={index}>
                  <p>{item.nameOfProduct}</p> <p>{item.priceOfProduct}</p>{" "}
                  <button onClick={()=>{deleteTransaction(index)}}>remove</button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Homepage;
