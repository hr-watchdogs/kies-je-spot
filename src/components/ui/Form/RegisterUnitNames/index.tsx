import {Dispatch, FC, SetStateAction} from "react";
import {Input} from "@/components/ui/Form/Input";
import {Button, ButtonType} from "@/components/ui/Button";
import {classNames} from "@/utils/classNames";
import {MinusIcon, PlusIcon} from "@heroicons/react/20/solid";
import {Paragraph} from "@/components/ui/Typography/Paragraph";

interface RegisterUnitNamesOptions {
    names: string[]
    setNames?: Dispatch<SetStateAction<string[]>>
    emptyFields?: (number | undefined)[] | undefined

}

export const RegisterUnitNames: FC<RegisterUnitNamesOptions> = ({names, emptyFields= [], setNames}) => {
    const MAX_ARRAY_LENGTH = 3; // Set your desired maximum length
    const handleRemoveForm = (index: number) => {
        if (setNames) {
            setNames((prevNames) => {
                const updatedNames = [...prevNames];
                updatedNames.splice(index, 1);
                return updatedNames;
            });
        }
    };
    return (
        names.map((name, index) => {
            let emptyField = emptyFields?.includes(index)
            return <div key={index} className="flex w-full px-12  flex-row justify-center items-center space-x-6 ">
                <div className="flex flex-col w-full  justify-center py-2 relative">
                    <Input
                        key={index}
                        value={name}
                        className={classNames("bg-gray-300 w-full p-0 mx-0 focus:bg-white w-fit")}
                        invalid={emptyField}
                        placeholder="Vul naam in"
                        onChange={(event) => {
                            const {value} = event.target
                            if (value.length !== 0) {
                                emptyField = false
                            }
                            if (setNames) {
                                setNames((prevNames) => {
                                    const updatedNames = [...prevNames];
                                    updatedNames[index] = value;
                                    return updatedNames;
                                });
                            }
                        }
                        }
                    />
                    {emptyField? <Paragraph fontWeight="regular" className="absolute mt-24 text-xs text-red-600">Veld mag niet leeg zijn.</Paragraph>: null}
                </div>
                {
                (names.length === index + 1 || names.length === index + 1 && index === 0) && names.length !== MAX_ARRAY_LENGTH ?
                    <Button
                        buttonType={ButtonType.ROUNDED}
                        onClick={() => setNames ?
                            setNames((prevState) => {
                                if (prevState.length >= MAX_ARRAY_LENGTH) return prevState
                                return [...prevState, ""]
                            }) :
                            () => {
                                console.log("Setnames callback is not configured")
                            }
                        }
                        className=" bg-green-600 flex items-center justify-center"
                    >
                        <PlusIcon className="w-4 h-4"/>
                    </Button>
                    :
                    <Button buttonType={ButtonType.ROUNDED}
                            className=" flex items-center justify-center"
                            onClick={() => handleRemoveForm(index)}><MinusIcon className="w-4 h-4"/></Button>
            }
            </div>
        })
    )
}