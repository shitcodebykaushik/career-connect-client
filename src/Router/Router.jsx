import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
// import About from "../Pages/About";
import CreateJob from "../Pages/CreateJob";
import MyJobs from "../Pages/MyJobs";
import SalaryPage from "../Pages/SalaryPage";
import UpdateJob from "../Pages/updateJob";
import JobDetails from "../Pages/jobDetails";
import Login from "../components/Login";
import Signup from "../components/Signup";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      // { path: "/about", element: <About /> },
      { path: "/post-job",
      element:  <CreateJob />
    
    },
      { path: "/my-job",
      element:  <MyJobs />
    
    },
      { path: "/salary",
      element:  <SalaryPage />
    
    },
    {
      path: "edit-job/:id",
      element: <UpdateJob />,
      loader: ({params}) => fetch(`http://localhost:5000/all-jobs/${params.id}`)
      },
      {
        path: "job/:id",
        element: <JobDetails />,
        
      }
    
    ],
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
]);
export default router;


// const router = (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />}>
//         <Route path="/" element={<Home />} />
//         {/* Add your other routes here */}
//         <Route path="/post-job" element={<CreateJob />} />
//         <Route path="/my-job" element={<MyJobs />} />
//         <Route path="/salary" element={<SalaryPage />} />
//         <Route path="/edit-job/:id" element={<UpdateJob />} />
//         <Route path="/job/:id" element={<JobDetails />} />
//       </Route>
//       <Route path="/register" element={<Signup />} />
//       <Route path="/login" element={<Login />} />
//     </Routes>
//   </BrowserRouter>
// );

// export default router;
