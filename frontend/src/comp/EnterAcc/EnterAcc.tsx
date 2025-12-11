import "./EnterAcc.css"
import { useState } from "react"

export default function EnterAcc() {
    const [loading, setLoading] = useState<boolean>(true)

    function handleEnter() {
        alert('clicked')
    }

    return (
        <>
            <div className="window">
                <div className="content">
                    <h2>Enter Account</h2>
                    <div className="form">
                        <div className="form-content">
                            <input type="password" id="psw-input" placeholder="Account unique code" />
                            <button onClick={handleEnter}>Enter!</button>
                            {loading ? (
                                <>
                                    <div className="loader"></div>
                                </>
                            ) : (null)}
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}