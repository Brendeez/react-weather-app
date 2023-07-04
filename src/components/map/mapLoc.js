import { Map, Marker } from "pigeon-maps"

const MapLoc = (props) => {
    //const lat = -27.470125;
    //const long = 153.021072;
    //const long =data[0];
    //const lat =data[1];

    
    //console.log("data in maploc");
    //console.log(typeof props.latit, typeof props.longit);
    return (
        
        <>
        <Map height={500} defaultCenter={[props.latit, props.longit]} defaultZoom={12}
        >
            <Marker width={50} color={"red"} anchor={[props.latit, props.longit]} />
        </Map>
        </>
        
    );
}

export default MapLoc