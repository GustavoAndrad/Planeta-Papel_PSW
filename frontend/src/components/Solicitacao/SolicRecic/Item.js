import { useState } from "react";

export default function ItemRec({index, item, type}){
    const [isCheck, setIsCheck]=useState(false);
    
    const toggleCheck = () => {
        setIsCheck(!isCheck);
    };

    return(<>
        <div className="content-center">
            <input id={index} name={item} type="checkbox"  value={item} onClick={toggleCheck}/>
            <label for={index} className="font-semibold pl-2 ">{item}</label>
            
            <div className={`${(isCheck && type === "rec")? "px-6 py-1": "invisible h-0"}`}>
                <div className={`${(item === "Outro")? "invisible h-0":"" }`}>
                    <p className="font-semibold text-secondaryBlue">Quanto vai reciclar ?</p>
                    <select id="medida" name="medida-0" className="rounded-lg">
                        <option value="1">Medida</option>
                    </select>
                    <select id={index} name={item} className="rounded-lg">
                        <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>
                    </select>
                </div>
                
                <div className={`${(item === "Outro")? "":"invisible h-0" }`}>
                    <input type="text" placeholder="O que?" className="border-1 border-accentBlue p-2 rounded-full w-full mb-4 pl-4"/>    
                </div>
            </div>
        </div>
    
    
    
    </>);
}