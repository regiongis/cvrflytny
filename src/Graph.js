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

    return (
      <div>
        <Paper style={{ height: 800, width:800, margin:'auto' }}>

          <VictoryChart
            height={200}
            width={300}
            theme={VictoryTheme.material}
            domainPadding={15}
          >
            <VictoryBar
              barWidth={8}
              dataComponent={<Bar events={{ onMouseOver: handleMouseOver }} />}
              style={{
                data: {
                  fill: d => {
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
