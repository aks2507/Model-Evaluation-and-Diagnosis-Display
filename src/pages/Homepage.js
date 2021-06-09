import React, { useState, useEffect, useRef, useCallback } from 'react';
import '../containers/App.css';

const Homepage = () => {

  const [isSending, setIsSending] = useState(false)
  const isMounted = useRef(true)

  // set isMounted to false when we unmount the component
  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return
    // update state
    setIsSending(true)
    // send the actual request
    await API.sendRequest('/evaluate')
    // once the request is sent, update state again
    if (isMounted.current) // only update if we are still mounted
      setIsSending(false)
  }, [isSending]) // update the callback if the state changes


  return(
    <div className="App">
      <header className="App-header">
        <input type="button" disabled={isSending} onClick={sendRequest}>
          Get the list
        </input>
      </header>
    </div>
  )
};

export default Homepage
