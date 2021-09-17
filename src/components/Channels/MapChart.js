import React, { memo, Component } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import WorldMap from './WorldMap.json'


class MapChart extends Component {

  state={

    world: WorldMap
  
  }

  mouseEnterHandler = (e, name, peopleNum) =>{

    
const rounded = peopleNum => {
  if (peopleNum > 1000000000) {
    return  new Intl.NumberFormat('es-ES').format(peopleNum) + ' Milr.';
  } else if (peopleNum > 1000000) {
    return new Intl.NumberFormat('es-ES').format(peopleNum) + ' Mil.';
  } else if (peopleNum > 1000) {
    return new Intl.NumberFormat('es-ES').format(peopleNum) + ' Tis.';
  } else {
    return new Intl.NumberFormat('es-ES').format(peopleNum);
  }
};


    let value = name + ' - ' + rounded(peopleNum)

    this.props.setTooltipContentEnter(value)



  }

  mouseLeaveHandler = () =>{

    this.props.setTooltipContentLeave()


  }

  render(){


    const MapC = ({ setTooltipContent }) => {
      return (
        <>
          <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
            <ZoomableGroup>
              <Geographies geography={this.state.world}>
                {({ geographies }) =>
                  geographies.map(geo => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onMouseEnter={(e) => {

                        /*const { NAME, POP_EST } = geo.properties;
                        let name = geo.properties.NAME
                        let peopleNum = geo.properties.POP_EST*/

                       // this.props.setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                        //this.props.setTooltipContent(name + ' - ' + rounded(peopleNum));

                        this.mouseEnterHandler(e, geo.properties.NAME, geo.properties.POP_EST)
                      }}
                      onMouseLeave={() => {
                        //this.props.setTooltipContent("");
                        this.mouseLeaveHandler()
                      }}
                      style={{
                        default: {
                          fill: "#808080",
                          outline: "none"
                        },
                        hover: {
                          fill: "#dfdfdf",
                          outline: "none"
                        },
                        pressed: {
                          fill: "#E42",
                          outline: "none"
                        }
                      }}
                    />
                  ))
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>
        </>
    );
    };

    return(

      <MapC />

      
    )
  }

}



export default memo(MapChart)



