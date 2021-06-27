import React, { useState,useEffect } from "react";
import RightContainer from "./RightContainer";
import axios from "axios";
function template(fn, mn, ln, gen, sug) {
  return {
    fn: fn,
    mn: mn,
    ln: ln,
    gender: gen,
    sugg: sug
  };
}

export default function Main() {
  let [personList, setpersonList] = useState([]);
  let [fname, setFname] = useState("");
  let [mname, setMname] = useState("");
  let [lname, setLname] = useState("");
  let [gender, setGender] = useState("");
  let [sugg, setSugg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3005/getFeeds")
      .then((res) => setPersonList(res.data))
      .catch((error) => console.log(error));
  }, [personList]);




  return (
    <main>
      <div className="left-container">
        <div id="left-sub-box">
          <label>First Name</label>
          <span>*</span>
          <br />
          <input
            value={fname}
            type="text"
            className="typ-txt"
            onChange={(e) =>
              e.target.value.length < 40
                ? setFname(e.target.value)
                : alert("Character Length exceeded")
            }
          />
          <br />
          <label>Middle Name</label>
          <br />
          <input
            type="text"
            value={mname}
            className="typ-txt"
            onChange={(e) =>
              e.target.value.length < 40
                ? setMname(e.target.value)
                : alert("Character Length exceeded")
            }
          />
          <br />
          <label>Last Name</label>
          <span>*</span>
          <br />
          <input
            type="text"
            value={lname}
            className="typ-txt"
            onChange={(e) =>
              e.target.value.length < 40
                ? setLname(e.target.value)
                : alert("Character Length exceeded")
            }
          />
          <br />
          <label>Gender</label>
          <span>*</span>
          <br />
          <label className="gen">Male</label>
          <input
            type="radio"
            name="gen"
            className="typ-radio"
            value="Mr."
            // checked={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="gen">Female</label>
          <input
            type="radio"
            name="gen"
            value="Ms."
            // checked={gender}
            className="typ-radio"
            onChange={(e) => setGender(e.target.value)}
          />
          <label className="gen">other </label>
              <input
            type="radio"
            name="gen"
            value="gay"
            // checked={gender}
            className="typ-radio"
            onChange={(e) => setGender(e.target.value)}
          />
          <br />
          <label> Put Your Suggestions</label>
          <span>*</span>
          <br />
          <textarea
            value={sugg}
            onChange={(e) => setSugg(e.target.value)}
          ></textarea>
          <br />
          <button onClick={handleSubmit}>+</button>
          <button onClick={handleClear}>-</button>
          <br />
          {/* Error Message: Length Error */}
          <span>{errorMsg}</span>
          {/* <button type="Reset">Clear</button> */}
        </div>
      </div>

      <RightContainer personList={personList} />
    </main>
  );
  function handleClear() {
    setFname("");
    setMname("");
    setLname("");
    setSugg("");
  }




  function handleSubmit() {
    const pushItem = () => {
      axios.post("http://localhost:3005/createFeeds", {
        name: gen + fn + mn + ln,
        feedback: sugg
      });
    };

    if (fname.length < 1) {
      setErrorMsg("FirstName cannot be left blank");
    } else if (lname.length < 1) {
      setErrorMsg("LastName required");
    } else if (gender.length < 1) {
      setErrorMsg("Gender Cannot be left blank");
    } else if (sugg.length < 1) {
      setErrorMsg("Suggestion cannot be left blank");
    } else {
      setErrorMsg("");
      setpersonList((prev) => {
        return [...prev, template(fname, mname, lname, gender, sugg)];
      });
    }
  }
}
