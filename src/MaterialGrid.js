import React from "react";
import MaterialTable from "material-table";

class MaterialGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    //const data = this.props.data;
    const rows = this.props.data.map((feature, index) => {
      feature.properties["keyIndex"] = index;
      if (
        [81, 230, 235, 245, 250].includes(feature.properties.virksomhedsform)
      ) {
        console.log(
          feature.properties.virksomhedsform,
          ": ",
          feature.properties.navn
        );
      } else {
        // console.log(feature.properties.virksomhedsform, " no ivs or off");
      }
      return feature.properties;
    });
    return (
      <MaterialTable
        title="Basic Filtering Preview"
        columns={[
          { title: "Name", field: "name" },
          { title: "Surname", field: "surname" },
          { title: "Birth Year", field: "birthYear", type: "numeric" },
          {
            title: "Birth Place",
            field: "birthCity",
            lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
          },

          {
            field: "status",
            title: "Status",
            cellStyle: {
              color: "red"
            }
          },
          { field: "cvr-nummer", title: "CVR nummer" },
          { field: "p-nummer", title: "P nummer" },
          { field: "hovedbranche", title: "Branche" },
          { field: "navn", title: "Virksomhedsnavn" },
          { field: "fuldt ansvarlige deltagere", title: "Kontaktperson" },
          { field: "kommunekode", title: "Kommunekode" },
          { field: "vejnavn", title: "Vejnavn" },
          { field: "husnummer", title: "Husnummer" },
          { field: "postnummer", title: "Postnummer" },
          { field: "postdistrikt", title: "By" },
          { field: "emailadresse", title: "Email" },
          { field: "indlæst dato", title: "Indlæst dato" }
        ]}
        data={
          rows
          //     [
          //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
          //   {
          //     name: "Zerya Betül",
          //     surname: "Baran",
          //     birthYear: 2017,
          //     birthCity: 34
          //   }
          // ]
        }
        options={{
          filtering: true
        }}
      />
    );
  }
}

export default MaterialGrid;
