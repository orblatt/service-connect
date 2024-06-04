// import React from 'react';
// import { Routes, Route, Link } from 'react-router-dom';
// import { MainPage } from '../app/MainPage';
// import { MyJobAdsPage } from '../app/MyJobAdsPage';
// import { SearchJobAdsPage } from '../app/SearchJobAdsPage';
// import { CreateJobAdPage } from '../app/CreateJobAdPage';

// export const NavBar = () => {
//     return (
//         <div>
//             <nav>
//                 <ul>
//                     <li>
//                         <Link to='/'>Home</Link>
//                     </li>
//                     <li>
//                         <Link to='/create-job-ad'>Create Job Ads</Link>
//                     </li>
//                     <li>
//                         <Link to='/my-job-ads'>My Job Ads</Link>
//                     </li>
//                     <li>
//                         <Link to='/search-job-ads'>Search Job Ads</Link>
//                     </li>
//                 </ul>
//             </nav>
//             <Routes>
//                 <Route path='/' element= { <MainPage />} ></Route>
//                 <Route path='/my-job-ads' element= { <MyJobAdsPage /> } ></Route>
//                 <Route path='/search-job-ads' element= { <SearchJobAdsPage />} ></Route>
//                 <Route path='/create-job-ad' element= { <CreateJobAdPage /> } ></Route>
//             </Routes>
//         </div>
//     )
// }