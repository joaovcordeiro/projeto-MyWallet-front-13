import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "../Context/UserContext";

import Signin from "../Pages/SigninPage";
import Signup from "../Pages/SignupPage";
import Registers from "../Pages/RegistersPage";
import Edit from "../Pages/EditPage";
import Create from "../Pages/CreatePage";

function App() {
    const [login, setLogin] = useState({});
    return (
        <BrowserRouter>
            <UserContext.Provider value={{ login, setLogin }}>
                < Routes >
                    <Route path="/" element={<Signin />} />
                    <Route path="/sign-up" element={<Signup />} />
                    <Route path="/registers" element={<Registers />} />
                    <Route path='/edit' element={<Edit />} />
                    <Route path='/create' element={<Create />} />
                </Routes>
            </UserContext.Provider>
        </BrowserRouter >
    )
}

export default App;