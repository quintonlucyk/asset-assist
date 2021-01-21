import * as React from "react";

// interface TableDataInterface {
//   date?: string;
//   roic?: number; //Key Metrics
//   growthRevenue?: number; //Income Statement
//   growthEPS?: number; //Income Statement
//   growthTotalStockholdersEquity?: number; //Balance Sheet
//   growthFreeCashFlow?: number; //CashFlowGrowth
// }

// interface FmpIncomeGrowthInterface {}

interface Props {
  fmpIncomeGrowth: any[];
  fmpCashGrowth: any[];
  fmpBalanceGrowth: any[];
  fmpKeyMetrics: any[];
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
    return <div></div>;
  }
);

export default QuintonContent;
