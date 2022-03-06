import React, { useEffect, useState, useContext } from 'react';
import AddJob from './AddJob';
import Job from './Job';
import FilterContext from '../Context/FilterContext';


const ListContainer = (props) => {
  const filters = useContext(FilterContext)[0];
  console.log("props list container",props)
  const { jobs, setJobs } = props

  //query to fetch data
  const getData = () => {
    // const fakeData = [{applicationId: 1, company: "google", role: "software engineer", url: "www.hello.com"}, {applicationId:0, company: "amazon", role: "senior software engineer", url: "www.yello.com"}]; 
    // setJobs(fakeData);
    // console.log('getData invoked!')
    fetch("api/application")
      .then(res => res.json())
      .then((data) => {
        setJobs(data.allApplications)
      })
      .catch(err => console.log("inside getall ", err))
  };

  useEffect(()=> {
    getData();
  },[]); 

  let jobFiltered = jobs.filter((job) => {
    for (const key in filters) {
      if (filters[key] && job[key] != filters[key]) return false
    }
    return true;
  })

  const jobsObj = jobFiltered.sort((a, b) => a._id - b._id).map((job) => <Job key={`v${job._id}`} setJobs={setJobs} job={job}/>);

  console.log('jobs:', jobsObj)

  const columnHeader = <thead> 
    <tr className="columnHeader">
    <th>Company</th>
    <th>Role</th>
    <th>Url</th>
    </tr> 
  </thead>

  return (
    <div id="list-container">
      <AddJob setJobs={setJobs}/>
      <table> 
        {columnHeader}
        {jobsObj}
      </table> 
    </div>
  );
}
export default ListContainer; 