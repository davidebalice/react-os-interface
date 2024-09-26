import Editor from "@monaco-editor/react";
import React, { useState } from "react";
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
    <div className="App">
      <ul>
        {Object.keys(scripts).map((scriptName) => (
          <li key={scriptName}>
            <button onClick={() => setSelectedScript(scriptName)}>
              {scriptName.toLowerCase().replace(/\s+/g, "-")}.js
            </button>
          </li>
        ))}
      </ul>

      <label>Seleziona uno script:</label>
      <select
        value={selectedScript}
        onChange={(e) => setSelectedScript(e.target.value)}
      >
        {Object.keys(scripts).map((scriptName) => (
          <option key={scriptName} value={scriptName}>
            {scriptName}
          </option>
        ))}
      </select>

      <Editor
        height="50vh"
        language="javascript"
        value={scripts[selectedScript]}
        theme="vs-dark"
        options={{ readOnly: true }}
      />

      <button onClick={executeScript}>Esegui Codice</button>

      <div>
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default CodeEditor;
