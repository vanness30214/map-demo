import * as React from 'react';
import {useEffect} from 'react';
import mapboxgl from "mapbox-gl";
import {MapboxLayer} from "@deck.gl/mapbox";
import {Tile3DLayer} from "@deck.gl/geo-layers";
import {Tiles3DLoader} from "@loaders.gl/3d-tiles";







mapboxgl.accessToken =
    "pk.eyJ1IjoiaW4ydHdhbiIsImEiOiJja3l6bjJ0ZWIwY2d0Mm5yemZ3NWFmOWhjIn0._B39LsH99PmOk74938_tUg";

const modelAddress = [111.4817662886914,33.33385845425036]

const model = "https://map-1258113332.cos.accelerate.myqcloud.com/3dTiles/demo-map/data/tileset.json"

interface IProps {

};




const Index: React.FC<IProps> = (props) => {

    const [zoomNow,setZoomNow] = React.useState(16)
    const [mapSDK,setMapSDK] = React.useState<any>(null)
    const handleInit =async () => {





        const createTile3dLayer = (url:any,id:any) => new MapboxLayer({
            id,
            type: Tile3DLayer,
            pointSize: 1,
            data: url,
            opacity: 1,
            // pickable: true,
            loader: Tiles3DLoader,

            onTileLoad:  (tileHeader) => {
                tileHeader.content.cartographicOrigin.z -=0; 






                console.log(tileHeader.tileset,'is render');
            },

            // onTileLoad: (tileHeader) => console.log(tileHeader),
            // onHover: (Tile3DLayer, event) =>
            //     console.log("Hovered:", Tile3DLayer, event),

            _subLayerProps: {
                'scenegraph': { _lighting: "flat" }
            }
        });
        const tile3dLayer = createTile3dLayer(model,"tile3dlayer");

        //
        const map = new mapboxgl.Map({
            container: "map", // container ID
            style: 'mapbox://styles/mapbox/light-v9',
            center: modelAddress,
            zoom: zoomNow,
            bearing: -30,
            pitch: 60,
        });

        map.on("load", () => {
            map.addLayer(tile3dLayer);
            console.log(tile3dLayer,map,'is render');
            setMapSDK(map)
            console.log("load");
        })
    }
    useEffect(()=>{
        handleInit()
    },[])



    return (
        <>
            <div id="map" style={{
                position: 'absolute',
                top: '0',
                bottom: '0',
                width: '100%',
            }}></div>
        </>
    );
};
export default Index