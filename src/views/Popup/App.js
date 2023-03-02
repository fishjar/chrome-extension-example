import { useEffect, useState } from "react";
import init, { add } from "wasm-lib";
import "./App.css";

function App() {
  const [ans, setAns] = useState(0);
  useEffect(() => {
    init().then(() => {
      setAns(add(1, 1));
    });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <p>Popup Page</p>
      </header>
      <section>
        <p>1 + 1 = {ans}</p>
      </section>
    </div>
  );
}

export default App;
