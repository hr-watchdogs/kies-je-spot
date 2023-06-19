import Image from "next/image";

export default function Banner() {
    return <div className="flex items-center justify-center w-full h-[35vh] landscape:h-[20vh] px-8">
        <Image src={'/onboarding/otp.png'} alt={"Illustration password"} width={150} height={150}/>
    </div>;
}
