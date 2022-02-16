import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserInfo from "@/components/UserInfo/UserInfo";
import UserInfoHooks from '@/components/UserInfoHooks/UserInfoHooks';
import CounterReducer from "./components/Counter/CounterReducer";

// console.log('public url: ', process.env.PUBLIC_URL);
const App: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <Link to="/">Home</Link>
                <Link to="/user-info">User Info</Link>
                <Link to="/user-info-hooks">User Info Hooks</Link>
                <Link to="/counter-reduce">Counter Reduce</Link>
            </div>
            <div>
                <Routes>
                    <Route path="/user-info" element={<UserInfo/>} />
                    <Route path="/user-info-hooks" element={<UserInfoHooks />} />
                    <Route path="/counter-reduce" element={<CounterReducer />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;