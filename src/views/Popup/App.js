import "./App.css";
import { Button } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Popup Page</p>
      </header>
      <section>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
      </section>
    </div>
  );
}

export default App;
