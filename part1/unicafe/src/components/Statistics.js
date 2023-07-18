import React from "react";
import StatisticLine from "./StatisticLine";

const Statistics = ({
  good,
  neutral,
  bad,
  total,
  average,
  positivePercentage,
}) =>
  total === 0 ? (
    <>
      <h4>No feedback given</h4>
    </>
  ) : (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text={"good"} stat={good} />
          <StatisticLine text={"neutral"} stat={neutral} />
          <StatisticLine text={"bad"} stat={bad} />
          <StatisticLine text={"all"} stat={total} />
          <StatisticLine text={"average"} stat={average} />
          <StatisticLine text={"positive"} stat={`${positivePercentage}%`} />
        </tbody>
      </table>
    </>
  );

export default Statistics;
