import {BrowserRouter, Route, Routes} from "react-router-dom";
import {MainLayout} from "./shared/layout/MainLayout.tsx";
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path="/" element={<>home</>}></Route>
                    <Route path="/inventory" element={<>inventory</>}></Route>
                    <Route path="/settings" element={<>settings</>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
