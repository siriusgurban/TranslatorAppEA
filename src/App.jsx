import { useEffect, useState } from "react";
import "./index.css";

// const API_KEY_1 = "9d9588302emsh58804fa5a30d4d9p1b947ajsn659ea6ae2269";
// const API_KEY_2 = "6e28a6c431msh0e9881c32ad023bp1037b5jsneeb2674a6b68";
// const API_KEY_3 = "31e52734bdmshab176c6eee229bdp1418e5jsn20cdd91ff8a8";

function App() {
  const [languages, setLanguages] = useState([]);
  const [langCode1, setLangCode1] = useState("");
  const [langCode2, setLangCode2] = useState("");
  const [langName1, setLangName1] = useState("");
  const [langName2, setLangName2] = useState("");
  const [textSource, setTextSource] = useState("");
  const [textReady, setTexttextReady] = useState("");
  const [mouseItem, setMouseItem] = useState("");

  useEffect(() => {
    async function addTranslator() {
      const url = "https://text-translator2.p.rapidapi.com/translate";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "31e52734bdmshab176c6eee229bdp1418e5jsn20cdd91ff8a8",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
        body: new URLSearchParams({
          source_language: langCode1,
          target_language: langCode2,
          text: textSource,
        }),
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setTexttextReady(result.data.translatedText);
      } catch (error) {
        console.error(error);
      }
    }

    addTranslator();

    async function getLanguages() {
      const url = "https://text-translator2.p.rapidapi.com/getLanguages";
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "31e52734bdmshab176c6eee229bdp1418e5jsn20cdd91ff8a8",
          "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result.data.languages);
        setLanguages(result.data.languages);
      } catch (error) {
        console.error(error);
      }
    }

    getLanguages();
  }, [langCode1, langCode2, textSource]);

  return (
    <>
      <section>
        <div style={{ backgroundColor: "#003366" }}>
          <h1 className="text-white text-center py-4">
            Language Translator App
          </h1>
        </div>
        <div className="container">
          <div className="d-flex gap-5 align-items-center justify-content-between my-4 p-2 borderColorShadow">
            <div className="dropdown">
              <button
                className="btn dropdown-toggle fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                From {langName1}
              </button>

              <ul
                className="dropdown-menu"
                style={{
                  height: "400px",
                  overflowY: "scroll",

                  backgroundColor: "#F7F2F9",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                }}
              >
                {languages.map((el, index) => {
                  return (
                    <li
                      role="button"
                      className={
                        mouseItem == index
                          ? "dropdown-item bg-primary text-white"
                          : "dropdown-item"
                      }
                      key={crypto.randomUUID()}
                      value={el.code}
                      onClick={() => {
                        setLangCode1(el.code);
                        setLangName1(el.name);
                      }}
                      onMouseEnter={() => {
                        setMouseItem(index);
                      }}
                    >
                      {el.name}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="dropdown">
              <button
                className="btn dropdown-toggle fw-bold"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                To {langName2}
              </button>

              <ul
                className="dropdown-menu"
                style={{
                  height: "400px",
                  overflowY: "scroll",

                  backgroundColor: "#F7F2F9",
                  borderBottomLeftRadius: "16px",
                  borderBottomRightRadius: "16px",
                }}
              >
                {languages.map((el, index) => {
                  return (
                    <li
                      role="button"
                      className="dropdown-item"
                      key={crypto.randomUUID()}
                      value={el.code}
                      onClick={() => {
                        setLangCode2(el.code);
                        setLangName2(el.name);
                      }}
                      onMouseEnter={() => {
                        setMouseItem(index);
                      }}
                    >
                      {el.name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="d-flex flex-column gap-5">
            <textarea
              style={{
                backgroundColor: "#F7F2F9",
                boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                height: "150px",
              }}
              className="form-control form-control-lg p-2"
              placeholder="Your text"
              onChange={(e) => {
                setTextSource(e.target.value);
                console.log(textSource, "textSource");
              }}
            ></textarea>

            <textarea
              style={{
                backgroundColor: "#F7F2F9",
                boxShadow: "0px 1px 3px 1px rgba(0, 0, 0, 0.15)",
                borderRadius: "16px",
                height: "150px",
              }}
              className="form-control form-control-lg p-2"
              placeholder="Translator text"
              value={textReady.length <= 1 ? "" : textReady}
            ></textarea>

            {/* <button className="btn btn-warning btn-lg">Translate</button> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
