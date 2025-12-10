import "./EnterAcc.css"

export default function EnterAcc() {
    return (
        <>
            <div className="window">
                <div className="content">
                    <h2>Enter Account</h2>
                    <form>
                        <div className="form">
                            <input type="password" id="psw-input" placeholder="Account unique code" />
                            <button>Enter!</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}