"use client"
import MapboxMap from "@/components/mapbox/Map";
import mapboxgl, {MapboxOptions, Marker, Popup} from "mapbox-gl";
import {Transition} from '@headlessui/react'
import {useEffect, useState} from "react";
import Image from "next/image"
import {classNames} from "@/utils/classNames";
import {useSocket} from "@/context/socket";
import {Timeline} from "@/components/ui/Timeline";

export const Session = () => {
    const {socket} = useSocket()
    const [mapIsloaded, setMapIsLoaded] = useState(false)
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
    type ActiveMarker = "agent" | "unit" | "hotzone"
    const [activeMarker, setActiveMarker] = useState<ActiveMarker>("agent")
    const [activeUnit, setActiveUnit] = useState("20:21")
    const addUnitMarker = (map, lngLat) => {
        // todo: send event to websocket
        const el = document.createElement('div');
        el.className = 'unit-marker';
        const popUp = new Popup({className: "bg-red-800", focusAfterOpen: true, closeButton: true})
        const marker = new Marker({draggable: true, element: el})
            .setPopup(popUp)
            .setLngLat(lngLat)
            .addTo(map)

        map.flyTo({
            center: lngLat,
            zoom: 17,
            pitch: 45,
            essential: true,
        });

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
        console.log(socket)

    }, [activeMarker])

    return (
        <section className="w-full h-screen">
            {mapIsloaded ? <Transition
                    show={mapIsloaded}
                    enter="transition-opacity duration-1000"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="-md w-fit flex flex-row p-2 left-0 z-10 m-2 absolute space-x-4">

                    <span
                        className="bg-white w-16 h-16 rounded-full text-[#932323] flex justify-center items-center font-semibold">OC</span>
                        <div className="bg-white/75 text-[#932323] text-sm w-1/2 rounded p-2 font-semibold">OC -> 21:01 Wilt
                            u
                            gaan naar het Hoornbeeck college aan de Carnissesingel 210 te Rotterdam. Wij krijgen meerdere
                            telefoontjes binnen dat daar binnen zou worden gevochten. Er zou ook een mes in het spel zijn.
                            Het schijnt er daar heftig aan toe te gaan. Ik stuur de 21:02 met u mee evenals een hondenman.
                            OVER
                        </div>
                    </div>
                    <div
                        className="h-fit space-y-6 rounded flex flex-col items-center justify-around m-6 w-fit absolute z-10 right-0">
                        <div className="flex bg-white rounded-xl">
                            <div
                                className={classNames("cursor-pointer flex justify-center flex-col items-center rounded-md p-2 bg-white text-black")}
                                onClick={(e) => setActiveMarker("agent")}>
                                <Image src={"/politie-icon.svg"} width={50} height={50} alt="agent marker icon"/>
                                <p className="font-semibold text-sm text-center">Eenheid <br/>{activeUnit}</p>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div
                                className={classNames("cursor-pointer flex justiy-center flex-col items-center rounded-md p-2 ", activeMarker === "agent" ? "bg-white text-black" : "bg-black/50")}
                                onClick={(e) => setActiveMarker("agent")}>
                                <Image src={"/markers/agent.png"} width={50} height={50} alt="agent marker icon"/>
                                <p className="font-semibold text-sm">Agent</p>
                            </div>
                            <div
                                className={classNames("cursor-pointer flex justiy-center flex-col items-center rounded-md p-2", activeMarker === "unit" ? "bg-white text-black" : "bg-black/50")}
                                onClick={(e) => setActiveMarker("unit")}>
                                <Image src={"/markers/police-car.png"} width={50} height={50} alt="police car marker"/>
                                <p className="font-semibold text-sm">Unit</p>
                            </div>
                            <div
                                className={classNames("cursor-pointer flex justiy-center flex-col items-center rounded-md p-2 ", activeMarker === "hotzone" ? "bg-white text-black" : "bg-black/50")}
                                onClick={(e) => setActiveMarker("hotzone")}>
                                <Image src={"/markers/hotzone.svg"} width={50} height={50} alt="hotzone marker icon"/>
                                <p className="font-semibold text-sm">Hotzone</p>
                            </div>
                        </div>
                    </div>
                    <div className={"absolute h-32 items-center my-2 justify-center items-center flex w-full bottom-0 z-10"}>
                        <Timeline/>
                    </div>

                </Transition>
                : null}

            <div className="h-full w-full relative z-0">
                <MapboxMap initialOptions={mapSettings} onMapLoaded={(map) => {
                    setMapIsLoaded(true)
                    if (map) {
                        map?.target.on('click', (e) => {
                            const marker = addUnitMarker(map?.target, e.lngLat)
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