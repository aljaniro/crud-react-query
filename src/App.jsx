import Persons from "./components/persons";

import "./App.css";
import FormPersonas from "./components/formPersonas";

function App() {
  return (
    <div className="app">
      <FormPersonas></FormPersonas>
      <Persons></Persons>
    </div>
  );
}

export default App;
