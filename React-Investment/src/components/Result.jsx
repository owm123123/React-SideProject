import React from 'react';
import { calculateInvestmentResults, formatter } from '../util/investment';

const Result = ({ input }) => {
  const resultsData = calculateInvestmentResults(input);
  const initialInvestment =
    resultsData[0].valueEndOfYear -
    resultsData[0].interest -
    resultsData[0].annualInvestment;

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Investment Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((yearDate) => {
          const totalInterest =
            yearDate.valueEndOfYear -
            yearDate.year * yearDate.annualInvestment -
            initialInvestment;

          const totalAmountInvested = yearDate.valueEndOfYear - totalInterest;

          return (
            <tr key={yearDate.year}>
              <td>{yearDate.year}</td>
              <td>{formatter.format(yearDate.valueEndOfYear)}</td>
              <td>{formatter.format(yearDate.interest)}</td>
              <td>{formatter.format(totalInterest)}</td>
              <td>{totalAmountInvested}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Result;
