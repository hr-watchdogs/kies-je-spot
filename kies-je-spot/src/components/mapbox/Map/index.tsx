import * as React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
    initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;

    onMapLoaded?(map: mapboxgl.Map): void;

    onMapRemoved?(): void;
}

function MapboxMap({initialOptions = {}, onMapLoaded, onMapRemoved}: MapboxMapProps) {
    const [map, setMap] = React.useState<mapboxgl.Map>();

    const mapNode = React.useRef(null);


    React.useEffect(() => {
        const node = mapNode.current;

        if (typeof window === "undefined" || node === null) return;

        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mapbox/streets-v11",
            zoom: 9,
            ...initialOptions,
        });

        setMap(mapboxMap);


        if (onMapLoaded) mapboxMap.once("load", onMapLoaded);
        if (map instanceof mapboxgl.Map) {
            map.on("style.load", () => {
                const layers = map.getStyle().layers;
                const labelLayer = layers.find((layer) => {
                    return layer.type === 'symbol' && layer.layout && 'text-field' in layer.layout;
                });

                const labelLayerId = labelLayer ? labelLayer.id : undefined;

                map.addLayer(
                    {
                        id: "add-3d-buildings",
                        source: "composite",
                        "source-layer": "building",
                        filter: ["==", "extrude", "true"],
                        type: "fill-extrusion",
                        minzoom: 15,
                        paint: {
                            "fill-extrusion-color": "#aaa",
                            "fill-extrusion-height": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                15,
                                0,
                                15.05,
                                ["get", "height"],
                            ],
                            "fill-extrusion-base": [
                                "interpolate",
                                ["linear"],
                                ["zoom"],
                                15,
                                0,
                                15.05,
                                ["get", "min_height"],
                            ],
                            "fill-extrusion-opacity": 0.6,
                        },
                    },
                    labelLayerId
                );
            });
        }

        return () => {
            mapboxMap.remove();
            if (onMapRemoved) onMapRemoved();
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    React.useEffect(() => {
        // Resize the map when the parent container size changes
        const resizeMap = () => {
            if (map) {
                map.resize();
            }
        };

        window.addEventListener("resize", resizeMap);

        return () => {
            window.removeEventListener("resize", resizeMap);
        };
    }, [map]);


    return <div ref={mapNode} className="w-full h-64 rounded-xl"/>;
}

export default MapboxMap;