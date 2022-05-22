import React from "react";
import debounce from "lodash.debounce";
import Button from "@mui/material/Button";
import ContentShell from "../ContentShell";
import Table from "../Table";
import SearchField from "../SearchField";
import ExportButton from "../ExportButton";
import { useSnackbar } from "../../hooks/useSnackbar";
import { getOperators } from "../../services/operatorService";
import { formatDate, JSONSearch } from "../../utils/miscUtils";

const Operator = () => {
  const { showSnackbar } = useSnackbar();

  const [searchValue, setSearchValue] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [pageNo, setPageNo] = React.useState(1);
  const [list, setList] = React.useState([]);
  const [filteredlist, setFilteredList] = React.useState([]);

  const onChangePage = (data) => {
    const pageSize = 30;
    const startIndex = pageSize * (data - 1);

    setPageNo(data);
    setFilteredList(list.slice(startIndex, startIndex + pageSize));
  };

  const onSearchFieldChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (!value?.length) {
      onChangePage(pageNo);
      return;
    }

    setFilteredList(
      JSONSearch(
        list,
        ["name", "description", "statusText", "platformId"],
        value
      )
    );
  };

  const optimizedSearch = debounce(onSearchFieldChange, 300);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await getOperators();
        const pageSize = 30;
        const _list = result.map((data) => {
          return {
            ...data,
            addedOnText: formatDate(data.addedOn),
            statusText: data.status ? "Active" : "Inactive",
          };
        });

        setList(_list);
        setFilteredList(_list.slice(0, pageSize));

        showSnackbar("Operators fetched", "success");
        setLoading(false);
      } catch (e) {
        showSnackbar(e.message || "Unable fetch Operators list.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ContentShell
      title="Operators"
      actions={
        <>
          <SearchField value={searchValue} handleChange={optimizedSearch} />
          <ExportButton list={filteredlist} fileName="api_report" />
        </>
      }
      loading={loading}
    >
      <Table
        columns={[
          { id: "name", label: "Name" },
          { id: "platformId", label: "Platform Id" },
          { id: "description", label: "Description" },
          { id: "statusText", label: "Assignment Title" },
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

export default Operator;
