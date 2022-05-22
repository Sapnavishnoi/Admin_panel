import * as React from "react";
import * as xlsx from "xlsx";
import FileSaver from "file-saver";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";
import {useSnackbar} from "../hooks/useSnackbar";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: theme.palette.common.red,
    color: theme.palette.common.white,
    textTransform: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: 12,
    },
    "&:hover": {
      backgroundColor: theme.palette.common.red,
    },
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      fontSize: `14px !important`,
    },
  },
}));

function ExportButton({ list, fileName = "data" }) {
  const classes = useStyles();
  const { showSnackbar } = useSnackbar();

  const saveAsExcelFile = (buffer, fileName) => {
    let EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";

    const data = new Blob([buffer], {
      type: EXCEL_TYPE,
    });

    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  };

  const handleClick = () => {
    if(!list?.length){
      showSnackbar("List is empty!");
      return;
    }

    const worksheet = xlsx.utils.json_to_sheet(list);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAsExcelFile(excelBuffer, fileName);
  };

  return (
    <Button
      className={classes.button}
      variant="contained"
      startIcon={<UploadIcon className={classes.icon} />}
      onClick={handleClick}
    >
      Export
    </Button>
  );
}

export default ExportButton;
