import * as React from "react";
import {
  CircularProgress,
  Table,
  TableBody,
  TableContainer,
} from "@material-ui/core";
import { StyledTableCell, StyledTableRow } from "../components/EllenTable";

interface TableDataInterface {
  title?: string;
  data?: string[];
}

interface FmpIncomeGrowthInterface {
  growthRevenue?: number;
  growthEPS?: number;
}
interface FmpCashGrowthInterface {
  growthFreeCashFlow?: number;
}
interface FmpBalanceGrowthInterface {
  growthTotalStockholdersEquity?: number;
}
interface FmpKeyMetricInterface {
  date?: string;
  roic?: number;
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
    /**
     * ROIC
     * Revenue
     * EPS
     * Equity
     * FreeCashFlow
     */

    const [tableData, setTableData] = React.useState<Array<TableDataInterface>>(
      []
    );

    React.useEffect(() => {}, [
      fmpIncomeGrowth,
      fmpCashGrowth,
      fmpBalanceGrowth,
      fmpKeyMetrics,
    ]);

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
                {[
                  { date: "2020-01-19", dividend: 0.24, share: 2.4, yild: 24 },
                ].map((row) => (
                  <StyledTableRow key={row.date}>
                    <StyledTableCell>{row.date}</StyledTableCell>
                    <StyledTableCell align="right">
                      {"$ " + row.dividend}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {"$ " + row.share}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.yild + " %"}
                    </StyledTableCell>
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
