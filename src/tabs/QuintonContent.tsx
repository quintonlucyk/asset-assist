import * as React from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../components/EllenTable";

interface FmpIncomeGrowthInterface {
  [key: string]: number | undefined; //growthRevenue?
  //[key: string]: number | undefined; //growthEPS?
}
interface FmpCashGrowthInterface {
  [key: string]: number | undefined; //growthFreeCashFlow?
}
interface FmpBalanceGrowthInterface {
  [key: string]: number | undefined; //growthTotalStockholdersEquity?
}
interface FmpKeyMetricInterface {
  [key: string]: number | undefined; //roic?
}

interface Props {
  fmpIncomeGrowth: FmpIncomeGrowthInterface[];
  fmpCashGrowth: FmpCashGrowthInterface[];
  fmpBalanceGrowth: FmpBalanceGrowthInterface[];
  fmpKeyMetrics: FmpKeyMetricInterface[];
  isLoading: boolean;
  isError: boolean;
}

const QuintonContent: React.FC<Props> = React.memo(
  ({
    fmpIncomeGrowth,
    fmpCashGrowth,
    fmpBalanceGrowth,
    fmpKeyMetrics,
    isLoading,
    isError,
  }) => {
    const [tableData, setTableData] = React.useState<Array<Array<string>>>([]);

    React.useEffect(() => {
      const nextData: Array<Array<string>> = [];

      const DataFillingMetrics = [
        { title: "ROIC", dataSource: fmpKeyMetrics, dataAttribute: "roic" },
        {
          title: "Revenue",
          dataSource: fmpIncomeGrowth,
          dataAttribute: "growthRevenue",
        },
        {
          title: "EPS",
          dataSource: fmpIncomeGrowth,
          dataAttribute: "growthEPS",
        },
        {
          title: "Equity",
          dataSource: fmpBalanceGrowth,
          dataAttribute: "growthTotalStockholdersEquity",
        },
        {
          title: "FreeCashFlow",
          dataSource: fmpCashGrowth,
          dataAttribute: "growthFreeCashFlow",
        },
      ];

      for (let dataColumn of DataFillingMetrics) {
        nextData.push([]);
        nextData[nextData.length - 1].push(dataColumn.title);
        for (let i = 0; i < 10; ++i) {
          if (
            i < dataColumn.dataSource.length &&
            dataColumn.dataSource[i][dataColumn.dataAttribute] &&
            dataColumn.dataSource[i][dataColumn.dataAttribute] !== undefined
          ) {
            nextData[nextData.length - 1].push(
              (
                dataColumn.dataSource[i][dataColumn.dataAttribute]! * 100
              ).toFixed(0)
            );
          } else {
            nextData[nextData.length - 1].push("NA");
          }
        }
      }

      setTableData(nextData);
    }, [fmpIncomeGrowth, fmpCashGrowth, fmpBalanceGrowth, fmpKeyMetrics]);

    if (isError) {
      return (
        <div className="center">
          <div>It seems we have encountered an error.</div>
          <div>Please see Quinton or the console.</div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="center">
          <CircularProgress />
        </div>
      );
    }

    return (
      <div className="tableContainer">
        <div className="custFlex">
          <TableContainer>
            <Table>
              <TableBody>
                {tableData.map((row) => (
                  <StyledTableRow key={row[0]}>
                    {row.map((cell) => (
                      <StyledTableCell>{cell}</StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
);

export default QuintonContent;
