"use client"
import MapboxMap from "@/components/mapbox/Map";
import mapboxgl, {MapboxOptions, Marker} from "mapbox-gl";
import {useEffect, useState} from "react";
import Image from "next/image"
import {classNames} from "@/utils/classNames";

export const Session = () => {
    const startPoint = new mapboxgl.LngLat(4.4831341686501816, 51.88601519268426);

    const mapSettings: Omit<MapboxOptions, "container"> = {
        center: startPoint,
        zoom: 15.5,
        pitch: 45,
        // style: "mapbox://styles/mapbox/dark-v10",
        bearing: -17.6,
        antialias: true,
        attributionControl: true,
        trackResize: true
    }
    type ActiveMarker = "agent" | "unit"
    const [activeMarker, setActiveMarker] = useState<ActiveMarker>("agent")
    const addUnitMarker = (map, lngLat) => {

        const el = document.createElement('div');
        el.className = 'unit-marker';
        const marker = new Marker({draggable: true, element: el})
            .setLngLat(lngLat)
            .addTo(map)

        function onDragEnd() {
            const lngLat = marker.getLngLat();
            console.log("dragend", lngLat)
        }

        marker.on('dragend', onDragEnd);
        return marker
    }
    const addAgentMarker = (map, lngLat) => {

        const el = document.createElement('div');
        el.className = "agent-marker";
        const marker = new Marker({draggable: true, element: el})
            .setLngLat(lngLat)
            .addTo(map)

        function onDragEnd() {
            const lngLat = marker.getLngLat();
            console.log("dragend", lngLat)
        }

        marker.on('dragend', onDragEnd);
        return marker
    }

    useEffect(() => {
    }, [activeMarker])

    return (
        <section className="w-full h-screen">
            <div className="-md w-fit flex flex-row p-2  left-0 z-10 m-2 absolute space-x-4">
                <span className="bg-white w-16 h-16 rounded-full text-black flex justify-center items-center font-semibold">OC</span>
                <div className="bg-white/75 text-black text-sm w-1/2 rounded p-2 font-semibold">OC -> 21:01 Wilt u gaan naar het Hoornbeeck college aan de Carnissesingel 210 te Rotterdam. Wij krijgen meerdere telefoontjes binnen dat daar binnen zou worden gevochten. Er zou ook een mes in het spel zijn. Het schijnt er daar heftig aan toe te gaan. Ik stuur de 21:02 met u mee evenals een hondenman. OVER</div>
            </div>
            <div
                className="h-fit space-y-6 rounded flex flex-col items-center justify-around m-6 w-fit absolute z-10 right-0">
                <div
                    className={classNames("cursor-pointer flex justiy-center flex-col items-center rounded-md p-2 ", activeMarker === "agent" ? "bg-white text-black" : "bg-black/50")}
                    onClick={(e) => setActiveMarker("agent")}>
                    <Image src={"/markers/agent.png"} width={50} height={50} alt="agent marker icon"/>
                    <p>Agent</p>
                </div>
                <div
                    className={classNames("cursor-pointer flex justiy-center flex-col items-center rounded-md p-2", activeMarker === "unit" ? "bg-white text-black" : "bg-black/50")}
                    onClick={(e) => setActiveMarker("unit")}>
                    <Image src={"/markers/police-car.png"} width={50} height={50} alt="police car marker"/>
                    <p>Unit</p>
                </div>
            </div>
            <div className="h-full w-full relative z-0">
                <MapboxMap initialOptions={mapSettings} onMapLoaded={(map) => {
                    if (map) {
                        map?.target.on('click', (e) => {
                            const marker = activeMarker === "unit" ? addUnitMarker(map?.target, e.lngLat) : addAgentMarker(map?.target, e.lngLat)
                            marker.on('drag', (e) => {
                                console.log("marker dragged", e)
                            })
                        });
                    }

                }} onClick={(e) => {
                    console.log(e);
                }}/>
            </div>
        </section>
    )
}
export default Session