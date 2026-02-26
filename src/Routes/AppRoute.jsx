import {Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import CreateResume from "../Pages/CreateResume";
import BlockEditor from "../Components/BlockEditor.jsx";
import ResumeBlock from "../Components/ResumeBlock.jsx";
function AppRoute () {
    return (
        <div>
        
            <Routes>
         <Route path="/" element = {<Dashboard />} />
          <Route path="/CreateResume" element= {<CreateResume />} />
          <Route path="/BlockEditor" element= {<BlockEditor />} />
            <Route path="/ResumeBlock" element= {<ResumeBlock />} />


            </Routes>
            
        </div>
    )
}

export default AppRoute;