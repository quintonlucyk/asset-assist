import * as React from "react";
import { RowInterface } from "../tabs/EllenContent";

interface AverageYildProps {
  used: boolean;
  rows: RowInterface[];
  rowsExcluded: number[];
}

const AverageYild: React.FC<AverageYildProps> = ({
  used,
  rows,
  rowsExcluded,
}) => {
  const calcYild = (excl: number[]) => {
    let yildNum = 0;
    rows.forEach((row, i) => {
      if (!rowsExcluded.includes(i)) {
        yildNum += parseFloat(row.yild);
      }
    });
    return yildNum / (rows.length - excl.length);
  };

  const avgYildNum = used ? calcYild(rowsExcluded) : calcYild([]);
  const message = used ? "Used Yield: " : "Average Yield: ";
  return <div>{message + avgYildNum.toFixed(4)}</div>;
};
export default AverageYild;
