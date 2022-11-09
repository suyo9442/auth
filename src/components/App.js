import React, { useState, useEffect } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  
  // firebase가 초기화되고 나서 isLoggedIn이 바뀌도록 useEffect
  useEffect(()=> {
    onAuthStateChanged(authService, (user)=> {
      if(user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  })

  
  // // user 또는  null을 반환
  // console.log(authService.currentUser)
  // setInterval(()=>{
  //   console.log(authService.currentUser)
  // }, 2000)

  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </div>
  );
}

export default App;
