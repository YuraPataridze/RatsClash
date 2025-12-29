import './NewYearCoundown.css'
import {useEffect, useState} from "react";

export default function NewYearCountdown() {
    const [isNewYear, setIsNewYear] = useState<boolean>(true)

    const [hrs, setHrs] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)

    useEffect(() => {
        function timerFinished() {
            setIsNewYear(true)
        }

        function updateTimer() {
            const now: Date = new Date()
            const newYear: Date = new Date(`Jan 01 ${now.getFullYear() + 1} 00:00:00`)

            // в мс получаем сколько до нг
            const msDiff: number = Number(newYear) - Number(now)

            // это мы мс просто переводим в сек
            const totalSec: number = Math.floor(msDiff / 1000)

            const hrsToNewYear: number = Math.floor(totalSec / 60 / 60)
            // получаем ОСТАТКИ от целого. типа СКОЛЬКО У НАС ОСТАЕТСЯ сек/мин и мы это ИСПОЛЬЗУЕМ
            const minToNewYear: number = Math.floor((totalSec % (60 * 60)) / 60)
            const secToNewYear: number = Math.floor(totalSec % 60)

            // сетаем
            setSec(secToNewYear)
            setMin(minToNewYear)
            setHrs(hrsToNewYear)

            // проверяем не закончился ли таймер
            if (secToNewYear <= 0 && minToNewYear <= 0 && hrsToNewYear <= 0) {
                timerFinished()
            }
        }

        updateTimer()

        const timer = setInterval(updateTimer, 1000)

        return function () {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="countdown-popup">
            {isNewYear ? (
                <>
                    Happy 2026!
                </>
            ) : (
                <div className="countdown-popup-window">
                    <div className="countdown-popup-content">
                        <h2>☃️🎄New 2026 Year in🎄☃️:</h2>
                        <div className="countdown-box">
                            <div>
                                <h3 className="hrs">{hrs} </h3>
                                <h4>hrs</h4>
                            </div>
                            <div>
                                <h3 className="min">{min} </h3>
                                <h4>min</h4>
                            </div>
                            <div>
                                <h3 className="sec">{sec}</h3>
                                <h4>sec</h4>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}