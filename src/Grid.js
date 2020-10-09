import React from "react";
import Paper from "@material-ui/core/Paper";
import {
  Template,
  TemplatePlaceholder,
  TemplateConnector,
} from "@devexpress/dx-react-core";

import {
  SortingState,
  IntegratedSorting,
  FilteringState,
  IntegratedFiltering,
  DataTypeProvider
} from "@devexpress/dx-react-grid";

import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFilterRow,
  TableColumnResizing
} from "@devexpress/dx-react-grid-material-ui";

const getColor = status => {
  if (status === "Fraflytter") return "orange";
  else if (status === "Tilflytter") return "green";
  else if (status === "Nystartet") return "blue";
  else if (status === "Ophørt") return "red";
  else return "blue";
};

const StatusFormatter = ({ value }) => {
  let color = getColor(value);
  return <b style={{ color: color }}>{value}</b>;
};

const StatusTypeProvider = props => (
  <DataTypeProvider formatterComponent={StatusFormatter} {...props} />
);

const PnummerFormatter = ({ value }) => {
  let link = `https://datacvr.virk.dk/data/visenhed?enhedstype=produktionsenhed&id=${value}`;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  );
};

const PnummerProvider = props => (
  <DataTypeProvider formatterComponent={PnummerFormatter} {...props} />
);


const getRowId = row => {
  return row["keyIndex"];
};

class GridData extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      data: [],
      sorting: [{ columnName: "hovedbranche", direction: "desc" }],
      statusColumns: ["status"],
      pcols: ["p-nummer"],
      grouping: [{ columnName: "status" }]
    };
    this.changeSorting = sorting => this.setState({ sorting });
    this.changeGrouping = grouping => this.setState({ grouping });
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const updateData = this.props.updateData;
    const total = this.props.total;
    const totalRendered = this.props.totalRendered;
    const cols = [
      { name: "status", title: "Status" },
      { name: "cvr-nummer", title: "CVR nummer" },
      { name: "p-nummer", title: "P nummer" },
      { name: "hovedbranche", title: "Branche" },
      { name: "virksomhedsform", title: "virksomhedsform" },
      { name: "navn", title: "Virksomhedsnavn" },
      { name: "fuldt ansvarlige deltagere", title: "Kontaktperson" },
      { name: "kvartalbes_interval", title: "Antal ansatte" },
      { name: "kommunekode", title: "Kommunekode" },
      { name: "vejnavn", title: "Vejnavn" },
      { name: "husnummer", title: "Husnummer" },
      { name: "postnummer", title: "Postnummer" },
      { name: "postdistrikt", title: "By" },
      { name: "emailadresse", title: "Email" },
      { name: "startdato", title: "Startdato cvr" },
      { name: "indlæst dato", title: "Indlæst dato" }
    ];

    const defaultColumnWidths = [
      { columnName: "status", width: 100 },
      { columnName: "cvr-nummer", width: 100 },
      { columnName: "p-nummer", width: 100 },
      { columnName: "hovedbranche", width: 150 },
      { columnName: "virksomhedsform", width: 150 },
      { columnName: "navn", width: 150 },
      { columnName: "fuldt ansvarlige deltagere", width: 120 },
      { columnName: "kvartalbes_interval", width: 120 },
      { columnName: "kommunekode", width: 120 },
      { columnName: "vejnavn", width: 120 },
      { columnName: "husnummer", width: 120 },
      { columnName: "postnummer", width: 120 },
      { columnName: "postdistrikt", width: 120 },
      { columnName: "emailadresse", width: 120 },
      { columnName: "startdato", width: 120 },
      { columnName: "indlæst dato", width: 120 }
    ];

    const { statusColumns } = this.state;
    const pc = this.state.pcols;
    const rows = this.props.data.map((feature, index) => {
      feature.properties["keyIndex"] = index;
      let s = feature.properties['fuldt ansvarlige deltagere'];
      if(s !== null && s.length > 0)
        feature.properties['fuldt ansvarlige deltagere'] = s.replace(/"/g,'');
      if(s === "NULL")
        feature.properties['fuldt ansvarlige deltagere'] = "";
      return feature.properties;
    });

    // console.log(rows);
    return (
      <Paper
        style={{
          height: "100%"
        }}
      >
  <h6 style={{textAlign:"center"}}>{`${totalRendered} ud af ${total}`}</h6>
        <Grid
          rows={rows}
          columns={cols}
          getRowId={getRowId}
          style={{
            height: "100%"
          }}
        >
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />
          <SortingState
            defaultSorting={[{ columnName: "status", direction: "desc" }]}
          />
          <IntegratedSorting />
          <StatusTypeProvider for={statusColumns} />
          <PnummerProvider for={pc} />
          <VirtualTable height={600} />
          <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
          <TableHeaderRow showSortingControls />
          <TableFilterRow />
          <Template name="root">  
            <TemplateConnector>  
              {({ rows: filteredRows }) => { 
                console.log("filteredRows"); 
                console.log(filteredRows);
                updateData(filteredRows);  
                return <TemplatePlaceholder />;  
              }}  
            </TemplateConnector>  
          </Template>
        </Grid>
      </Paper>
    );
  }
}
/*

                <FilteringState defaultFilters={[]} />
                <IntegratedFiltering />
                <SortingState defaultSorting={[{ columnName: 'status', direction: 'desc' }]} />
                <IntegratedSorting />
                <StatusTypeProvider 
                    for={statusColumns}
                />
                <VirtualTable
                    height="auto"
                />
                <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
                <TableHeaderRow showSortingControls />
                <TableFilterRow />

*/
export default GridData;
