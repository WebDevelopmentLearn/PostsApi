import './App.css';
import MainRoute from "../route/MainRoute";
import {Navbar} from "../components";
import {fetchUser} from "../store/reducers/actionCreators";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer);



  return (
    <div className="App">
        <Navbar />
        <h1>Posts API</h1>
        <MainRoute/>
    </div>
  );
}

export default App;
