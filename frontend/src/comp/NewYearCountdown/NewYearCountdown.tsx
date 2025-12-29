import './NewYearCoundown.css'
import {useCallback, useEffect, useState} from "react"
import Confetti from "react-confetti"
import Particles from "react-tsparticles"
import {loadFull} from "tsparticles"

export default function NewYearCountdown() {
    const [isNewYear, setIsNewYear] = useState<boolean>(false)

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

    const particlesInit = useCallback(async (engine) => {
        await loadFull(engine)
    }, [])

    return (
        <div className="countdown-popup">
            {isNewYear ? (
                <>
                    <div className="happy-year-container">
                        <h2>🎄🎉Happy New 2026 Year!🎉🎄</h2>
                        <h3>I wish you spend New 2026 Year as awesome as You want. Let your happy and kind wishes come
                            true❄️</h3>
                    </div>
                    <div className='confettie'>
                        <Confetti width={window.innerWidth} height={window.innerHeight}/>
                    </div>
                    <div className='fireworks'>
                        <Particles
                            init={particlesInit}
                            options={{
                                fullScreen: {enable: false},
                                particles: {number: {value: 0}},
                                emitters: {
                                    direction: "top",
                                    rate: {delay: 0.5, quantity: 1},
                                    size: {width: 100, height: 0},
                                    position: {x: 50, y: 100},
                                    particles: {
                                        number: {value: 80},
                                        move: {
                                            enable: true,
                                            gravity: {enable: true},
                                            speed: {min: 10, max: 20},
                                            decay: 0.1,
                                            outModes: {default: "destroy"},
                                        },
                                        size: {value: {min: 2, max: 4}},
                                        color: {
                                            value: ["#ff0044", "#00ffcc", "#ffee00", "#ffffff"],
                                        },
                                        opacity: {value: 1},
                                    },
                                },
                            }}
                        />
                    </div>
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