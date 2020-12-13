import { Typography } from "@material-ui/core";
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
  return (
    <Typography variant="subtitle2">
      <div className="spaceBetween">
        <div>{message}</div>
        <div>{avgYildNum.toFixed(4) + " %"}</div>
      </div>
    </Typography>
  );
};
export default AverageYild;
