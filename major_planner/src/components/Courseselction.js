import Data from "../major-course-planner-default-rtdb-CSE-Computer-Science-and-Engineering-export.json"
import React, { useState } from 'react';
import "../Course.css"
function Course(){
    const name = Data.map((val,key) => {<li key = {key}>{val.ClassName}</li>})
    console.log(name);
    const [searchterm, setsearchterm] = useState("")
    return (
        <div className="Course">
            <h1>START BY ADDING THE CLASS YOU'VE TAKEN</h1>
            <input 
                type = "text" 
                placeholder="Look up the classes by code"
                onChange={(event) => {
                    setsearchterm(event.target.value);
                }}
            />
            {Data.filter((val) => {
                if(searchterm == ""){
                    return val
                }else if (val.ClassName.toLowerCase().includes(searchterm.toLowerCase())){
                    return val
                }
            }).map((val,key) => {
                return (
                    <div className = "cc" key = {key}>
                        <p>{val.ClassName}</p>
                    </div>
                );
            })}
        </div>
    );
}
export default Course;

