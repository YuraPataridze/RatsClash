import { useState } from "react"
import "./PlayFIeld.css"

export default function PlayField() {
    const [coins, setCoins] = useState<number>(982)
    const [earnPerClick, setEarnPerCkick] = useState<number>(1)
    const [coinsToLevUpm, setCoinsToLevUp] = useState<number>(10)
    const [coinsPerSec, setCoinsPerSec] = useState<number>(0)

    return (
        <>
            <div className="bar">
                <div className="bar-content">
                    <div className="bar-tab">
                        <p>Earn per click</p>
                        <div className="coin">
                            <img src="./assets/coinICON.png" alt="coin" />
                            <p>{earnPerClick}</p>
                        </div>
                    </div>
                    <div className="bar-tab">
                        <p>Coins to level up</p>
                        <div className="coin">
                            <img src="./assets/coinICON.png" alt="coin" />
                            <p>{coinsToLevUpm}</p>
                        </div>
                    </div>
                    <div className="bar-tab">
                        <p>Auto earn p/sec</p>
                        <div className="coin">
                            <img src="./assets/coinICON.png" alt="coin" />
                            <p>{coinsPerSec}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="coins">
                <img src="" alt="coins" />
                <h1>{coins}</h1>
            </div>
        </>
    )
}