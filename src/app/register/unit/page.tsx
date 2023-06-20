"use client"
import {Heading} from "@/components/ui/Typography/Heading";
import {Button, ButtonType} from "@/components/ui/Button";
import {RegisterUnitNames} from "@/components/ui/Form/RegisterUnitNames";
import {useEffect, useState} from "react";
import {Paragraph} from "@/components/ui/Typography/Paragraph";
import Link from "next/link";
import {useRouter} from "next/navigation";


export default function Page() {
    const [names, setNames] = useState([""])
    const [emptyFields, setEmptyFields] = useState<(number | undefined)[] | undefined>(undefined)
    const router = useRouter()

    return (
        <div className=" bg-blue-500 bottom-0 h-[65vh] w-full rounded-t-[5vh] p-6 flex items-center justify-center">
            <div className="flex items-center flex-col justify-between w-full h-full">
                <div className="flex flex-col w-full items-center h-full justify-around">
                    <div className="flex flex-col items-center w-full space-y-2 h-1/3">
                        <Heading type={"h2"}>Voer namen agenten in</Heading>
                        <Paragraph fontWeight="regular">Voer de namen in van de agenten in de eenheid.</Paragraph>
                        <Paragraph fontWeight="regular" className="text-xs">Maximaal 3 personen</Paragraph>
                    </div>

                    <div className="flex flex-col w-full max-w-xl justify-start items-center h-2/3">
                        <RegisterUnitNames names={names} setNames={setNames} emptyFields={emptyFields}/>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 w-full">
                    <Link href="/register/overview" prefetch={true}>
                    <Button
    className="w-full"
    buttonType={ButtonType.PRIMARY}
    onClick={async (event) => {
        event.preventDefault()
        await router.prefetch("/register/overview")
        const invalidFields:(number | undefined)[] = names.map((name, position) => {
            if (name.length === 0) {
                console.log("name:", name)
                return position
            }
        }).filter((field)=> (typeof field != "undefined" ))
        setEmptyFields(invalidFields)
        if (invalidFields.length === 0) {
            // Add the names to the URL as a query parameter
            const url = new URL('/register/overview', window.location.href);
            url.searchParams.set('names', names.join(','));
            await router.push(url.toString());
        }
    }}
>
    Volgende
</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
