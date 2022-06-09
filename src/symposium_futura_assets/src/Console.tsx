import React, { useEffect, useState, useContext, useRef } from "react";
import { flushSync } from "react-dom";
import AuthContext from "./auth";



 const graphic = [
"┌─┐┬\xa0┬┌┬┐┌─┐┌─┐┌─┐┬┬\xa0┬┌┬┐\xa0\xa0",
"└─┐└┬┘│││├─┘│\xa0│└─┐││\xa0││││\xa0\xa0",
"└─┘\xa0┴\xa0┴\xa0┴┴\xa0\xa0└─┘└─┘┴└─┘┴\xa0┴\xa0\xa0",
"┌─┐┬\xa0┬┌┬┐┬\xa0┬┬─┐┌─┐\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
"├┤\xa0│\xa0│\xa0│\xa0│\xa0│├┬┘├─┤\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",
"└\xa0\xa0└─┘\xa0┴\xa0└─┘┴└─┴\xa0┴\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0",

 ];

const help = [
    "Things you can do!",
    "\xa0\xa0\xa0show <bio|pseudonym|principal>",
    "\xa0\xa0\xa0change <bio|pseudonym> 'new pseudonym'",
    "\xa0\xa0\xa0example: change bio 'I rock!'",
];

//
// Parses a command line input like 'show bio'
// or like 'change bio "I am a human". 
// Splits on whitespace unless there is a quotation.
function parse_args(s: string) {
    let regex = /"([^"]*)"|(\S+)/g;
    let result = (s.match(regex) || []).map(m => m.replace(regex, '$1$2'));
    return result;
}



function Console(props) {
  /* usestate for a const called 'history' and 'setHistory' */
  const { isAuthenticated, futura_actor } = useContext(AuthContext);
  const messagesEndRef = useRef<null | HTMLDivElement>(null); 
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState(
      ["Welcome! Console -- user settings adjustment",
      ...graphic,
      "type 'help' for more options'"
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
      }
      useEffect(scrollToBottom);


  const handleSubmit = async (event) => {
    event.preventDefault();
    let oldCommand = command;
    let toDisplay = [oldCommand];
    let parsed = parse_args(oldCommand);
    // console.log(parse_args(oldCommand));
    // console.log(commandInput);
    setCommand("");



    // my god, fix this hell

    if (parsed[0] == "help") {
        toDisplay = toDisplay.concat(help);
        setHistory(history.concat(toDisplay));
    } else if (parsed[0] == "show") {
        if (parsed[1] == "bio") {
            // not implemented
            // futura_actor.get_pseudonym();
            toDisplay = toDisplay.concat(["sorry, not implemented"]);
            setHistory(history.concat(toDisplay));
        } else if (parsed[1] == "pseudonym") {
            let pseudonym = await futura_actor?.get_pseudonym();
            //setHistory(history.concat([pseudonym]));
            toDisplay = toDisplay.concat([String(pseudonym)]);
            setHistory(history.concat(toDisplay));
        } else if (parsed[1] == "principal") {
            let whoami = await futura_actor?.whoami();
            //setHistory(history.concat([pseudonym]));
            toDisplay = toDisplay.concat([String(whoami)]);
            setHistory(history.concat(toDisplay));
        }else {
            toDisplay = toDisplay.concat(["error - type 'help' for options"]);
            setHistory(history.concat(toDisplay));
        }
    } else if (parsed[0] == "change") {
        if (parsed[1] == "bio") {
            // not implemented
            // futura_actor.update_bio();
            toDisplay = toDisplay.concat(["sorry, not implemented"]);
            setHistory(history.concat(toDisplay));
        } else if (parsed[1] == "pseudonym") {
            // remove quotes
            // const removed = parsed[3].replace(/"/g, '');
            // futura_actor.update_pseudonym(removed);
            // needs to be called in an async fn
            toDisplay = toDisplay.concat(["sorry, not implemented"]);
            setHistory(history.concat(toDisplay));

        } else {
            toDisplay = toDisplay.concat(["error - type 'help' for options"]);
            setHistory(history.concat(toDisplay));
        }
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
      <div ref={messagesEndRef} />
      <div className="noMargin">
      <form onSubmit={handleSubmit}>
            <span className="tilde">{">"}</span>
            <span className="consoleInput"><input
              type="console"
              autoFocus={true}
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
