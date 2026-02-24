import {Route, Routes } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import CreateResume from "../Pages/CreateResume";
import BlockEditor from "../Pages/BlockEditor";
import ResumeBlock from "../Pages/ResumeBlock.jsx";
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