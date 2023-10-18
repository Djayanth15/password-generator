import { useCallback, useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isNum, setIsNum] = useState(true);
  const [isChar, setIsChar] = useState(false);

  //useRef hook
  const passwordRef = useRef(null);

  const copyPassToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const passgen = useCallback(() => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "1234567890";
    const char = "!@#$%^&*()_+-={}[]|:;'<>,.?/~`";
    let s = letters;
    if (isNum) s += num;
    if (isChar) s += char;
    let res = "";
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * s.length);
      res += s.charAt(index);
    }
    setPassword(res);
  }, [length, isNum, isChar, setPassword]);

  useEffect(passgen, [length, isNum, isChar, passgen]);

  return (
    <div className="max-w-md w-full px-4 py-3 mx-auto bg-gray-700 rounded-lg shadow-md">
      <h1 className="text-4xl my-3 text-white text-center">
        Password Generator
      </h1>
      <div className="flex rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          name="password"
          placeholder="password"
          id="pass"
          className="px-3 py-1 w-full"
          value={password}
          readOnly
          ref={passwordRef}
        />
        <button
          className="px-3 py-0.5 outline-none shrink-0 rounded-sm bg-blue-700 text-white"
          onClick={copyPassToClipboard}
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min="6"
            max="99"
            onChange={(e) => setLength(e.target.value)}
            value={length}
            name="length"
            id="length"
            className="cursor-pointer"
          />
          <label htmlFor="length">Length {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="isNum"
            defaultChecked={isNum}
            onChange={() => {
              setIsNum((prev) => !prev);
            }}
          />
          <label htmlFor="isNum">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            id="isChar"
            onChange={() => {
              setIsChar((prev) => !prev);
            }}
          />
          <label htmlFor="isChar">Spl Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
