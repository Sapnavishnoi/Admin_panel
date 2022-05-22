import React from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ContentShell from "../ContentShell";
import Table from "../Table";
import SearchField from "../SearchField";
import ExportButton from "../ExportButton";
import { SimpleSelectInput } from "../FormSelectInput";
import { SimpleDateInput } from "../FormDateInput";
import { useSnackbar } from "../../hooks/useSnackbar";
import { getDailySummary } from "../../services/reportService";
import { startOfMonth } from "../../utils/miscUtils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: "fit-content",
    marginBottom: 16,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  field: {
    width: 180,
    margin: "0 8px 0 8px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: 8,
    },
  },
  buttonContainer: {
    minWidth: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 24,
    [theme.breakpoints.down("sm")]: {
      height: "fit-content",
      minWidth: "100%",
      paddingTop: 12,
    },
  },
  button: {
    backgroundColor: theme.palette.common.red,
    color: theme.palette.common.white,
    textTransform: "none",
    width: "100% !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
      maxWidth: "100% !important",
      margin: "0 8px 0 0",
    },
    "&:hover": {
      backgroundColor: theme.palette.common.red,
    },
  },
}));

const FilterSection = ({
  handleChange = () => {},
  onSubmitClick = () => {},
  filterOptions,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.field}>
        <SimpleDateInput
          label="From:"
          id="startDate"
          name="startDate"
          fullWidth
          format="DD-MM-YYYY"
          variant="inline"
          removeBottomMargin={true}
          value={filterOptions.startDate}
          onChange={(date) => handleChange(date, "startDate")}
        />
      </Box>
      <Box className={classes.field}>
        <SimpleDateInput
          label="To:"
          id="endDate"
          name="endDate"
          fullWidth
          format="DD-MM-YYYY"
          variant="inline"
          removeBottomMargin={true}
          value={filterOptions.endDate}
          onChange={(date) => handleChange(date, "endDate")}
        />
      </Box>
      <Box className={classes.field}>
        <SimpleSelectInput
          name="platformId"
          label="Platforms"

          options={filterOptions.platforms}
          value={filterOptions.platformId}
          onChange={(e) => handleChange(e.target.value, "platformId")}
        />
      </Box>
      {/* {filterOptions.platformId && (
        <Box className={classes.field}>
          <SimpleSelectInput
            name="operatorID"
            label="operators"
            options={filterOptions.operators}
            value={filterOptions.operatorId}
            onChange={(e) => handleChange(e.target.value, "operatorID")}
          />
        </Box>
      )}
      {filterOptions.platformId && filterOptions.operatorId && (
        <Box className={classes.field}>
          <SimpleSelectInput
            name="brandId"
            label="brands"
            options={filterOptions.brands}
            value={filterOptions.brands}
            onChange={(e) => handleChange(e.target.value, "brandId")}
          />
        </Box>
      )} */}
      <Box className={classes.buttonContainer}>
        <Button className={classes.button} onClick={onSubmitClick}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

const DailySummary = () => {
  const { showSnackbar } = useSnackbar();

  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [pageNo, setPageNo] = React.useState(1);
  const [list, setList] = React.useState([]);
  const [filteredlist, setFilteredList] = React.useState([]);
  const [filterOptions, setFilterOptions] = React.useState({
    startDate: startOfMonth(),
    endDate: new Date(),
    platforms: [],
    platformId: "",
    // operators: [],
    // operatorId: "",
    // brands: [],
    // brandId: "",
  });

  const onChangePage = (data) => {
    const pageSize = 30;
    const startIndex = pageSize * (data - 1);

    setPageNo(data);
    setFilteredList(list.slice(startIndex, startIndex + pageSize));
  };

  const onSearchFieldChange = (e) => setSearchValue(e.target.value);

  const handleFilterChange = (value, event) =>
    setFilterOptions({
      ...filterOptions,
      [event]: value,
    });

  const onSubmitClick = () => console.log(filterOptions);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await getDailySummary({});
        const pageSize = 30;
        const _list = result.data;

        setList(_list);
        setFilterOptions({
          ...filterOptions,
          platforms: result.formOptions.platform,
          // operators: result.formOptions.operator,
          // brands: result.formOptions.brand,
        });
        setFilteredList(_list.slice(0, pageSize));

        showSnackbar("Daily summary fetched", "success");
        setLoading(false);
      } catch (e) {
        console.log(e);
        showSnackbar(e.message || "Unable fetch Daily summary list.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ContentShell
      title="Daily Summary"
      actions={
        <>
          <SearchField value={searchValue} handleChange={onSearchFieldChange} />
          <ExportButton list={filteredlist} fileName="user_report" />
        </>
      }
      loading={loading}
    >
      <FilterSection
        filterOptions={filterOptions}
        handleChange={handleFilterChange}
        onSubmitClick={onSubmitClick}
      />
      <Table
        columns={[
          { id: "date", label: "Date" },
          { id: "uaps", label: "UAPs" },
          { id: "spins", label: "Spins" },
          { id: "bet", label: "Bet" },
          { id: "win", label: "Win" },
          { id: "ggr", label: "GGR" },
          { id: "averageBet", label: "Average Bet" },
          { id: "jpWin", label: "JP Win" },
          { id: "rtp", label: "RTP" },
        ]}
        data={filteredlist}
        currentPage={pageNo}
        pageSize={30}
        totalEntries={list.length}
        onChangePage={onChangePage}
      />
    </ContentShell>
  );
};

export default DailySummary;
