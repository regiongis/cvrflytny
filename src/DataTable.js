import React from "react";
import Paper from "@material-ui/core/Paper";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Company", "City", "State"];

const data = [
  ["Joe James", "Test Corp", "Yonkers", "NY"],
  ["John Walsh", "Test Corp", "Hartford", "CT"],
  ["Bob Herm", "Test Corp", "Tampa", "FL"],
  ["James Houston", "Test Corp", "Dallas", "TX"]
];

const options = {
  filterType: "checkbox"
};

class DataTable extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Paper style={{ height: "600px" }}>
        <MUIDataTable title={"Employee List"} data={data} columns={columns} />
      </Paper>
    );
  }
}

export default DataTable;
