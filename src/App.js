import Nav from "./components/Nav";
import Main from './components/Main';
import {useState, createContext} from 'react';
import './components/styles/style.css';

const USER = '12CLn8QNN7twEuRJSXi8Na4VfzhAxWxDUn';
export const AppContext = createContext()

function App() {
  const [operation , setOperation] = useState('')
  const [login , setLogin] = useState(false);

  return (
    <AppContext.Provider value={USER}>
      <div className="App">
        <Nav user={USER} login={login} setLogin={setLogin}/>
        <Main operation={operation} setOperation={setOperation} login={login}/>
      </div>
    </AppContext.Provider>
  );
}

export default App;
