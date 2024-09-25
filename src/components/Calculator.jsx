import React, { useState } from "react";
import { HiMiniBackspace } from "react-icons/hi2";
import { TiDivide, TiEquals, TiMinus, TiPlus, TiTimes } from "react-icons/ti";

function Calculator() {
  const [calculation, setCalculation] = useState("");
  const [output, setOutput] = useState("");
  const actions = ["/", "*", "+", "-", "."];

  const updateCalculation = (value) => {
    if (
      actions.includes(value) & (calculation === "") ||
      actions.includes(value) & actions.includes(calculation.slice(-1))
    ) {
      return;
    }
    setCalculation(calculation + value);

    if (!actions.includes(value)) {
      setOutput(eval(calculation + value).toString());
    }
  };
  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          className="numbers"
          onClick={() => updateCalculation(i.toString())}
          key={i}
        >
          {i}
        </button>
      );
    }
    return digits;
  };
  const calculate = () => {
    setCalculation(eval(calculation).toString());
  };
  const clear = () => {
    if (calculation === "") {
      return;
    }
    const value = calculation.slice(0, -1);
    setCalculation(value);
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="calculatorContainer">

            <div className="calc-grid">
              <div className="outputBar">
                {calculation || "0"}
                {output ? <span className="preRes">{output}</span> : ""}
              </div>

              <div>
                <div className="operationsContainer">
                  <button
                    className="button_calc"
                    key="/"
                    onClick={() => {
                      updateCalculation("/");
                    }}
                  >
                    <TiDivide />
                  </button>
                  <button
                    className="button_calc"
                    key="*"
                    onClick={() => {
                      updateCalculation("*");
                    }}
                  >
                    <TiTimes />
                  </button>
                  <button
                    className="button_calc"
                    key="+"
                    onClick={() => {
                      updateCalculation("+");
                    }}
                  >
                    <TiPlus />
                  </button>
                  <button
                    className="button_calc"
                    key="-"
                    onClick={() => {
                      updateCalculation("-");
                    }}
                  >
                    <TiMinus />
                  </button>
                  <button
                    className="button_calc button_canc"
                    key="c"
                    onClick={clear}
                  >
                    {" "}
                    <HiMiniBackspace />
                  </button>
                </div>

                <div className="numbersContainer">
                  {createDigits()}

                  <button
                    className="numbers"
                    onClick={() => {
                      updateCalculation(".");
                    }}
                  >
                    .
                  </button>
                  <button
                    className="numbers"
                    onClick={() => {
                      updateCalculation("0");
                    }}
                  >
                    0
                  </button>
                  <button className="numbers equal" onClick={calculate}>
                    <TiEquals />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Calculator;
