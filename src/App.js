import React from 'react';
import useRewardPointsCalculator from './hooks/useRewardPointsCalculator';
import Table from './components/table';
import './style.css';

const year = new Date().getFullYear();
export default function App() {
  const expenseData = useRewardPointsCalculator();
  console.log(expenseData);
  const [monthRange, setMonthRange] = React.useState('0');
  return (
    <>
      <label for="month-range"></label>
      <select
        name="month-range"
        id="month-range"
        onChange={(event) => setMonthRange(event.target.value)}
      >
        <option value="0">Jan - Mar</option>
        <option value="3">Apr - Jun</option>
        <option value="6">Jul - Sep</option>
        <option value="9">Oct - Dec</option>
      </select>
      <label for="year"></label>
      <select name="year" id="year">
        <option>{year}</option>
      </select>
      <Table range={+monthRange} userData={expenseData} year={year} />
    </>
  );
}
