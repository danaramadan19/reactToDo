//each component is a function
//we dont have inheritance all  what we do is composition
//fetch like promises
import React from "react"
import "./style.css"
import ToDos from './ToDos'; 



const App = () => {

    return <div className="centered">
  <ToDos/>
        </div>
   

}
export default App;
