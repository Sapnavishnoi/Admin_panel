import React from "react";
import debounce from "lodash.debounce";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ContentShell from "../ContentShell";
import Table from "../Table";
import SearchField from "../SearchField";
import ExportButton from "../ExportButton";
import LoadingIndicator from "../LoadingIndicator";
import { useSnackbar } from "../../hooks/useSnackbar";
import { getPlan } from "../../services/roleService";
import configData from "../../config/config.json";
import { JSONSearch } from "../../utils/miscUtils";

const RowActions = ({ rowId, data }) => {
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [loading, setLoading] = React.useState(false);

  const handleClick = async (e) => {
    switch (e.target.name) {
      case "deactivate":
        setLoading(true);
      //   try {
      //     const result = await deActivateUserId(data._id);
      //     if (result.Unauthorized) navigate(configData.routes.signIn);

      //     setLoading(false);
      //     showSnackbar("Successful!", "success");
      //   } catch (e) {
      //     showSnackbar(e.message || "Something went wrong");
      //   }
      //   break;
      // case "access":
      //   localStorage.setItem("updateUser", JSON.stringify(data));
      //   navigate(configData.routes.user.editUserAccess);
      //   break;
      // case "details":
      //   localStorage.setItem("updateUser", JSON.stringify(data));
      //   navigate(configData.routes.user.editUser);
      //   break;
      // default:
    }
  };

  return (
    <Box style={{ display: "flex", flexDirection: "column" }}>
      {!loading ? (
        <Button
          variant="text"
          name="deactivate"
          onClick={handleClick}
          style={{ textTransform: "none" }}
        >
          Deactivate
        </Button>
      ) : (
        <Box style={{ textAlign: "center" }}>
          <LoadingIndicator customSize={20} />
        </Box>
      )}

      <Button
        variant="text"
        name="access"
        onClick={handleClick}
        style={{ textTransform: "none" }}
      >
        Access
      </Button>
      <Button
        variant="text"
        name="details"
        onClick={handleClick}
        style={{ textTransform: "none" }}
      >
        Details
      </Button>
    </Box>
  );
};

const Plan= () => {
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
        [
            "planName",
            "month",
            "slotName",
            "timing",
            // "slotsId",
            // "kidsId",
            "status",
            "amount",
            "userId"
        ],
        value
      )
    );
  };

  const optimizedSearch = debounce(onSearchFieldChange, 300);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const result = await  getPlan();
        console.log(result,"result..")
        const pageSize = 30;
        const _list = (result.detail).map((data) => {
          return {
            ...data
          };
        });

        setList(_list);
        setFilteredList(_list.slice(0, pageSize));
        localStorage.removeItem("updateUser");

        showSnackbar("Detail fetched", "success");
        setLoading(false);
      } catch (e) {
        showSnackbar(e.message || "Unable fetch list.");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <ContentShell
      title="Plan Detail"
      actions={
        <>
          <SearchField value={searchValue} handleChange={optimizedSearch} />
          <ExportButton list={filteredlist} fileName="kids_report" />
        </>
      }
      loading={loading}
    >
      <Table

     
        columns={[
        
          { id:  "planName", label: "Plan Name" },
          { id:  "month", label:  "Month"},
          { id:  "slotName", label: "SlotName"},
          { id:   "timing", label:  "Timing"},
        //   { id:   "slotsId", label: "SlotsId"},
        //   { id:  "kidsId", label:  "KidsId"},
          { id:  "status", label:  "Status"},
          { id:   "amount",label:  "Amount"},
          { id:  "userId", label: "UserId"},

        ]}
        data={filteredlist}
        actions={RowActions}
        currentPage={pageNo}
        pageSize={30}
        totalEntries={list.length}
        onChangePage={onChangePage}
      />
    </ContentShell>
  );
};

export default Plan;
