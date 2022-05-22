import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import TableContainer from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import Pagination from "./Pagination";
import TableSortLabel from '@mui/material/TableSortLabel';

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: theme.palette.common.grey,
  },
  tableHead: {
    fontWeight: "700 !important",
  },
  cell: {
    maxHeight: "120px !important",
    width: "fit-content",
    overflowX: "auto"
  },
  data: {
    width: "70%",
    fontSize: "1.8em",
    marginBottom: 16,
  },
}));

const Head = ({ columns, onColumnClick }) => {
  const classes = useStyles();

  return (
    <TableHead className={classes.header}>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={"left"}
            className={classes.tableHead}
            onClick={() => onColumnClick(column.id)}
          >
            <TableSortLabel   active={true}>{column.label}</TableSortLabel>
            
          </TableCell>
        ))}
        
      </TableRow>
    </TableHead>
  );
};

const Row = ({ actions: Actions, columns, data, rowId, onRowClick }) => {
  const classes = useStyles();

  return (
    <TableRow
      hover
      onClick={() => onRowClick(data)}
      // style={{ cursor: "pointer" }}
    >
      <>
        {columns.map((column) =>
          column.id === "actions" ? (
            <TableCell key={column.id} align="right" padding="checkbox">
              <Actions rowId={rowId} data={data} />
            </TableCell>
          ) : (
            <TableCell
              align={"left"}
              key={column.id}
             
            >
              <Box  className={classes.cell}>
              {data[column.id]}
              </Box>
            </TableCell>
          )
        )}
      </>
    </TableRow>
  );
};

Row.defaultProps = {
  onRowClick: () => {},
  onColumnClick: () => {},
  actions: () => <></>,
};

const Body = ({ actions, rows, columns, onRowClick }) => {
  return (
    <TableBody>
      {rows.map((row, index) => (
        <Row
          key={row.id || index}
          actions={actions}
          columns={columns}
          data={row}
          rowId={row.id}
          onRowClick={onRowClick}
        />
      ))}
    </TableBody>
  );
};

function Table(props) {
  const {
    columns,
    actions,
    data,
    onRowClick,
    onColumnClick,
    currentPage,
    pageSize,
    totalEntries,
    onChangePage,
    removeShadow = false,
  } = props;

  return (
        <TableContainer
          style={{
            boxShadow: removeShadow && "none",
            width: "100%",
            maxHeight: "74vh",
            overflow: "auto",
          }}
        >
          <MuiTable stickyHeader>
            <Head columns={props.columns} onColumnClick={onColumnClick}/>
            <Body
              actions={actions}
              rows={data}
              columns={columns}
              onRowClick={onRowClick}
            />
          </MuiTable>
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalEntries={totalEntries}
            onChangePage={onChangePage}
          />
        </TableContainer>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      numeric: PropTypes.bool,
    })
  ),
  actions: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
  data: PropTypes.array,
  currentPage: PropTypes.number,
  pageSize: PropTypes.number,
  totalEntries: PropTypes.number,
  onRowClick: PropTypes.func,
  onChangePage: PropTypes.func,
  onColumnClick:  PropTypes.func,
};

export default Table;
