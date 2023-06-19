import {BackwardIcon, ForwardIcon, PauseIcon, PlayIcon} from "@heroicons/react/20/solid";
import {FC, HTMLAttributes, PropsWithChildren, useEffect, useState} from "react";
import {ButtonType} from "@/components/ui/Button";
import {classNames} from "@/utils/classNames";

enum ButtonType {
    PLAY,
    PAUSE,
    FORWARD,
    REWIND
}

interface TimelineButtonProps {
    icon: ButtonType.PLAY | ButtonType.PAUSE | ButtonType.FORWARD | ButtonType.REWIND
}

const TimelineButton: FC<TimelineButtonProps> = ({icon = ButtonType.PLAY, ...props}) => {


    const iconMap = new Map([
        [ButtonType.PLAY, PlayIcon],
        [ButtonType.PAUSE, PauseIcon],
        [ButtonType.FORWARD, ForwardIcon],
        [ButtonType.REWIND, BackwardIcon],
    ]);

    const Icon = iconMap.get(icon) as FC

    return <button {...props}
                   className={classNames("w-16 h-16 flex items-center justify-center transition-colors duration-500 p-2 rounded-full", icon === ButtonType.PLAY ?
                       "bg-blue-300 hover:bg-gray-500" :
                       ""
                   )}>
        <Icon className="w-16 h-16"/>
    </button>
}

interface TimelineProps extends HTMLAttributes<HTMLButtonElement> {

}

export const Timeline: FC<TimelineProps> = ({...props}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [percentage, setPercentage] = useState(1)
    const [steps, setSteps] = useState([{}, {}, {}])
    useEffect(() => {
        const percentage = Math.round(100 / steps.length)
        setPercentage(
            percentage
        )
    }, [])

    return <div className="rounded-xl bg-white/80 p-1  h-fit w-1/2" {...props}>
        <div className="flex flex-col space-y-6 w-full justify-center items-center">
            <div className="w-full border-2 border-gray-300 rounded-full">
                <div className={classNames("bg-gray-500  h-8  rounded-full", `w-[${percentage}%]`)}></div>
            </div>

            <div className="flex flex-row space-x-6">
                {
                    !isPlaying ? <TimelineButton
                        icon={ButtonType.PLAY}
                        onClick={(e) => setIsPlaying(true)}
                    /> : <TimelineButton
                        icon={ButtonType.PAUSE}
                        onClick={(e) => setIsPlaying(false)}
                    />
                }
            </div>
        </div>
    </div>
}