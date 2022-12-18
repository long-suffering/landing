import {BrowserRouter, Route, Routes} from "react-router-dom";

import { HomePage, PresentationPage } from './src/pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/presentation" element={ <PresentationPage/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
