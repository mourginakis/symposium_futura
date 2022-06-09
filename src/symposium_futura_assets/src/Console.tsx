import React, { useEffect, useState, useContext } from "react";
import { flushSync } from "react-dom";
import AuthContext from "./auth";

function Console(props) {
  /* usestate for a const called 'history' and 'setHistory' */
  const { isAuthenticated, futura_actor } = useContext(AuthContext);
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState(
      ["Symposium Futura Console - user settings",
      "type 'help' for options",
    ]);


  const handleSubmit = (event) => {
    event.preventDefault();
    let oldCommand = command;
    let toDisplay = [oldCommand];
    // console.log(commandInput);
    setCommand("");

    if (oldCommand == "help") {
        let s = [
            "Things you can do!",
            "_  show <bio|name|principal>",
            "_   change <bio|pseudonym> 'new pseudonym'",
            "_   example: change bio 'I rock!'",
        ];
        toDisplay = toDisplay.concat(s);
        setHistory(history.concat(toDisplay));
    } else {
        toDisplay = toDisplay.concat(["error - type 'help' for options"]);
        setHistory(history.concat(toDisplay));
    }
  };





  if (!isAuthenticated) {
    return (
      <div className="consoleBox">
        <h4>user not authenticated</h4>
      </div>
    );
  }

  return (
    /* an unordered list without bullets */
    <div className="consoleBox">
      <ul>
        {history.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div className="noMargin">
      <form onSubmit={handleSubmit}>
            <span className="tilde">{">"}</span>
            <span className="consoleInput"><input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
            />
            </span>
      </form>
      </div>
    </div>
  );
}

export default Console;
