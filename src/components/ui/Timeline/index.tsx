import {BackwardIcon, ForwardIcon, PauseIcon, PlayIcon} from "@heroicons/react/20/solid";
import {FC, HTMLAttributes, PropsWithChildren, useEffect, useState} from "react";
import {classNames} from "@/utils/classNames";

enum ButtonType {
    PLAY,
    PAUSE,
    FORWARD,
    REWIND
}

interface TimelineButtonProps extends HTMLAttributes<HTMLDivElement>{
    icon: ButtonType.PLAY | ButtonType.PAUSE | ButtonType.FORWARD | ButtonType.REWIND
}

const TimelineButton: FC<TimelineButtonProps> = ({icon = ButtonType.PLAY, ...props}) => {


    const iconMap = new Map([
        [ButtonType.PLAY, PlayIcon],
        [ButtonType.PAUSE, PauseIcon],
        [ButtonType.FORWARD, ForwardIcon],
        [ButtonType.REWIND, BackwardIcon],
    ]);

    const Icon = iconMap.get(icon) as FC<HTMLAttributes<HTMLSpanElement>>

    return <div {...props}
                   className={classNames("w-16 h-16 flex items-center cursor-pointer shadow-xl shadow-[#1c1c1c]/50 justify-center transition-colors duration-500 p-2 rounded-full", icon === ButtonType.PLAY ?
                       "bg-blue-300 hover:bg-blue-400 " :
                       "bg-blue-400"
                   )}>
        <Icon className="w-16 h-16"/>
    </div>
}

interface TimelineProps extends HTMLAttributes<HTMLDivElement> {
    start: ()=>void
}

export const Timeline: FC<TimelineProps> = ({start,...props}) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [percentage, setPercentage] = useState(1)
    const [steps, setSteps] = useState([{}, {}, {}])
    useEffect(() => {
        const percentage = Math.round(100 / steps.length)
        setPercentage(
            percentage
        )
    }, [])

    return <div className="rounded-xl  p-1  h-fit w-1/2" {...props}>
        <div className="flex flex-col space-y-6 w-full justify-center items-center">

            <div className="flex flex-row space-x-6">
                {
                    !isPlaying ? <TimelineButton
                        icon={ButtonType.PLAY}
                        onClick={(e) => {
                            setIsPlaying(true)
                            start()
                        }}
                    /> : <TimelineButton
                        icon={ButtonType.PAUSE}
                        onClick={(e) => setIsPlaying(false)}
                    />
                }
            </div>
        </div>
    </div>
}