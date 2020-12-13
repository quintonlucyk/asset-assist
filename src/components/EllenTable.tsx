import * as React from "react";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { RowInterface } from "../tabs/EllenContent";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
} from "@material-ui/core";
import "./EllenTable.css";
import AverageYild from "./AverageYild";

interface EllenTableProps {
  header: string;
  rows: RowInterface[];
}

const emptyArray: number[] = [];

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.warning.light,
    },
    body: {
      padding: 5,
    },
  })
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  })
)(TableRow);

const EllenTable: React.FC<EllenTableProps> = ({ header, rows }) => {
  const [rowsExcluded, setRowsExcluded] = React.useState<number[]>([]);

  const handleCheckboxChange = (
    e: React.SyntheticEvent<HTMLInputElement>,
    i: number
  ) => {
    if (e.currentTarget.checked && rowsExcluded.includes(i)) {
      setRowsExcluded(rowsExcluded.filter((num) => num !== i));
    } else if (!e.currentTarget.checked && !rowsExcluded.includes(i)) {
      setRowsExcluded([...rowsExcluded, i]);
    }
  };

  return (
    <div className="tableContainer">
      <h4>{header}</h4>
      <div className="custFlex">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Date </StyledTableCell>
                <StyledTableCell align="right">Dividend</StyledTableCell>
                <StyledTableCell align="right">Share</StyledTableCell>
                <StyledTableCell align="right">Yield</StyledTableCell>
                <StyledTableCell align="right">Included</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map((row) => (
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
                  <StyledTableCell align="right">
                    <Checkbox
                      defaultChecked
                      onChange={(e) => handleCheckboxChange(e, row.id)}
                      color="primary"
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="yildCalcs">
          <AverageYild used={false} rowsExcluded={emptyArray} rows={rows} />
          <AverageYild used={true} rowsExcluded={rowsExcluded} rows={rows} />
        </div>
      </div>
    </div>
  );
};

export default EllenTable;
