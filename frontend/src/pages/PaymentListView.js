import React, {useState, useEffect} from 'react';
import axios from 'axios';

import PaymentListItem from './../components/PaymentListItem';


function PaymentListView(){
    const [transactions, setTransactions] = useState(null);
    const [statusMessage, setStatusMessage] = useState(null);
    useEffect(() => {
        (async function fetchTransactions (){
          setStatusMessage('Loading...');
            try {
                const response = await axios.get('http://localhost:5000/transactions');
                setTransactions(response.data.transactions);
            } catch (err) {
              setStatusMessage('Error retrieving data.');
            };
        })();
    }, []);
    

    const renderTransaction = (transaction) => <PaymentListItem key={transaction._id} transaction = {transaction}/>
    return(
        <>
        <h2>Transactions:</h2>
        {transactions ?
        transactions.map(renderTransaction):
        <p>{statusMessage}</p>}
        </>
    );
}
export default PaymentListView;