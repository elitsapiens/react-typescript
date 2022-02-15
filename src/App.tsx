import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserInfo from "@/components/UserInfo/UserInfo";

// console.log('public url: ', process.env.PUBLIC_URL);
const App: React.FC = () => {
    return (
        
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <Link to="/">Home</Link>
                <Link to="/user-info">User Info</Link>
                <Link to="/user-info-reducer">User Info Reducer</Link>
            </div>
            <div>
                <Routes>
                    <Route path="/user-info" element={<UserInfo/>} />
                    <Route path="/user-info-reducer" element={<UserInfo />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;