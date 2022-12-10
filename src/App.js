import { useEffect, useState } from "react";

import "./App.css";
import Select from "./components/select.component";

function App() {
  const [word, setWord] = useState();
  const [all, setAll] = useState([]);
  const [main, setMain] = useState([]);
  const [audio, setAudio] = useState();
  const [phonetic, setPhonetic] = useState();

  const dataApi = async () => {
    const data = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const dataJson = await data.json();
    setAll(dataJson);
    setMain(dataJson[0]);
    
    const url = dataJson[0].phonetics[0].audio;
    const phoneticText = dataJson[0].phonetic;

    setAudio(url);
    setPhonetic(phoneticText);
  };

  useEffect(() => {
    dataApi();
  }, []);

  const Search = () => {
    dataApi();
    setWord("");
  };

  const handleKeyPress = (event) => {
    if (event.keyCode == 13) {
      Search()
    }
      
  };
  return (
    <div className="App">
      <div className="container-fluid pocket-dictionary">
        <div className="row ">
          <div className="col-12 text-center fw-bold fs-1 p-3 text-white ">
            Pocket Dictionary
          </div>
          <div className="form-floating py-3 pb-5 d-flex justify-content-center">
            <input
              type="text"
              className="form-control-sm border-0 px-2 col-md-3 col-sm-4"
              placeholder="Type your word"
              id="floatingInput"
              value={word}
              onChange={(e) => setWord(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              className="btn btn-dark text-light col-md-1 col-sm-2 mx-2"
              onClick={Search}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        {word === "" ? (
          <Select all={all} main={main} audio={audio} phonetic= {phonetic} />
        ) : (
          <div className="fs-1 text-capitalize text-center fw-bold text-decoration-underline text-white bg-dark extra">
            type a word in the box
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
