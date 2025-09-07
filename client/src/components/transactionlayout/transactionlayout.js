import { useEffect, useState } from "react";
import "./transactionlayout.css";
import { fetchTransaction } from "../services";

function TransactionLayout() {
  const [transactionData, setTransactionData] = useState();

  async function fetchingData() {
    const fetchedData = await fetchTransaction();
    console.log("fetchedData", fetchedData);
    setTransactionData(fetchedData);
  }

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="transaction-section">
      <h6 className="d-flex ms-2 ms-md-3 transaction-heading">Recent Transactions</h6>
      
      <div className="transaction-cont">
      {transactionData ? (
        <>
          {transactionData?.map((eachdata, index) => {
            return (
              <div className="trans-each-entry d-flex justify-content-between align-items-center m-1 p-2" key={index}>
                <div>
                  <h6 className="custom-size highlight">{eachdata.txId}</h6>
                  <h6 className="custom-size">{eachdata.user}</h6>
                </div>
                <div>
                  <h6 className="custom-size">{eachdata.date}</h6>
                </div>
                <div>
                  <h6 className="custom-size highlight">~{eachdata.cost}</h6>
                </div>
              </div>
            );
          })}
        </>
      )
      :(
         <div className="loader-container">
            <div className="loader"></div>
            <p>Loading data...</p>
         </div>
      )}
      </div>
    </div>
  );
}

export default TransactionLayout;
