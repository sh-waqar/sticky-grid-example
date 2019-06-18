import React from "react";
import { VariableSizeGrid as Grid } from "react-window";

const stickyRowsWithOffset = stickyRows => [
  0,
  ...stickyRows.map(row => row + 1)
];

const Cell = ({
  columnIndex,
  rowIndex,
  components,
  stickyColumn,
  stickyHeader,
  stickyFooter,
  ...props
}) => {
  const {
    HeaderCell,
    TopLeftCell,
    BottomLeftCell,
    FooterCell,
    ColumnCell,
    DataCell
  } = components;

  const columnIdx = stickyColumn ? columnIndex - 1 : columnIndex;
  const rowIdx = stickyHeader ? rowIndex - 1 : rowIndex;

  if (stickyHeader && columnIndex === 0 && rowIndex === 0) {
    return TopLeftCell(props);
  }

  if (stickyFooter && columnIndex === 0 && rowIndex === -1) {
    return BottomLeftCell(props);
  }

  if (stickyHeader && rowIndex === 0) {
    return HeaderCell({ index: columnIdx, ...props });
  }

  if (stickyFooter && rowIndex === -1) {
    return FooterCell({ index: columnIdx, ...props });
  }

  if (stickyColumn && columnIndex === 0) {
    return ColumnCell({ index: rowIdx, ...props });
  }

  return DataCell({
    rowIndex: rowIdx,
    columnIndex: columnIdx,
    ...props
  });
};

const StickyGrid = ({ children, stickyRows = [], components, ...props }) => {
  const stickyColumn = !!components.ColumnCell;
  const stickyHeader = !!components.HeaderCell;
  const stickyFooter = !!components.FooterCell;

  const stickyRowIndexes = stickyHeader
    ? stickyRowsWithOffset(stickyRows)
    : stickyRows;
  const columnCount = stickyColumn ? props.columnCount + 1 : props.columnCount;
  const rowCount = props.rowCount - stickyRows.length;

  return (
    <Grid
      {...props}
      stickyRows={stickyRowIndexes}
      stickyFooter={stickyFooter}
      stickyColumn={stickyColumn}
      columnCount={columnCount}
      rowCount={rowCount}
    >
      {childProps =>
        Cell({
          components,
          stickyColumn,
          stickyHeader,
          stickyFooter,
          ...childProps
        })
      }
    </Grid>
  );
};

export default StickyGrid;
