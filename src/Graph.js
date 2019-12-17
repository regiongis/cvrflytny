import React from "react";
import Paper from "@material-ui/core/Paper";
import { VictoryBar, VictoryChart, Bar, VictoryTheme } from "victory";

const getSummaryData = dat => {
  let data = dat.map(feature => feature.properties);
  let tilfl = data.filter(x => {
    return x.status === "Tilflytter";
  }).length;
  let frafl = data.filter(x => x.status === "Fraflytter").length;
  let oph = data.filter(x => x.status === "Ophørt").length;
  let ny = data.filter(x => x.status === "Nystartet").length;
  return [
    { x: "Fraflytter", y: frafl },
    { x: "Tilflytter", y: tilfl },
    { x: "Ophørt", y: oph },
    { x: "Nystartet", y: ny }
  ];
};

// const getSummaryPerCategory = data => {
//   let _data = data.map(feature => feature.properties);
//   let stats = {
//     fraflytter: {},
//     tilflytter: {},
//     ophoert: {},
//     nystartet: {}
//   };
//   let summary = {
//     fraflytter: _data.filter(x => x.status === "Fraflytter"),
//     tilflytter: _data.filter(x => x.status === "Tilflytter"),
//     ophoert: _data.filter(x => x.status === "Ophørt"),
//     nystartet: _data.filter(x => x.status === "Nystartet")
//   };
//   for (let key in summary) {
//     let elem = summary[key];
//     elem.forEach(category => {
//       // console.log('category name =>', category);
//       let k = category.hovedbranche;
//       if (k in stats[key]) {
//         stats[key][k] = stats[key][k] + 1;
//       } else {
//         stats[key][k] = 1;
//       }
//     });
//   }
//   return stats;
// };
/*
const getBrancheData = data => {
  let _data = data.map(feature => feature.properties);
  let stats = {};
  _data.forEach(element => {
    let key = element.hovedbranche;
    if (key in stats) {
      stats[key] = stats[key] + 1;
    } else {
      stats[key] = 0;
    }
  });
  return stats;
};
*/
class GraphData extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
      style: {
        data: { fill: "tomato" }
      }
    };
  }

  render() {
    const handleMouseOver = () => {
      const fillColor = this.state.clicked ? "blue" : "tomato";
      const clicked = !this.state.clicked;
      this.setState({
        clicked,
        style: {
          data: { fill: fillColor }
        }
      });
    };

    let catData = getSummaryData(this.props.data);
    //let sumData = getSummaryPerCategory(this.props.data);

    return (
      <div>
        <Paper style={{ height: "600px" }}>
          <VictoryChart
            height={200}
            width={300}
            // domainPadding={{ x: 50, y: [0, 20] }}
            theme={VictoryTheme.material}
            domainPadding={6}
            // scale={{ x: "time" }}
          >
            <VictoryBar
              // barRatio={0.4}
              barWidth={8}
              dataComponent={<Bar events={{ onMouseOver: handleMouseOver }} />}
              style={{
                data: {
                  fill: d => {
                    //console.log("inside fill ", d);
                    if (d.datum.x === "Fraflytter") return "orange";
                    if (d.datum.x === "Tilflytter") return "green";
                    if (d.datum.x === "Ophørt") return "red";
                    if (d.datum.x === "Nystartet") return "blue";
                  }
                }
              }}
              data={catData}
              labels={d => d.datum.y}
            />
          </VictoryChart>
        </Paper>
      </div>
    );
  }
}

export default GraphData;
