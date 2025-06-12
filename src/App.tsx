import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainLayout} from "./shared/layout/MainLayout.tsx";
import './App.css'
import {Discovery} from "./features/discovery/Discovery.tsx";
import {Inventory} from "./features/inventory/Inventory.tsx";
import {Settings} from "./features/settings/Settings.tsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<Discovery />}></Route>
                    <Route path="/inventory" element={<Inventory />}></Route>
                    <Route path="/settings" element={<Settings />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
