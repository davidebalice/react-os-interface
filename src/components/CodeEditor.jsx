import Editor from "@monaco-editor/react";
import React, { useState } from "react";
import note from "../assets/icons/note.png";
import scripts from "../data/scripts";

function CodeEditor() {
  const [selectedScript, setSelectedScript] = useState(Object.keys(scripts)[0]);
  const [output, setOutput] = useState("");

  const executeScript = async () => {
    const consoleLog = [];

    const log = (message, ...optionalParams) => {
      consoleLog.push([message, ...optionalParams].join(" "));
    };

    const originalLog = console.log;
    console.log = log;

    try {
      await eval(`(async () => { ${scripts[selectedScript]} })()`);
    } catch (error) {
      consoleLog.push(`Errore: ${error.message}`);
    } finally {
      console.log = originalLog;
    }

    setOutput(consoleLog.join("\n"));
  };

  return (
    <div className="codeEditor">
      <div>
        <ul>
          {Object.keys(scripts).map((scriptName) => (
            <li key={scriptName} onClick={() => setSelectedScript(scriptName)}>
              <img src={note} />
              <span>{scriptName.toLowerCase().replace(/\s+/g, "-")}.js</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Editor
          height="50%"
          language="javascript"
          value={scripts[selectedScript]}
          theme="vs-dark"
          options={{ readOnly: true }}
        />
        <div className="codeOutput">
          <button onClick={executeScript}>Run code</button>
          <br /> <br />
          <pre>Output:</pre>
          <br />
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
}

export default CodeEditor;
