import { useState, useEffect } from 'react';
import { DATASET } from '../constants/dataset.js';

const mapPerMonthRewardPoints = (expensesPerUser, points, year, month) => {
  if (expensesPerUser.perMonthPoints[year]) {
    if (expensesPerUser.perMonthPoints[year][month]) {
      expensesPerUser.perMonthPoints[year][month] += points;
    } else {
      expensesPerUser.perMonthPoints[year][month] = points;
    }
  } else {
    expensesPerUser.perMonthPoints[year] = { [month]: points };
  }
};

const calculateRewardPoint = ({ transactionAmount }) => {
  let points = 0,
    calculationLogic;
  if (transactionAmount > 100) {
    points = 2 * (transactionAmount - 100) + 1 * 50;
    calculationLogic = `2 x ${transactionAmount - 100} + 1 x 50`;
  } else if (transactionAmount > 50) {
    points = 1 * (transactionAmount - 50);
    calculationLogic = `1 x ${transactionAmount - 50}`;
  }
  return { points, calculationLogic };
};

const mapExpensePerUser = (expenseObj) => {
  const expensesObj = {};
  for (let user in expenseObj) {
    const expensesPerUser = {
      expenses: null,
      perMonthPoints: {},
    };
    expensesPerUser.expenses = expenseObj[user];
    if (expensesPerUser.expenses.length) {
      expensesPerUser.expenses = expensesPerUser.expenses.map((expense) => {
        const date = new Date(expense.transactionTimeStamp);
        const month = date.getMonth(),
          year = date.getFullYear();
        const { points, calculationLogic } = calculateRewardPoint(expense);
        mapPerMonthRewardPoints(expensesPerUser, points, year, month);
        return { ...expense, points, calculationLogic };
      });
    }
    expensesObj[user] = expensesPerUser;
  }
  return expensesObj;
};
export default function useRewardPointsCalculator() {
  const [expenseObj, setExpenseObj] = useState();
  useEffect(() => {
    setTimeout(() => {
      setExpenseObj(DATASET);
    }, 100);
  }, []);
  return mapExpensePerUser(expenseObj);
}
