import AppRouter from "./components/appRouter";
import {BrowserRouter} from "react-router-dom";
import './styles/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar";
import {useContext, useEffect} from "react";
import {Context} from "./index";
import {check} from "./http/userAPI";

function App() {
    const {user} = useContext(Context)
    useEffect(() => {
        check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        })
    },[])
  return (
    <div className="App">
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    </div>
  );
}

export default App;
