import React, { useEffect } from 'react'
import Banner from '../components/Banner/Banner'
import { useState } from 'react';
import Card from '../components/Card';
import Jobs from './Jobs';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs]=useState([]);
const [isLoading, setIsLoading]=useState(true);
const [currentPage, setCurrentPage]=useState(1);

const itemsPerPage=6;
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/all-jobs").then(res=>res.json()).then(data=>{
   
      setJobs(data);
      setIsLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    });
  },[])
  
  const [query, setQuery] = useState("");
  const handleInputChange = (e) => {
      setQuery(e.target.value);
  }
  // filter jobs by title
  // const filteredItems = jobs.filter((job) =>  job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !==-1);
  // const filteredItems = jobs.filter((job) =>  job.jobTitle && job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !==-1);
  const filteredItems = jobs.filter((job) => (job.jobTitle && job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1));

  

  // Radio based button filtering
  const handleChange =(event)=>{
    setSelectedCategory(event.target.value)
  }

  // button based filtering functions
  const handleClick=(event)=>{
    setSelectedCategory(event.target.value);
  }

  // calculate the page range
  const calculatePageRange = () => {
    const startIndex = (currentPage -1)* itemsPerPage;
    const endIndex = startIndex+itemsPerPage;
    return  {startIndex, endIndex};
  }


  // function for the next page 
  const nextPage= ()=>{
    if(currentPage < Math.ceil(filteredItems.length / itemsPerPage)){
setCurrentPage(currentPage+1);
    }
  }

  // function for the previous page
  const prevPage =()=>{
    if(currentPage > 1){
      setCurrentPage(currentPage-1);
    }
  }
//   // main function
//   const filterData=(jobs, selected, query)=>{
//     let filterJobs=jobs;
//     if(query){
//       filterJobs=filteredItems;
//     }
    
//     // category filtering
//     if(selected){ 
     
//       filterJobs = filterJobs.filter(({jobLocation, maxPrice,  salaryType, employmentType, postingDate, experienceLevel})=>(

//            jobLocation.toLowerCase() === selected.toLowerCase() ||
//           parseInt(maxPrice)<= parseInt(selected) ||
//           postingDate >= selected ||
//           experienceLevel.toLowerCase() === selected.toLowerCase() ||
//           salaryType.toLowerCase()===selected.toLowerCase() ||
//           employmentType.toLowerCase()=== selected.toLowerCase() 
//       ));
     
//     }
// // slice the data based on current page
// const {startIndex,endIndex}= calculatePageRange();
// filterJobs= filterJobs.slice(startIndex, endIndex);
//     return filterJobs.map((data, i)=>  <Card key={i} data={data} />)
//   }

const filterData = (jobs, selected, query) => {
  let filterJobs = jobs;

  if (query) {
    filterJobs = filterJobs.filter((job) => job.jobTitle && job.jobTitle.toLowerCase().includes(query.toLowerCase()));
  }

  if (selected) {
    filterJobs = filterJobs.filter(({ jobLocation, maxPrice, salaryType, employmentType, postingDate, experienceLevel }) => {
      // Check if jobLocation is defined before calling toLowerCase()
      const locationMatch = jobLocation && jobLocation.toLowerCase() === selected.toLowerCase();

      // Check if maxPrice is defined and parseable before comparing
      const priceMatch = maxPrice && parseInt(maxPrice) <= parseInt(selected);

      // Check if postingDate is defined before comparing
      const dateMatch = postingDate && postingDate >= selected;

      // Check if experienceLevel is defined before calling toLowerCase()
      const experienceMatch = experienceLevel && experienceLevel.toLowerCase() === selected.toLowerCase();

      // Check if salaryType is defined before calling toLowerCase()
      const salaryMatch = salaryType && salaryType.toLowerCase() === selected.toLowerCase();

      // Check if employmentType is defined before calling toLowerCase()
      const employmentMatch = employmentType && employmentType.toLowerCase() === selected.toLowerCase();

      // Return true if any of the conditions match
      return locationMatch || priceMatch || dateMatch || experienceMatch || salaryMatch || employmentMatch;
    });
  }

  // slice the data based on current page
  const { startIndex, endIndex } = calculatePageRange();
  filterJobs = filterJobs.slice(startIndex, endIndex);

  return filterJobs.map((data, i) => <Card key={i} data={data} />);
};

   const result = filterData(jobs, selectedCategory, query);
  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange}/>

{/* main content */}
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'> 
      {/* left side */}
        <div className='bg-white p-4 rounded'><Sidebar handleChange={handleChange} handleClick={handleClick
        }/></div>
      {/* job cards */}
        <div className='col-span-2 bg-white p-4 rounded'>{
          isLoading ? (<p className='font-medium'>Loading...</p>) : result.length >0 ? (<Jobs result={result}/>) : <>
          <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
          <p>No Data Found</p>
          </>
        }

        {/* pagination here */}
        {
          result.length >0 ?(
            <div className="flex justify-center mt-4 space-x-8">
              <button onClick={prevPage} disabled={currentPage==1} className='hover:underline'>Previous</button>
              <span>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage==Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>  Next</button>
            </div>
          ) : ""
        }
        </div>
        

        {/* job card right side */}
        <div className='bg-white p-4 rounded'><Newsletter /></div>
      </div>
    </div>
  )
}

export default Home;
