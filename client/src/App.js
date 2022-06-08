import "./App.css";
import { Route, Routes } from "react-router-dom";
import List from "./components/post/List";
import Upload from "./components/post/Upload";
import Heading from "./components/Heading";
import Detail from "./components/post/Detail";
import Edit from "./components/post/Edit";

function App() {
  return (
    <div className="App">
      <Heading />
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/detail/:postNum" element={<Detail />} />
        <Route path="/edit/:postNum" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
