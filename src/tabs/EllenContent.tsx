import * as React from "react";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@material-ui/core";
import "./EllenContent.css";
import { DIVIDEND } from "../constants";

function createData(
  date: string,
  dividend: string,
  share: string,
  yild: string
) {
  return { date, dividend, share, yild };
}

interface DataInterface {
  prices?: [
    {
      date?: number;
      open?: number;
      high?: number;
      low?: number;
      close?: number;
      volume?: number;
      adjclose?: number;
      amount?: number;
      type?: string;
      // data?: number; Too similar to date
    }
  ];
}
interface RowInterface {
  date: string;
  dividend: string;
  share: string;
  yild: string;
}

interface Props {
  data: DataInterface;
  isLoading: boolean;
  isError: boolean;
}

const EllenContent: React.FC<Props> = React.memo(
  ({ data, isLoading, isError }) => {
    const [lowYildRows, setLowYildRows] = React.useState<RowInterface[]>([]);
    const [highYildRows, setHighYildRows] = React.useState<RowInterface[]>([]);

    React.useEffect(() => {
      let nextLowRows: RowInterface[] = [];
      let nextHighRows: RowInterface[] = [];
      data?.prices?.forEach((entry, i, prices) => {
        if (entry.type === DIVIDEND) {
          let found = null;
          if (i > 0 && prices[i - 1].date === entry.date) {
            found = -1;
          } else if (
            i < prices.length - 1 &&
            prices[i - 1].date === entry.date
          ) {
            found = +1;
          }

          if (
            found !== null &&
            !!entry.date &&
            !!entry.amount &&
            !!prices[i + found].low &&
            !!prices[i + found].high
          ) {
            nextLowRows.push(
              createData(
                moment(entry.date * 1000).format("MMM DD YYYY"),
                "$ " + entry.amount.toFixed(4),
                "$ " + prices[i + found].high!.toFixed(4),
                ((entry.amount! / prices[i + found].high!) * 100).toFixed(4) +
                  " %"
              )
            );

            nextHighRows.push(
              createData(
                moment(entry.date * 1000).format("MMM DD YYYY"),
                "$ " + entry.amount.toFixed(4),
                "$ " + prices[i + found].low!.toFixed(4),
                ((entry.amount! / prices[i + found].low!) * 100).toFixed(4) +
                  " %"
              )
            );
          }
        }
      });
      setLowYildRows(nextLowRows);
      setHighYildRows(nextHighRows);
    }, [data]);

    if (isLoading) {
      return (
        <div className="center">
          <CircularProgress />
        </div>
      );
    }
    if (isError) {
      return (
        <div className="center">Sorry, we have experienced an error...</div>
      );
    }
    if (!!data) {
      return (
        <>
          <TableContainer className="tableContainer">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date </TableCell>
                  <TableCell align="right">Dividend</TableCell>
                  <TableCell align="right">Share</TableCell>
                  <TableCell align="right">Yield</TableCell>
                </TableRow>
              </TableHead>
              <h4>Low Yield</h4>
              <TableBody>
                {lowYildRows.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.dividend}</TableCell>
                    <TableCell align="right">{row.share}</TableCell>
                    <TableCell align="right">{row.yild}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <h4>High Yield</h4>
              <TableBody>
                {highYildRows.map((row) => (
                  <TableRow key={row.date}>
                    <TableCell component="th" scope="row">
                      {row.date}
                    </TableCell>
                    <TableCell align="right">{row.dividend}</TableCell>
                    <TableCell align="right">{row.share}</TableCell>
                    <TableCell align="right">{row.yild}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      );
    }
    return <div className="center">No data loaded/available.</div>;
  }
);

export default EllenContent;
