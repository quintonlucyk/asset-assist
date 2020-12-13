import * as React from "react";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import { DIVIDEND } from "../constants";
import EllenTable from "../components/EllenTable";

function createData(
  id: number,
  date: string,
  dividend: string,
  share: string,
  yild: string
) {
  return { id, date, dividend, share, yild };
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
export interface RowInterface {
  id: number;
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
                nextLowRows.length,
                moment(entry.date * 1000).format("MMM DD YYYY"),
                entry.amount.toFixed(4),
                prices[i + found].high!.toFixed(4),
                ((entry.amount! / prices[i + found].high!) * 100).toFixed(4)
              )
            );

            nextHighRows.push(
              createData(
                nextHighRows.length,
                moment(entry.date * 1000).format("MMM DD YYYY"),
                entry.amount.toFixed(4),
                prices[i + found].low!.toFixed(4),
                ((entry.amount! / prices[i + found].low!) * 100).toFixed(4)
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
          <EllenTable header="Low Yield" rows={lowYildRows} />
          <EllenTable header="High Yield" rows={highYildRows} />
        </>
      );
    }
    return <div className="center">No data loaded/available.</div>;
  }
);

export default EllenContent;
