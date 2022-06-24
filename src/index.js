import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Routing from "./routes/Routing";
import {ConfirmContextProvider} from "../src/contextprovider/confirmcontextprovider";

import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
    <React.StrictMode>
        <ConfirmContextProvider>
            <Routing />
            </ConfirmContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);