import "./EnterAcc.css"

export default function EnterAcc() {
    function handleEnter() {}

    return (
        <>
            <div className="window">
                <div className="content">
                    <h2>Enter Account</h2>
                    <div className="form">
                        <div className="form-content">
                            <input type="password" id="psw-input" placeholder="Account unique code" />
                            <button>Enter!</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}