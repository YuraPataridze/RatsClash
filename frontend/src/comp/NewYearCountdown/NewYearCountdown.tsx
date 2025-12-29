import './NewYearCoundown.css'
import {useEffect, useState} from "react";

export default function NewYearCountdown() {
    const [isNewYear, setIsNewYear] = useState<boolean>(false)

    const [hrs, setHrs] = useState<number>(0)
    const [min, setMin] = useState<number>(0)
    const [sec, setSec] = useState<number>(0)

    useEffect(() => {
        function updateTimer() {
            let now = new Date()
            let newYear = new Date(`Jan 01 ${now.getFullYear() + 1} 00:00:00`)

            // в мс получаем сколько до нг
            const msDiff = newYear - now

            // это мы не мс просто переводим в сек
            let totalSec = Math.floor(msDiff / 1000)

            let hrsToNewYear = Math.floor(totalSec / 60 / 60)
            let minToNewYear = Math.floor((totalSec % (60 * 60)) / 60)
            let secToNewYear = Math.floor(totalSec % 60)

            // сетаем
            setSec(secToNewYear)
            setMin(minToNewYear)
            setHrs(hrsToNewYear)
        }

        updateTimer()

        const timer = setInterval(updateTimer, 1000)

        return function () {
            clearInterval(timer)
        }
    }, [])

    return (
        <div className="countdown-popup">
            <div className="countdown-popup-window">
                <div className="countdown-popup-content">
                    <h2>☃️🎄New 2026 Year in🎄☃️:</h2>
                    <div className="countdown-box">
                        <div>
                            <h3 className="hrs">{hrs}</h3>
                        </div>
                        <div>
                            <h3 className="min">{min}</h3>
                        </div>
                        <div>
                            <h3 className="sec">{sec}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}