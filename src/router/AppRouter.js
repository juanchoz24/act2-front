import React from "react";
import {Route,BrowserRouter,Routes} from "react-router-dom";
import { DefaultComponent } from "../components/DefaultComponent";
import { Home } from "../components/Home";
import { ConsultaApto } from "../components/ConsultaApartamento";
import CrearApto from "../components/CrearApto";

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route exact path ="/" element={<Home/>}/>
                    <Route exact path ="/apto/" element={<ConsultaApto/>}/>
                    <Route exact path ="/CrearApto/" element={<CrearApto/>}/>
                    <Route path ="*" element={<DefaultComponent/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}