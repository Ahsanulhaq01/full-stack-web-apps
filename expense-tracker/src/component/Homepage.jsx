import { useEffect, useState } from "react";
import "./homepage.css";

function Homepage() {
  const [isTrue, setIsTrue] = useState(false);
  const [selectType , setSelectType] = useState("");
  const [searchItem , setSearchItem] = useState("");
  const [expense, setExpense] = useState(()=>{
    return Number(localStorage.getItem('expense')) || 0;
  });
  const [budget, setBudget] = useState(()=>{
    return Number(localStorage.getItem('budget')) || 0;
  });
  const [priceOfProduct, setPriceOfProduct] = useState();
  const [nameOfProduct, setNameOfProduct] = useState("");
  const [balance, setBalance] = useState(()=>{
    return Number(localStorage.getItem('balance')) || 0;
  });
  const [listOfTransaction, setListOfTransaction] = useState(()=>{
    return(
      JSON.parse(localStorage.getItem('transaction')) ||[]
    )
  });


  useEffect(()=>{
    localStorage.setItem("transaction" , JSON.stringify(listOfTransaction));
  },[listOfTransaction])

  useEffect(()=>{
    localStorage.setItem("balance" , balance);
  } , [balance])

  useEffect(()=>{
    localStorage.setItem('expense' , expense);
    localStorage.setItem('budget' , budget);
  } , [expense , budget])
  function showTransactionContainer() {
    setIsTrue(isTrue ? false : true);
  }
  function addTransaction() {
    if(priceOfProduct == 0 || nameOfProduct == ''){
      alert("all field are required");
      return;
    }
    setListOfTransaction([...listOfTransaction , {priceOfProduct , nameOfProduct , type : selectType}])
    setIsTrue(false);

    if(selectType == 'budget'){
      setBalance(Number(balance + priceOfProduct));
      setBudget(budget + priceOfProduct)
    }
    else if(selectType == 'expense'){
      setBalance(Number(balance - priceOfProduct));
      setExpense(expense+priceOfProduct)
    }
  }

  function deleteTransaction(deleteIdx){
    const itemToDelete = listOfTransaction[deleteIdx];
    const updatedList = listOfTransaction.filter((_ , index) => index !== deleteIdx);

    setListOfTransaction(updatedList);
    
    if(itemToDelete.nameOfProduct.toLowerCase() == 'budget'){
      setBalance(balance - itemToDelete.priceOfProduct);
      if(budget > itemToDelete.priceOfProduct){

        setBudget(budget - itemToDelete.priceOfProduct)
      }
    }
    else{
      setBalance(balance + itemToDelete.priceOfProduct);
      setExpense(expense - itemToDelete.priceOfProduct)
    }
  }

  function clearAll(){
    localStorage.clear();
    setListOfTransaction([]);
    setSelectType('');
    setExpense(0);
    setBalance(0);
    setBudget(0);
  }
  const filteredTransaction = listOfTransaction.filter((item)=>{
    return(
      item.nameOfProduct.toLowerCase().includes(searchItem.toLowerCase()) ||
      item.priceOfProduct.toString().includes(searchItem) ||
      item.type.toLowerCase().includes(searchItem.toLowerCase())
    )
  })

  
  return (
    <>
      <div className="hero-section">
        <div className="expense-tracker-header">
          <p className="name-of-web-app">Expense Tracker</p>
          <button className="clear-all-persistent-data" onClick={clearAll}>Clear all</button>
        </div>
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
                value={"expense"}
                checked = {selectType == 'expense'}
                onChange={(e) => setSelectType(e.target.value)}
              />
            </div>
            <div className="budget-check">
              <label htmlFor="budget-checked">budget</label>
              <input
                type="radio"
                name="budget-and-expense"
                id="budget-checked"
                value={'budget'}
                checked = {selectType == 'budget'}
                onChange={(e)=>setSelectType(e.target.value)}
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
          <input type="text" placeholder="search" value={searchItem} onChange={(e) => setSearchItem(e.target.value)}/>

          <ul className="list-of-transaction">
            {filteredTransaction.length === 0 ? <p>No Transaction Found</p> : 
            filteredTransaction.map((item , index) => {
              return(
                 <li key={index}>
                  <p>{item.nameOfProduct}</p> <p>{item.priceOfProduct}</p>{" "}
                  <button onClick={()=>{deleteTransaction(index)}} className={item.type == 'expense' ? 'red-border': 'green-border'}>remove</button>
                </li>
              )
            })

            }


            {/* {listOfTransaction.map((item , index) => {
              return (
                <li key={index}>
                  <p>{item.nameOfProduct}</p> <p>{item.priceOfProduct}</p>{" "}
                  <button onClick={()=>{deleteTransaction(index)}} className={item.type == 'expense' ? 'red-border': 'green-border'}>remove</button>
                </li>
              );
            })} */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Homepage;
