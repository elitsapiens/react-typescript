import React, { ReactElement } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserInfo from "@/components/UserInfo/UserInfo";
import UserInfoHooks from '@/components/UserInfoHooks/UserInfoHooks';
import UserInfoReducer from '@/components/UserInfoReducer/UserInfoReducer';
import UserInfoContext from "@/components/UserInfoContext/UserInfoContext";
import UseInfoReducerCustomHook from '@/components/UserInfoReducer/UseInfoReducerCustomHook'
import CounterReducer from "./components/Counter/CounterReducer";
import * as Sentry from '@sentry/react';
import { BrowserTracing } from "@sentry/tracing";

// console.log('public url: ', process.env.PUBLIC_URL);
Sentry.init({
    dsn: "https://4e6468584e4b4307877ef214cbba2822@o1152051.ingest.sentry.io/6229800",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const App: React.FC = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div>
                <Link to="/">Home</Link>
                <Link to="/user-info">User Info</Link>
                <Link to="/user-info-hooks">User Info Hooks</Link>
                <Link to="/user-info-reducer">User Info Reducer</Link>
                <Link to="/user-info-context">User Info Context</Link>
                <Link to="/user-info-reducer-custom-hook">User Info Reducer Custom Hook</Link>
                <Link to="/counter-reduce">Counter Reduce</Link>
                {/* <button onClick={methodDoesNotExist}>Break the world</button> */}
            </div>
            <div>
                <Routes>
                    <Route path="/user-info" element={<UserInfo/>} />
                    <Route path="/user-info-hooks" element={<UserInfoHooks />} />
                    <Route path="/user-info-reducer" element={<UserInfoReducer />} />
                    <Route path="/user-info-context" element={<UserInfoContext />} />
                    <Route path="/user-info-reducer-custom-hook" element={<UseInfoReducerCustomHook />} />/
                    <Route path="/counter-reduce" element={<CounterReducer />} />
                    
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;