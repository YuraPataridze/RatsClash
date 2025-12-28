import './NewYearCoundown.css'

export default function NewYearCountdown() {
    return (
        <div className="countdown-popup">
            <div className="countdown-popup-window">
                <div className="countdown-popup-content">
                    <h1>New 2026 Year in:</h1>
                    <div className="countdown-box">
                        <div className="hrs">
                            <h3>00</h3>
                        </div>
                        <div className="min">
                            <h3>00</h3>
                        </div>
                        <div className="sec">
                            <h3>00</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}