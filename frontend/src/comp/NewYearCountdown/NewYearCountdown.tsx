import './NewYearCoundown.css'

export default function NewYearCountdown() {
    return (
        <div className="countdown-popup">
            <div className="countdown-popup-window">
                <div className="countdown-popup-content">
                    <h2>☃️🎄New 2026 Year in🎄☃️:</h2>
                    <div className="countdown-box">
                        <div>
                            <h3 className="hrs">00</h3>
                        </div>
                        <div>
                            <h3 className="min">00</h3>
                        </div>
                        <div>
                            <h3 className="sec">00</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}