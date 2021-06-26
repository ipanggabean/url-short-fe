import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/Home';
import Extract from './components/Extract';

function App() {
  

  return (
    <Router>
      <div className="App container mt-5">
          <Switch>
            <Route exact path="/" children={<Home />} />
            <Route path="/:id" children={<Extract />} />
          </Switch>
      </div>
    </Router>
  );
}

export default App;
