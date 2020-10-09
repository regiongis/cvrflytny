import React from "react";
import L from "leaflet";
//import axios from "axios";

const style = {
  width: "100%",
  height: "1200px"
};

var geojsonLayer;
var map;
window.geojsonLayer = geojsonLayer;
window.lfMap = map;

var legend = L.control({ position: "bottomleft" });
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Signaturforklaring</h4>";
  div.innerHTML +=
    '<i style="background:#0020d7"></i><span>NyStartet</span><br>';
  div.innerHTML +=
    '<i style="background:#d79700"></i><span>Fraflyttet</span><br>';
  div.innerHTML +=
    '<i style="background:#298b30"></i><span>Tilflyttet</span><br>';
  div.innerHTML +=
    '<i style="background:#c10a0a"></i><span>Ophørt</span><br>';
  return div;
};

class MapData extends React.Component {
  constructor(props) {
    super(props); // console.log(props.data);
    this.state = {
      data: {},
      renderLegend: false
    };
  }

  renderMap(data) {
    var myAttributionText =
      '&copy; <a target="_blank" href="https://download.kortforsyningen.dk/content/vilk%C3%A5r-og-betingelser">Styrelsen for Dataforsyning og Effektivisering</a>';
    var kftoken = "d12107f70a3ee93153f313c7c502169a";
    var toposkaermkortwmts = L.tileLayer.wms(
      "https://services.kortforsyningen.dk/topo_skaermkort",
      {
        layers: "dtk_skaermkort_daempet",
        token: kftoken,
        format: "image/png",
        attribution: myAttributionText
      }
    );

    var kommuneWms = L.tileLayer.wms(
      "https://services.kortforsyningen.dk/service?request=GetCapabilities&servicename=dagi"
       +"&service=WMS&version=1.1.1",
       {
         layers:"kommune",
         format:"image/png",
         token: kftoken,
         transparent:true,
         minZoom: 11

       }
    );
    window.lfMap = L.map("map", {
      center: [55.876823, 9.961644],//[55.2, 12.2],
      zoom: 8,
      layers: [
        toposkaermkortwmts,
        kommuneWms,
      ]
    });

    // var legend = L.control({ position: "bottomleft" });
    // legend.onAdd = function(map) {
    //   var div = L.DomUtil.create("div", "legend");
    //   div.innerHTML += "<h4>Signaturforklaring</h4>";
    //   div.innerHTML +=
    //     '<i style="background:#0020d7"></i><span>NyStartet</span><br>';
    //   div.innerHTML +=
    //     '<i style="background:#d79700"></i><span>Fraflyttet</span><br>';
    //   div.innerHTML +=
    //     '<i style="background:#298b30"></i><span>Tilflyttet</span><br>';
    //   div.innerHTML +=
    //     '<i style="background:#c10a0a"></i><span>Ophørt</span><br>';
    //   return div;
    // };
    // if(this.state.renderLegend){
    //   legend.addTo(map);
    // }

     L.control.scale().addTo(window.lfMap);
  }
  renderFeatures(data) {
   legend.addTo(window.lfMap);
    var costumIcon = function(status) {
      function selector(status) {
        const imgUrl = "https://raw.githubusercontent.com/magloire/cvrflytny/master/public/";
        switch (status) {
          case "Tilflytter":
            
            return imgUrl + "img/t.png";
          case "Fraflytter":
            return imgUrl + "img/f.png";
          case "Nystartet":
            return imgUrl + "img/n.png";
          case "Ophørt":
            return imgUrl + "img/o.png";
          default:
            break;
        }
      }
      return L.icon({
        iconUrl: selector(status),
        shadowUrl: "img/shadow.png",
        iconAnchor: [16, 37],
        shadowAnchor: [20, 35],
        popupAnchor: [0, -30]
      });
    };

    if (
      window.geojsonLayer !== undefined) {
      window.lfMap.removeLayer(
        window.geojsonLayer);
    }

    function getCenterPoint(data) {
      let features = data.filter(feature =>
        ["Nystartet", ""].includes(feature.properties.status)
      );
      if (features.length === 0) return null;
      return features[0].geometry.coordinates;
    }
    function onEachFeature(feature, layer) {
      layer.bindPopup(
        "<strong>" +
          feature.properties.status +
          "</strong></br><hr>" +
          feature.properties.navn +
          '</br><a href="https://datacvr.virk.dk/data/visenhed?enhedstype=produktionsenhed&id=' +
          feature.properties["p-nummer"] +
          '" target="_blank">Se mere her</a>'
      );
    }

    window.geojsonLayer = L.geoJSON(data, {
      onEachFeature: onEachFeature,
      pointToLayer: function(feature, latlng) {
        //return L.circleMarker(latlng, geojsonMarkerOptions);
        return L.marker(latlng, {
          icon: costumIcon(feature.properties.status)
        });
      }
    }).addTo(window.lfMap);

    let centerCoords = getCenterPoint(data);
    if (centerCoords) window.lfMap.setView([centerCoords[1], centerCoords[0]], 12);
    else window.lfMap.fitBounds(
      window.geojsonLayer.getBounds());
  }
  componentDidMount() {
    this.renderMap(this.props.data);
    if (this.props.data.length > 0) {
      this.renderFeatures(this.props.data);
    }
  }

  componentDidUpdate() {
    console.log("componentdidupdate");
    //const { data } = this.props;
    //this.renderFeatures(data);
    if (this.props.data.length > 0) {
      this.renderFeatures(this.props.data);
    } else {
      console.log("props empty");
    }
  }

  renderMarkers(data) {
    //select marker depending on status
    //let mymap = this.map;
    var costumIcon = function(status) {
      function selector(status) {
        switch (status) {
          case "Tilflytter":
            return "img/t.png";
          case "Fraflytter":
            return "img/f.png";
          case "Nystartet":
            return "img/n.png";
          case "Ophørt":
            return "img/o.png";
          default:
            break;
        }
      }
      return L.icon({
        iconUrl: selector(status),
        shadowUrl: "img/shadow.png",
        iconAnchor: [16, 37],
        shadowAnchor: [20, 35],
        popupAnchor: [0, -30]
      });
    };
    //check if there is markers on the map and remove
    if (window.geojsonLayer !== undefined) {
      window.lfMap.removeLayer(
        window.geojsonLayer);
    }

    function onEachFeature(feature, layer) {
      console.log("called for each feature");
      layer.bindPopup(
        "<strong>" +
          feature.properties.status +
          "</strong></br><hr>" +
          feature.properties.navn +
          '</br><a href="https://datacvr.virk.dk/data/visenhed?enhedstype=produktionsenhed&id=' +
          feature.properties["p-nummer"] +
          '" target="_blank">Se mere her</a>'
      );
    }

    
window.geojsonLayer = L.geoJSON(data, {
      onEachFeature: onEachFeature,
      pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {
          icon: costumIcon(feature.properties.status)
        });
      }
    }).addTo(window.lfMap);

    // console.log(geojsonLayer.getBounds());
    // map.fitBounds(geojsonLayer.getBounds());
  }

  render() {
    return <div id="map" style={style}></div>;
  }
}

export default MapData;
