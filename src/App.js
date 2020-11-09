import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromUrl } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";

const spotify = new SpotifyWebApi();

function App() {
  const [token, setToken] = useState();

  //run code based on a given condition
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = "";

    const _token = hash.access_token;

    if (_token) {
      //short time memory store
      setToken(_token);
      //giving an accessToken to spotify api
      spotify.setAccessToken(_token);
      spotify.getMe().then((user) => {
        console.log("USER", user);
      });
    }

    // console.log("I have a token", token);
  }, []);

  return (
    //BEM
    <div className="app">{token ? <h1> I am logged in</h1> : <Login />}</div>
  );
}

export default App;
