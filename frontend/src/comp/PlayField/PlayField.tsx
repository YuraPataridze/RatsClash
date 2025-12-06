// to-do: added localstorage for all states here

import { useEffect, useState } from "react"
import "./PlayFIeld.css"

export default function PlayField() {
    useEffect(() => {
        localStorage.setItem("coins", coins)
    })

    // coins state
    const [coins, setCoins] = useState<any>(localStorage.getItem("coins"))
    const [earnPerClick, setEarnPerClick] = useState<number>(1)
    const [coinsToLevUp, setCoinsToLevUp] = useState<number>(100)
    const [coinsPerSec, setCoinsPerSec] = useState<number>(0)

    // level
    const [level, setLevel] = useState<number>()

    // progress-bar states
    const [progressBarVal, setProgressBarVal] = useState<number>(coins)
    const [maxProgressVal, setMaxProgressVal] = useState<number>(coins)

    // manage click fun
    function manageClick() {
        // test
        console.log("CLICKED +1")

        setCoins(Number(coins) + earnPerClick)
        setProgressBarVal(Number(coins) + 1)

        if (Number(coins) >= coinsToLevUp) {
            console.log("leveled up!")
            setCoinsToLevUp(coinsToLevUp + 100)
            setEarnPerClick(earnPerClick + 2)
        }

        if (coinsToLevUp >= 500) {
            setCoinsToLevUp(coinsToLevUp + 500)
        }
    }

    return (
        <>
            <div className="bar">
                <div className="bar-content">
                    <div className="bar-tab">
                        <p>Earn per click</p>
                        <div className="coin">
                            <img src="./assets/coinICON.svg" alt="coin" />
                            <p>{earnPerClick}</p>
                        </div>
                    </div>
                    <div className="bar-tab">
                        <p>Coins level up</p>
                        <div className="coin">
                            <img src="./assets/coinICON.svg" alt="coin" />
                            <p>{coinsToLevUp}</p>
                        </div>
                    </div>
                    <div className="bar-tab">
                        <p>Auto earn p/sec</p>
                        <div className="coin">
                            <img src="./assets/coinICON.svg" alt="coin" />
                            <p>{coinsPerSec}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="coins">
                <img src="./assets/coinICON.svg" alt="coins" />
                <h1>{coins}</h1>
            </div>
            <div className="progress-bar">
                <progress value={progressBarVal} max={maxProgressVal}></progress>
            </div>
            <div className="click-btn">
                <div onClick={manageClick} className="button">
                    <img src="./assets/coinICON.svg" alt="click-btn" />
                </div>
            </div>
        </>
    )
}