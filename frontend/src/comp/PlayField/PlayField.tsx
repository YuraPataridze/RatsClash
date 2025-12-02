import { useState } from "react"
import "./PlayFIeld.css"

export default function PlayField() {
    const [coins, setCoins] = useState<number>(982)

    return (
        <>
            <div className="coins">
                <img src="./assets/coinICON.png" alt="coins" />
                <h1>{coins}</h1>
            </div>
        </>
    )
}