import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import styles from './App.css';
import Chuck from './chuck.jpg';
import DarkMode from "./DarkMode.tsx";

function App() {

{/* 
1 Calls Chuck Norris API at chucknorris.io. User can search or press random button. 
2 Breakpoints for Mobile and PC, searchbox removed in mobile for streamlined experience
Rounded picture to make change more noticeable. 
Plus other responsive design. 
3 Alt tags for accessibility   
4 Light mode and darkmode toggle with default states aligned to browser
*/}

const [state, setState] = useState({
  joke: '',
  searchKeyword: '',
  searchUrl: 'https://api.chucknorris.io/jokes/search?query='
})

{/* Actual API Request  returns single .json*/}
const fetchData = async () => {
  const result = await axios.get('https://api.chucknorris.io/jokes/random');
  console.log(result.data.value)
  setState({
    ...state,
    joke: result.data.value
  })
}

{/* Searchbox function  */}

const searchJoke = (event) => {
  console.log("SEARCHJOKE: ", event.target.value);
  setState({
  ...state,
  searchKeyword: event.target.value    
  })
}

{/* Fetch Specific Joke after user search, fetches array, picks one  */}

const fetchMyJoke = async() => {
  const result = await axios.get(state.searchUrl + state.searchKeyword);
  console.log("Fetchmyjoke: ", result)
  {/* RNG, array is returned since duplicate return values are common e.g. "kick", picks one of */}
  const randomO = Math.floor(Math.random()*result.data.result.length + 1);
  {/* For debugging on browser console  */}
  console.log( randomO );
  setState({
    ...state,
    joke: result.data.result[randomO].value
  })
}
  return (

    <div className="container">
      <div className= "row">
        <div class="col-6">
            {/* Calls up darkmode toggle stylesheet and functions  */}
          <DarkMode />
        </div>
        {/* Search and About, top right  */}
        <div class="col">
          <a href="https://www.google.com/search?q=chuck+norris">🔎</a>
          <a href="http://michaelmurdoch.org">❓</a>
        </div>  
      </div>

      <h1 className={"title"}>Chuck Norris API</h1>
      <div className= "row">
        <div class="col-md-6">
          <img src={Chuck} class="img-rounded" alt="Chuck Norris with uzis, flag background" />
        </div>
        <div className="col-md-6 searchJokeCol">
          <div className="d-none d-md-block card" alt="Search box">
            <div className="card-header">
              Search for a word
            </div>   
            <div className="card-body">
              <input type = "text" alt="Search for Joke"  onChange={searchJoke}/>
              <button className="btn btn-sm" onClick={fetchMyJoke}>Search</button>
            </div>
        </div>
          <div classname="chuckBox">
              {/* Big Yellow Button Renders  */}
            <button className="btn btn-warning btn-lg" onClick={fetchData}>Give me a Chuck Fact!</button>
          </div>
        </div>
      </div>
  {/* This is where the joke renders  */}
  <h4>{state.joke}</h4>
  </div>
  );
}

export default App;