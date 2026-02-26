import { useNavigate } from "react-router-dom";

function Dashboard () {
      const navigate = useNavigate();
  
    return (
<>
          <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-purple-800 via-gray-600 to-pink-500 p-8"> 
        
{/* <img src="src/assets/bg.jpg" className=" w-96 object-scale-down mask-l-from-50% mask-l-to-90% bg-[(/src/assets/bg.jpg)] "></img> */}

          <h1 className="text-6xl font-bold text-center text-white  mt-5 mb-8">Resume Builder</h1>
        <p className=" text-xl text-center font-semibold text-white mb-12">Let your qualifications shine with an exceptional CV, designed with ease and made to stand out from the crowd. </p>

      <button onClick={() => navigate("/CreateResume")} className="  bg-gradient-to-br  from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 cursor-pointer rounded-md py-1 w-3xs hover:shadow-2xl hover:-translate-y-2 transition duration-300"> Create Resume</button>

            </div>
        </>      
    )   
}
export default Dashboard;