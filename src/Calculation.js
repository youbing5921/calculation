import Button from "./Component/Button";
import styles from "./Calculation.module.css";
import React, { useState } from "react";

function Calculation({ setExpList }) {
  const [input, setInput] = useState("");
  const [quit, setQuit] = useState(false);

  const handleInputChange = (e) => {
    if (quit) {
      // 새로 식 입력할 때 초기화 작업
      setQuit(false);
      let value = e.target.value;
      if (value === "x!" || value === "√x" || value === "1/x") {
        value = value.replace("x", "");
      }
      setInput(value);
    } else if (e.target.value === "=") {
      // 결과 계산
      calculateInput(e);
    } else {
      // 평범한 식 입력
      let value = e.target.value;
      if (value === "x!" || value === "√x" || value === "1/x") {
        value = value.replace("x", "");
      }
      setInput(input + value);
    }
  };

  function evaluate(expression) {
    // eval(expression);
    // 계산 전 수식 정리
    const stack = [];
    let num = "";
    let i;
    let elt;
    for (i = 0; i < expression.length; i++) {
      elt = expression[i];
      if (!isNaN(elt) || elt === ".") {
        // 숫자라면
        num += elt;
      } else {
        // 연산자라면
        if (num !== "") {
          stack.push(parseFloat(num));
          num = "";
        }
        console.log("stack", stack);
        if (elt === "π") {
          if (!isNaN(parseFloat(stack[stack.length - 1]))) {
            stack.push("×");
          }
          stack.push(Math.PI);
          console.log("kk", stack);
        } else {
          stack.push(elt);
        }
      }
    }
    stack.push(parseFloat(num));
    // 제곱, 루트, 팩토리얼 계산
    for (i = 0; i < stack.length; i++) {
      elt = stack[i];
      if (elt === "^") {
        stack[i - 1] = stack.splice(i - 1, 1) ** stack.splice(i, 1);
        i = i - 2;
      } else if (elt === "√") {
        stack[i] = Math.sqrt(stack.splice(i + 1, 1));
        i = i - 1;
      } else if (elt === "!") {
        let res = 1;
        for (let j = 1; j <= stack[i - 1]; j++) {
          res *= j;
        }
        stack[i - 1] = res;
        stack.splice(i, 1); // ! 빼기
      }
    }
    // 역수 계산
    for (i = 0; i < stack.length - 1; i++) {
      if (stack[i] === "/") {
        if (stack[i + 1] === 0) {
          return Infinity;
        }
        stack[i - 1] = stack.splice(i - 1, 1) / stack.splice(i, 1);
        i = i - 2;
      }
    }
    // 곱하기, 나누기 계산
    for (i = 0; i < stack.length; i++) {
      elt = stack[i];
      if (elt === "×") {
        stack[i - 1] = stack.splice(i - 1, 1) * stack.splice(i, 1);
        i = i - 2;
      } else if (elt === "÷") {
        if (stack[i + 1] === 0) {
          return Infinity;
        }
        stack[i - 1] = stack.splice(i - 1, 1) / stack.splice(i, 1);
        i = i - 2;
      }
    }
    // 더하기, 빼기 계산
    for (i = 0; i < stack.length; i++) {
      elt = stack[i];
      if (elt === "+") {
        stack[i - 1] =
          parseFloat(stack.splice(i - 1, 1)) + parseFloat(stack.splice(i, 1));
        i = i - 2;
      } else if (elt === "-") {
        stack[i - 1] = stack.splice(i - 1, 1) - stack.splice(i, 1);
        i = i - 2;
      }
    }
    return stack[0];
  }
  const calculateInput = (e) => {
    let expression = input.split("");
    let result = evaluate(expression);
    if (!Number.isInteger(result)) {
      result = result.toFixed(4);
    }
    setInput(result);
    if (result === Infinity) {
      alert("0으로 나눌 수 없습니다.");
    } else {
      setExpList((prevState) => {
        const newExpression = input + "=" + result.toString();
        console.log([...prevState, newExpression]);
        return [newExpression, ...prevState];
      });
    }
    setQuit(true);
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      calculateInput();
    }
  };

  return (
    <div className={styles.calculation_body}>
      <input type="text" value={input} className={styles.input} readOnly />
      <div className={styles.buttons}>
        <Button onClick={handleInputChange} value="x!"></Button>
        <Button onClick={() => setInput("")} value="CE"></Button>
        <Button onClick={() => setInput("")} value="C"></Button>
        <Button
          onClick={() => setInput(input.substring(0, input.length - 1))}
          value="←"
        ></Button>

        <Button onClick={handleInputChange} value="1/x"></Button>
        <Button onClick={handleInputChange} value="^"></Button>
        <Button onClick={handleInputChange} value="√x"></Button>
        <Button onClick={handleInputChange} value="÷"></Button>

        <Button onClick={handleInputChange} value={7}></Button>
        <Button onClick={handleInputChange} value={8}></Button>
        <Button onClick={handleInputChange} value={9}></Button>
        <Button onClick={handleInputChange} value="×"></Button>

        <Button onClick={handleInputChange} value={4}></Button>
        <Button onClick={handleInputChange} value={5}></Button>
        <Button onClick={handleInputChange} value={6}></Button>
        <Button onClick={handleInputChange} value="-"></Button>

        <Button onClick={handleInputChange} value={1}></Button>
        <Button onClick={handleInputChange} value={2}></Button>
        <Button onClick={handleInputChange} value={3}></Button>
        <Button onClick={handleInputChange} value="+"></Button>

        <Button onClick={handleInputChange} value="π"></Button>
        <Button onClick={handleInputChange} value={0}></Button>
        <Button onClick={handleInputChange} value="."></Button>
        <Button onClick={handleInputChange} value="="></Button>
      </div>
    </div>
  );
}

export default Calculation;
