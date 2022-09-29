import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import { Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import configureStore from './store/store'

const store = configureStore()

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Provider>
  );
}

export default App;
