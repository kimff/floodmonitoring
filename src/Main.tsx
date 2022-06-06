import Navbar from "./components/Navbar";
import Live from "./components/Live";
import Contact from "./components/Contact";
import Weathernews from "./components/Weathernews";
import History from "./components/History";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const Main = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/live" element={<Live />}></Route>
                <Route path="/contact" element={<Contact />}></Route>
                <Route path="/weather" element={<Weathernews />}></Route>
                <Route path="/history" element={<History />}></Route>
            </Routes>
        </Router>
    )
}

export default Main;