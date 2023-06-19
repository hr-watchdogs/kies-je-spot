"use client"
import {Heading} from "@/components/ui/Typography/Heading";
import {useState} from "react";
import {Paragraph} from "@/components/ui/Typography/Paragraph";
import Image from "next/image";
import MapboxMap from "@/components/mapbox/Map";
import mapboxgl, {MapboxOptions, Marker} from "mapbox-gl";
import {Transition} from "@headlessui/react";
import { useSearchParams } from 'next/navigation'

export default function OverviewPage() {
    const searchParams = useSearchParams()
    const names = searchParams.get('names')?.split(',') || []
    const [mapIsLoaded, setMapIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const startPoint = new mapboxgl.LngLat(4.4831341686501816, 51.88601519268426);
    const onMapLoaded = (map: mapboxgl.Map) => {
        setIsLoading(false)
        setMapIsLoaded(true)
    }
    const onMapRemoved = () => {
        setMapIsLoaded(false)
    }

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
    
    return (
        <div className=" bg-blue-500 bottom-0 h-[65vh] w-full rounded-t-[5vh] px-6 flex items-center justify-center">
            <div className="flex items-center flex-col justify-between w-full h-full space-y-2">
                <div className="flex flex-col items-start w-full space-y-8">

                    <Heading type={"h2"}>Eenheid overzicht</Heading>
                    <div className="flex flex-col items-start space-y-4">

                        <div className="flex flex-col items-start space-y-2">
                            <Paragraph fontWeight="semiBold">Eenheidsnummer</Paragraph>
                            <span className="bg-white rounded-lg flex items-center justify-center  h-8 px-4">
                                <Paragraph className="text-blue-500" fontWeight="semibold">41:01</Paragraph>
                            </span>
                        </div>

                        <div className="flex flex-col items-start space-y-2">
                            <Paragraph fontWeight="semiBold">Agenten</Paragraph>
                                <div className="flex space-x-2">
                                    {names.map((name, index) => {
                                        return <Image key={index} alt={"User icon"} src={"/onboarding/user.png"} width={35}
                                                    height={10}/>
                                    })}
                                </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-full flex flex-col">
                    <div className="flex flex-col w-ful h-1/3 justify-start items-start  justify-center items-start">
                        <div className="flex flex-col w-2/3">
                            <Heading type="h3">Werkzaamheden</Heading>
                            <Paragraph fontWeight="thin" className="text-sm">
                                De eenheid is werkzaam in Rotterdam Zuid.
                                Vandaag zijn jullie aan het patrouilleren en beschikken jullie over een hondengeleider.
                            </Paragraph>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-2/3 space-y-2">
                        <div className="flex flex-col w-full space-y-2 relative">
                                <Heading type="h3">Startlocatie</Heading>
                            <div className="flex flex-col w-full space-y-2 relative">
                                <Transition
                                    show={true}
                                    enter="transition-opacity duration-300"
                                    enterFrom="opacity-0"
                                    enterTo="opacity-100"
                                    leave="transition-opacity duration-300"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <div
                                        className={`${
                                            isLoading && mapIsLoaded ? "hidden" : ""
                                        }`}
                                    >
                                        <MapboxMap
                                            onMapLoaded={onMapLoaded}
                                            onMapRemoved={onMapRemoved}
                                            initialOptions={mapSettings}
                                        />
                                    </div>
                                </Transition>
                                {(isLoading) && (
                                    <div className="flex justify-center flex-col bg-gray-300/5 items-center h-64 rounded-xl absolute w-full">
                                        <Image src="/onboarding/loading.png" width={50} height={50} alt="loading icon" className="animate-spin"/>
                                        <Paragraph>Kaart aan het laden...</Paragraph>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
