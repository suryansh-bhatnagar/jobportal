import SkillContext from "./skillContext";
import { useState } from "react";

const SkillState = (props)=>{
    const initialState = {"default":"Select category first"}
    const [skill, setSkill] = useState(initialState);

 
    return(
        <SkillContext.Provider value ={{skill , setSkill}}>
            {props.children}
        </SkillContext.Provider>
    )
}

export default SkillState; 

