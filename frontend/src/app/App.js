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
        <MainRoute/>
    </div>
  );
}

export default App;
