"use client"
import {Heading} from "@/components/ui/Typography/Heading";
import {useEffect, useState} from "react";
import {Paragraph} from "@/components/ui/Typography/Paragraph";
import Image from "next/image";
import MapboxMap from "@/components/mapbox/Map";
import mapboxgl, {MapboxOptions, Marker} from "mapbox-gl";
import {Transition} from "@headlessui/react";
import {useRouter, useSearchParams} from 'next/navigation'
import {useSocket} from "@/context/socket";
import {Modal} from "@/components/ui/Modal";

export default function OverviewPage() {
    const socket = useSocket()
    const searchParams = useSearchParams()
    const names = searchParams.get('names')?.split(',') || []
    const [isStartingSession, setStartingSession] = useState(false)
    const [mapIsLoaded, setMapIsLoaded] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()
    const startPoint = new mapboxgl.LngLat(4.4831341686501816, 51.88601519268426);
    const onMapLoaded = (map: mapboxgl.Map) => {
        setIsLoading(false)
        setMapIsLoaded(true)
    }
    const onMapRemoved = () => {
        setMapIsLoaded(false)
    }
    let startingSession = false
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

    const startSession = async () => {
        console.info("Starting session...")
        setStartingSession(true)
        await router.push("/session/tablet")
    }

    useEffect(() => {
        socket?.on("unit:start", ()=>startSession)
    }, [])

    return (
        isStartingSession ? <div className="flex flex-col items-center justify-center space-y-6">

            <Heading type="h1">Loading map..</Heading>
            <Image alt="loading icon" className="animate-spin " src="/onboarding/loading.png" width={50} height={50}/>

            </div> :
            <div
                className=" bg-blue-500 bottom-0 h-[65vh] w-full rounded-t-[5vh] px-6 flex items-center justify-center">
                <div className="flex items-center flex-col justify-between w-full h-full space-y-2">
                    <div className="flex flex-col items-start w-full space-y-8">
                        <Heading type={"h2"}>Eenheid overzicht</Heading>
                        <div className="flex flex-col items-start space-y-4">

                            <div className="flex flex-col items-start space-y-2">
                                <Paragraph fontWeight="semiBold">Eenheidsnummer</Paragraph>
                                <span className="bg-white rounded-lg flex items-center justify-center  h-8 px-4">
                                <Paragraph className="text-blue-500" fontWeight="semibold">21:01</Paragraph>
                            </span>
                            </div>

                            <div className="flex flex-col items-start space-y-2">
                                <Paragraph fontWeight="semiBold">Agenten</Paragraph>
                                <div className="flex space-x-2">
                                    {names.map((name, index) => {
                                        return <Image key={index} alt={"User icon"} src={"/onboarding/user.png"}
                                                      width={35}
                                                      height={10}/>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-full flex flex-col">
                        <div
                            className="flex flex-col w-ful h-1/3 justify-start items-start  justify-center items-start">
                            <div className="flex flex-col w-2/3">
                                <Heading type="h3">Werkzaamheden</Heading>
                                <Paragraph fontWeight="thin" className="text-sm">
                                    De eenheid is werkzaam in Rotterdam Zuid.
                                    Vandaag zijn jullie aan het patrouilleren en beschikken jullie over een
                                    hondengeleider.
                                </Paragraph>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}
