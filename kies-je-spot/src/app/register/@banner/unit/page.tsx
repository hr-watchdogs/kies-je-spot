import Image from "next/image";

export default function UnitBanner() {
    return <div className="flex items-center justify-center w-full h-[35vh] landscape:h-[20vh] ">
        <Image src={'/onboarding/police-car.png'} alt={"Illustration password"} width={150} height={150}/>
    </div>;
}
