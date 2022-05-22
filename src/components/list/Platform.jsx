import React from "react";
import debounce from "lodash.debounce";
import Button from "@mui/material/Button";
import ContentShell from "../ContentShell";
import Table from "../Table";
import SearchField from "../SearchField";
import { getPlatform } from "../../services/platformService";
import { useSnackbar } from "../../hooks/useSnackbar";
import ExportButton from "../ExportButton";
import { JSONSearch } from "../../utils/miscUtils";

const RowActions = ({ rowId, data }) => {
  const handleClick = () => {
    console.log(data);
  };
  return (
    <Button
      variant="text"
      onClick={handleClick}
      style={{ textTransform: "none" }}
    >
      {data?.status ? "Deactivate" : "Activate"}
    </Button>
  );
};

const Platform = () => {
  const { showSnackbar } = useSnackbar();
  const [searchValue, setSearchValue] = React.useState("");
  const [pageNo, setPageNo] = React.useState(1);
  const [orderDirection, setOrderDirection] = React.useState("asc");
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState([]);
  const [filteredlist, setFilteredList] = React.useState([]);

  const onChangePage = (data) => {
    const pageSize = 30;
    const startIndex = pageSize * (data - 1);

    setPageNo(data);
    setFilteredList(list.slice(startIndex, startIndex + pageSize));
  };

  const sortArray = (filteredlist, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return filteredlist.sort((a, b) =>
          a.platformId > b.platformId ? 1 : b.platformId > a.platformId ? -1 : 0
        );
      case "desc":
        return filteredlist.sort((a, b) =>
          a.platformId < b.platformId ? 1 : b.platformId < a.platformId ? -1 : 0
        );
    }
  };

  const ColoumnActions = (data) => {
    console.log(data);
  };

  const handleSortRequest = () => {
    console.log("It's working!!!");
    setList(sortArray(list, orderDirection));
    setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
  };

  const onSearchFieldChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);

    if (!value?.length) {
      onChangePage(pageNo);
      return;
    }

    setFilteredList(JSONSearch(list, ["name", "code", "statusText"], value));
  };

  const optimizedSearch = debounce(onSearchFieldChange, 300);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await getPlatform();
        const pageSize = 30;
        const _list = result.map((data) => {
          return {
            ...data,
            statusText: data.status ? "Active" : "Inactive",
          };
        });

        setList(_list);
        setFilteredList(_list.slice(0, pageSize));

        showSnackbar("Platforms fetched", "success");
        setLoading(false);
      } catch (e) {
        showSnackbar(e.message || "Unable fetch platform list.");
        setLoading(false);
      }
    }

    fetchData();
    onChangePage(1);
  }, []);

  return (
    <ContentShell
      title="Platform"
      actions={
        <>
          <SearchField value={searchValue} handleChange={optimizedSearch} />
          <ExportButton list={filteredlist} fileName="platform_report" />
        </>
      }
    >
      <Table
        columns={[
          { id: "name", label: "Name" },
          { id: "code", label: "Platform Id" },
          { id: "statusText", label: "Status" },
        ]}
        data={filteredlist}
        onColumnClick={ColoumnActions}
        onClick={handleSortRequest}
        actions={RowActions}
        currentPage={pageNo}
        pageSize={30}
        totalEntries={list.length}
        onChangePage={onChangePage}
      />
    </ContentShell>
  );
};

export default Platform;
