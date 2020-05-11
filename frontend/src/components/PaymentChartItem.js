import React, { useEffect, useState } from 'react';
import {
    BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush
  } from 'recharts';
import axios from 'axios';

function PaymentChartItem() {
  const [statusMessage, setStatusMessage] = useState(null);
  const [transactions, setTransactions] = useState(null);


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

      
  function prepareData(_transactions){
      return _transactions
          .sort((a,b) => {return new Date(a.createdAt) - new Date(b.createdAt)})
          .map( (obj) => {return { name: obj.createdAt.slice(0, 10) , earning: obj.amount}})
          .reduce(function(res, obj) {
              if (!(obj.name in res))
                  res.__array.push(res[obj.name] = obj);
              else
                  res[obj.name].earning += obj.earning;
              return res;
          }, {__array:[]}).__array
  }

 

  const renderChart = () => 
      <>
        <h3>Total: {transactions.reduce((tot, arr) => { return tot + arr.amount},0).toFixed(2)+" $"}</h3>
        <ResponsiveContainer aspect={4.0/3.0} width='100%'>
        <BarChart
          data={prepareData(transactions)} 
          margin={{ top: 5, right: 30, left: 20, bottom: 5}}
        >
            <CartesianGrid strokeDasharray="3 3" />
            {transactions.length > 0 && <Brush dataKey="name" stroke="#000000" />}
            <XAxis dataKey="name" />
            <YAxis 
              label={{ value: 'Earning cash', angle: -90, position: 'insideLeft' }} 
              tickFormatter={(tickItem) => {return tickItem+"$"}}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="earning" fill="#000000" />
        </BarChart>
      </ResponsiveContainer>
    </>


  return (
    <>
      <h2>Earning:</h2>
      {
        transactions ? 
        renderChart()
        : 
        <p>
          {statusMessage}
        </p>
      }
    </>               
  );

}
export default PaymentChartItem;