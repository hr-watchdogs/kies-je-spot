import * as React from "react";
import mapboxgl, {MapMouseEvent, Marker, CirclePaint} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapboxMapProps {
    initialOptions?: Omit<mapboxgl.MapboxOptions, "container">;

    onMapLoaded?(map: mapboxgl.EventData): void;

    onMapRemoved?(): void;

    onClick?(event: MapMouseEvent): void;
}

function MapboxMap({initialOptions = {}, onMapLoaded, onMapRemoved, onClick}: MapboxMapProps) {
    const [map, setMap] = React.useState<mapboxgl.Map>();

    const mapNode = React.useRef(null);


    React.useEffect(() => {
        const node = mapNode.current;

        if (typeof window === "undefined" || node === null) return;

        const mapboxMap = new mapboxgl.Map({
            container: node,
            accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
            style: "mapbox://styles/mhvqrjdaqjpqhmqghc/cliinjqz0005601qp00io177n",
            // style: "mapbox://styles/mapbox/streets-v11",
            zoom: 9,
            ...initialOptions,
        });

        setMap(mapboxMap);

        if (initialOptions?.center) {
            const el = document.createElement('div');
            el.className = 'marker hotzone-marker';
            const marker = new Marker({
                element: el
            })
                .setLngLat(initialOptions.center)
                .addTo(mapboxMap);
        }

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
            if (onClick) {
                map.on('click', (e) => onClick(e));
            }

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


    return <div ref={mapNode} className="w-full h-full"/>;
}

export default MapboxMap;