import React from 'react';
import { MONTH_MAP } from '../constants/dataset';
import classes from './table.module.css';
export default function Table({ range, userData, year }) {
  const userDataMap = Object.keys(userData).map((userName) => {
    const perMonthPointsData = userData[userName].perMonthPoints[year];
    const pointsArr = [
      perMonthPointsData[range],
      perMonthPointsData[range + 1],
      perMonthPointsData[range + 2],
    ];
    const total = pointsArr.reduce((a = 0, b = 0) => a + b, 0);
    return (
      <tr>
        <td>{userName}</td>
        {pointsArr.map((points) => (
          <td>{points || 0}</td>
        ))}
        <td>{total}</td>
      </tr>
    );
  });
  return (
    <table className={classes.table}>
      <thead>
        <tr>
          <th>NAME</th>
          {MONTH_MAP.slice(range, range + 3).map((month, index) => (
            <th key={index}>{month} Points</th>
          ))}
          <th>Total Points</th>
        </tr>
      </thead>
      <tbody>{userDataMap}</tbody>
    </table>
  );
}
