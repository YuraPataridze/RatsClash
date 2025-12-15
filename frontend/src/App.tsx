import Header from './comp/Header/Header'
import './App.css'
import {useState, useEffect} from 'react'


export default function App() {
  const [user_name, _set_user_name] = useState<string>("") // change in future
    
  //in the furute will work changing this state(with localstorage)
  const [entered, _setEntered] = useState<boolean>(false)

  //!-ENTER ACCOUNT-!//
  const [enterCode, setEnterCode] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function handleEnter() { // (не актул уже)все данные, полученные с бека, мы будем передавать в playground comp через props или через localstorage или cokie
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
          const gottent_from_back_data = await response.json()
          if (!response.ok) {
              console.error(`Something's wrong. Backend said: ${gottent_from_back_data.message} || ${gottent_from_back_data.status}`)
          }
          console.log(`%cSuccessfully got data from server. Message: ${gottent_from_back_data.message}`, 'color: yellow')
          _setEntered(true)
          //console.log(`Coins of user ${gottent_from_back_data.user_code} are ${gottent_from_back_data.coins}`)//as test showing coins in console

          // !setting fetched from back data!
          _set_user_name(String(gottent_from_back_data.user_name))
          setCoins(Number(gottent_from_back_data.coins))
          setEarnPerClick(Number(gottent_from_back_data.earnPerClick))
          setCoinsToLevUp(Number(gottent_from_back_data.coinsToLevUp))
          _setCoinsPerSec(Number(gottent_from_back_data.coinsToLevUp))
          _setLevel(Number(gottent_from_back_data.level))
          setProgressBarVal(Number(gottent_from_back_data.progressBarVal))
          _setMaxProgressVal(Number(gottent_from_back_data._maxProgressVal))
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
      // fetch data
    const [loadingPF, setLoadingPF] = useState<boolean>(false)
    
    useEffect(() => {
        async function fetchCoins() {
            setLoadingPF(true)
            try {
              const response = await fetch('http://localhost:3000/api/coins')
              if (!response.ok) throw new Error('Backend HTTP error')
              const data = await response.json()
              console.log(data)
              alert('Successfuly fetched data from backend')
          } catch (err) {
              alert('You caught unknow error. More details see in browser console')
              console.error(err)
              setLoadingPF(false)
              } finally {
                setLoadingPF(false)
              }
            }
    
            fetchCoins()
        }, [])

    return (
      <div className='App'>
        <div className="header">
          <Header userName={user_name}/>
        </div>
        {entered ? (
          <>
            <div className="play-field">
              <>
            <div className="bar">
                <div className="bar-content">
                    <div className="bar-tab">
                        <p>Earn per click</p>
                        <div className="coin">
                            <img src="/assets/coinICON.svg" alt="coin" />
                            <p>{earnPerClick}</p>
                        </div>
                    </div>
                    <div className="bar-tab">
                        <p>Coins level up</p>
                        <div className="coin">
                            <img src="/assets/coinICON.svg" alt="coin" />
                            <p>{coinsToLevUp}</p>
                        </div>
                    </div>
                    <div className="bar-tab">
                        <p>Auto earn p/sec</p>
                        <div className="coin">
                            <img src="/assets/coinICON.svg" alt="coin" />
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
                        <img src="/assets/coinICON.svg" alt="coins" />
                        <h1>{coins}</h1>
                    </>
                )}
            </div>
            <div className="progress-bar">
                <progress value={progressBarVal} max={coinsToLevUp}></progress>
            </div>
            <div className="click-btn">
                <div onClick={manageClick} className="button">
                    <img src="/assets/coinICON.svg" alt="click-btn" />
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
                              <input value={enterCode} onChange={(e) => setEnterCode(e.target.value)} type="password" id="psw-input" placeholder="User unique code" />
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