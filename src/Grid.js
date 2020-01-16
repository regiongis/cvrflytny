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

const getVirkForm = form =>{
  switch(form){
    case 10 : return "Enkeltmandsvirksomhed";
    case 15 : return "Personligt ejet Mindre Virksomhed";
    case 20 : return "Dødsbo";
    case 30 : return "Interessentskab";
    case 40 : return "Kommanditselskab";
    case 45 : return "Medarbejderinvesteringsselskab";
    case 50 : return "Partrederi";
    case 60 : return "Aktieselskab";
    case 70 : return "Kommanditaktieselskab/Partnerskab";
    case 80 : return "Anpartsselskab";
    case 81 : return "Iværksætterselskab";
    case 90 : return "Fond";
    case 100 : return "Erhvervsdrivende fond";
    case 110 : return "Forening";
    case 115 : return "Frivillig forening";
    case 130 : return "Andelselskab(-forening)";
    case 140 : return "Andelselskab(-forening) med begrænset ansvar";
    case 150 : return "Forening eller selskab med begrænset ansvar";
    case 151 : return "Selskab med begrænset ansvar";
    case 152 : return "Forening med begrænset ansvar";
    case 160 : return "Europæisk Økonomisk Firmagruppe";
    case 170 : return "Filial af udenlandsk aktieselskab, kommanditakties";
    case 180 : return "Filial af udenlandsk anpartselskab eller selskab";
    case 190 : return "Filial af udenlandsk virksomhed med begrænset ansv";
    case 195 : return "SCE-selskab";
    case 196 : return "Filial af SCE-selskab";
    case 200 : return "Filial af anden udenlandsk virksomhed";
    case 210 : return "Anden udenlandsk virksomhed";
    case 220 : return "Fast forretningssted af Europæisk økonomisk Firmag";
    case 230 : return "Offentlige arbejdsplads";
    case 235 : return "Offentlige arbejdsplads";
    case 245 : return "Offentlige arbejdsplads";
    case 250 : return "Offentlige arbejdsplads";
    case 260 : return "Folkekirkelige institutioner";
    case 270 : return "Enhed under oprettelse i Erhvervs- og Selskabsstyr";
    case 280 : return "Øvrige virksomhedsformer";
    case 285 : return "Særlig finansiel virksomhedsform";
    case 290 : return "SE-selskab";
    case 291 : return "Filial af SE-selskab";
    case 990 : return "Uoplyst virksomhedsform";
    default : return form;
  }
}

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
      { columnName: "indlæst dato", width: 120 }
    ];

    const { statusColumns } = this.state;
    const pc = this.state.pcols;
    const rows = this.props.data.map((feature, index) => {
      feature.properties["keyIndex"] = index;
      let s = feature.properties['fuldt ansvarlige deltagere'];
      if(s !== null && s.length > 0)
        feature.properties['fuldt ansvarlige deltagere'] = s.replace(/\"/g,'');
      if(s === "NULL")
        feature.properties['fuldt ansvarlige deltagere'] = "";
      // let form = feature.properties.virksomhedsform;
      // feature.properties.virksomhedsform = getVirkForm(form);
      // if (
      //   [230, 235, 245, 250].includes(form)
      // ) {
      //   feature.properties.virksomhedsform = "Offentlige arbejdspladser";
        
      // }
      // if(form === 81) feature.properties.virksomhedsform = "IVS";
      return feature.properties;
    });

    // console.log(rows);
    return (
      <Paper
        style={{
          height: "600px"
        }}
      >
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
