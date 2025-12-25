// LS = localstorage

import Header from './comp/Header/Header'
import './App.css'
import {useEffect, useState} from 'react'


export default function App() {
    const [user_name, _set_user_name] = useState<string>("") // change in future WITH LOCALSTORAGE

    //in the furute will work changing this state(with localstorage)
    const [isEntered, _setIsEntered] = useState<string>('false')

    useEffect(() => {
        /*_setIsEntered(String(localStorage.getItem('isEntered')))*/

        if (localStorage.getItem('isEntered') === 'true') {
            _setIsEntered('true')
        } else if (localStorage.getItem('isEntered') === 'false') {
            _setIsEntered('false')
        }

        console.log('setted isEntered as' + isEntered)
    }, [isEntered])

    //!-ENTER ACCOUNT-!//
    const [enterCode, setEnterCode] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    // setting user name in LS
    useEffect(() => {
        if (!user_name) {
            _set_user_name('Unknow name')
            return
        }
        _set_user_name(String(localStorage.getItem('userName')))
    }, [])

    // show popup
    const [showedPopup, setShowedPopup] = useState<boolean>(false)

    useEffect(() => {
        if (localStorage.getItem('showedPopup') === 'true') {
            setShowedPopup(true)
        } else if (localStorage.getItem('showedPopup') === 'false') {
            setShowedPopup(false)
        }
    }, [showedPopup])

    async function handleEnter() {
        setLoading(true)

        if (enterCode === "" || enterCode === " ") {
            alert('Please, enter a valid user code')
            console.error('%cUser entered an invalid code cointains "" or " "', 'color: red')
            return
        }

        console.log(`%csending backdend user code: ${enterCode}`, "color: white")
        try {
            const response = await fetch('http://localhost:3000/api/enter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({user_code: enterCode})
            })
            const gotten_from_back_data = await response.json()
            if (!response.ok) {
                console.error(`Something's wrong. Backend said: ${gotten_from_back_data.message} || ${gotten_from_back_data.status}`)
            }
            if (gotten_from_back_data.status === 404 || gotten_from_back_data.message === 'User NOT FOUND') {
                alert('User data NOT FOUND.')
                return
            }
            console.log(`%cSuccessfully got data from server. Message: ${gotten_from_back_data.message}`, 'color: yellow')
            //_setIsEntered('true')
            localStorage.setItem('isEntered', 'true')

            // !setting fetched from back data!

            //_set_user_name(String(gotten_from_back_data.user_name))
            localStorage.setItem('userName', gotten_from_back_data.user_name)

            setCoins(Number(gotten_from_back_data.coins))
            setEarnPerClick(Number(gotten_from_back_data.earnPerClick))
            setCoinsToLevUp(Number(gotten_from_back_data.coinsToLevUp))
            _setCoinsPerSec(Number(gotten_from_back_data.coinsPerSec))
            _setLevel(Number(gotten_from_back_data.level))
            setProgressBarVal(Number(gotten_from_back_data.progressBarVal))
            _setMaxProgressVal(Number(gotten_from_back_data._maxProgressVal))

            //show popup
            //localStorage.setItem('showedPopup', 'true')

            alert(`Successfully entered account ${gotten_from_back_data.user_name}. Pls, RESTART THE PAGE to continue`)
        } catch (e) {
            setLoading(false)
            console.error(`%cUNKNOW ERROR: ${e}`, 'color: red')
        } finally {
            setLoading(false)
        }
    }

    //!-PLAYFIELD-!//

    // coins state
    const [coins, setCoins] = useState<number>(
        Number(localStorage.getItem("coins")) || 0
    )
    const [earnPerClick, setEarnPerClick] = useState<number>(1)
    const [coinsToLevUp, setCoinsToLevUp] = useState<number>(100)
    const [coinsPerSec, _setCoinsPerSec] = useState<number>(0)

    useEffect(() => {
        localStorage.setItem("coins", coins.toString())
    }, [coins])

    // level  
    const [_level, _setLevel] = useState<number>()

    // progress-bar states
    const [progressBarVal, setProgressBarVal] = useState<number>(coins)
    const [_maxProgressVal, _setMaxProgressVal] = useState<number>(coins)

    // manage click func
    function manageClick() {
        // test
        console.log("CLICKED +1")

        //setCoins(Number(coins) + earnPerClick)
        //setProgressBarVal(Number(coins) + 1)

        setCoins(prev => prev + earnPerClick)
    }

    useEffect(() => {
        setProgressBarVal(coins)
    }, [coins])

    useEffect(() => {
        if (coins >= coinsToLevUp) {
            setCoinsToLevUp(prev => prev + 100)
            setEarnPerClick(prev => prev + 1)
            console.log('leveled up')
        }
    }, [coins])

    const [loadingPF, setLoadingPF] = useState<boolean>(false)

    // send new user data to backend
    useEffect(() => {
        // делаем fetch to /api/game/update с PUT запросом.

        const putFetching = setTimeout(() => {
            if (isEntered === 'true') {
                async function putUserDatainBackend() {
                    try {
                        const response = await fetch('http://localhost:3000/api/game/update', {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                user_code: localStorage.getItem('userName'),
                                coins: coins,
                                earnPerClick: earnPerClick,
                                coinsToLevUp: coinsToLevUp,
                                coinsPerSec: coinsPerSec,
                                level: _level,
                                progressBarVal: progressBarVal,
                                maxProgressVal: _maxProgressVal,
                            })
                        })

                        const gotten_data = await response.json()

                        if (!response.ok) {
                            alert(gotten_data.message || 'Error. Try again.')
                            console.log('%cAfter putting new user data in backend we got error: ' +
                                gotten_data.message, 'background: #fa6800;' +
                                'background: linear-gradient(90deg,rgba(250, 104, 0, 1) 39%, rgba(225, 250, 0, 1) 73%);' +
                                'color: white; font-size: 30px')
                            return
                        }

                        console.log('%cSuccessfully put in backend new user data', 'background: #25fa00;\n' +
                            'background: linear-gradient(90deg,rgba(37, 250, 0, 1) 35%, rgba(0, 208, 250, 1) 62%); color: black')
                    } catch (e) {
                        alert('Something went wrong\nCheck browser console for more')
                        console.log(`%cCought unknow error:\n${e}`, 'background: #fa6800;' +
                            'background: linear-gradient(90deg,rgba(250, 104, 0, 1) 39%, rgba(225, 250, 0, 1) 73%);' +
                            'color: white; font-size: 30px')
                    }
                }

                putUserDatainBackend()
            }
        }, 500)

        return function () {
            clearTimeout(putFetching)
        }
    }, [coins, earnPerClick, coinsToLevUp, coinsPerSec, _level, progressBarVal])

    // get user data from backend
    useEffect(() => {
        // делаем fetch to /api/coins/get, получаем оттуда данные, помещаем эти данные в useStates

        if (isEntered === 'true') {
            async function getUserDataFromBackend() {
                const response = await fetch('http://localhost:3000/api/user_data/get', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({user_code: localStorage.getItem('userName')})
                })
                const gotten_from_back_data = await response.json()

                if (!response.ok) {
                    console.error(`Something's wrong. Backend said: ${gotten_from_back_data.message} || ${gotten_from_back_data.status}`)
                }

                if (gotten_from_back_data.message === 'User not found') {
                    console.error('While fetching user data from backend ' +
                        'we collide with strange error - user NOT FOUND!')
                    return
                }

                console.warn(gotten_from_back_data)

                setCoins(Number(gotten_from_back_data.coins))
                setEarnPerClick(Number(gotten_from_back_data.earnPerClick))
                setCoinsToLevUp(Number(gotten_from_back_data.coinsToLevUp))
                _setCoinsPerSec(Number(gotten_from_back_data.coinsPerSec))
                _setLevel(Number(gotten_from_back_data.level))
                setProgressBarVal(Number(gotten_from_back_data.progressBarVal))
                _setMaxProgressVal(Number(gotten_from_back_data._maxProgressVal))

                console.log('%cSuccessfully fetched user data from backend', 'color: green')
            }

            getUserDataFromBackend()
        }
    }, [])

    //here will be func that each 10s data fly on back and there update

    return (
        <div className='App'>
            {/*{!showedPopup ? (
                <div className='popup'>
                    <div className="popup-bg"></div>
                    <div className="popup-content">
                        <AttentionPopup/>
                    </div>
                </div>
            ) : (null)}*/}
            <div className="header">
                <Header userName={user_name}/>
            </div>
            {isEntered === 'true' ? (
                <>
                    <div className="play-field">
                        <>
                            <div className="bar">
                                <div className="bar-content">
                                    <div className="bar-tab">
                                        <p>Earn per click</p>
                                        <div className="coin">
                                            <img src="/assets/coinICON.svg" alt="coin"/>
                                            <p>{earnPerClick}</p>
                                        </div>
                                    </div>
                                    <div className="bar-tab">
                                        <p>Coins level up</p>
                                        <div className="coin">
                                            <img src="/assets/coinICON.svg" alt="coin"/>
                                            <p>{coinsToLevUp}</p>
                                        </div>
                                    </div>
                                    <div className="bar-tab">
                                        <p>Auto earn p/sec</p>
                                        <div className="coin">
                                            <img src="/assets/coinICON.svg" alt="coin"/>
                                            <p>{coinsPerSec}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="coins">
                                {loading ? (
                                    <>
                                        Loading
                                    </>
                                ) : (
                                    <>
                                        <img src="/assets/coinICON.svg" alt="coins"/>
                                        <h1>{coins}</h1>
                                    </>
                                )}
                            </div>
                            <div className="progress-bar">
                                <progress value={progressBarVal} max={coinsToLevUp}></progress>
                            </div>
                            <div className="click-btn">
                                <div onClick={manageClick} className="button">
                                    <img src="/assets/coinICON.svg" alt="click-btn"/>
                                </div>
                            </div>
                        </>
                    </div>
                </>
            ) : (
                <>
                    <div className="window">
                        <div className="content">
                            <h2>Enter Account</h2>
                            <div className="form">
                                <div className="form-content">
                                    <input value={enterCode} onChange={(e) => setEnterCode(e.target.value)}
                                           type="password" id="psw-input" placeholder="User unique code"/>
                                    <button onClick={handleEnter}>Enter!</button>
                                    {loadingPF ? (
                                        <>
                                            <div className="loader"></div>
                                        </>
                                    ) : (null)}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}