import { useEffect, useMemo, useState } from "react";

const Footer = ({condition, onConditionChange}) =>{
    function navItem(link, name, active){
        this.name = name;
        this.link = link;
        this.active = active;
    }
    const [onselection, setOnSelection] = useState([
        new navItem('hot','热门', "text-blue"),
        new navItem('new','最新', "text-grey"),
        new navItem('his','历史', "text-grey"),
    ]);
    const onSelectionChange = (changeTo) => {
        if(condition.sortBy !== onselection[changeTo].link){
            onConditionChange({...condition, sortBy: onselection[changeTo].link })
            setOnSelection((pre)=>{
                pre.forEach((item,index)=>{
                    item.active = index === changeTo ? "text-blue" : "text-grey"
                })
                return pre;
            });
        }
    }
    // useEffect(() => {
    //     listContent.forEach((item,index) =>{
    //         if(index === onselection) item.active = "text-blue"
    //         else item.active = "text-grey"
    //     })
    //     console.log(listContent)
    // },[onselection,listContent])
    return (
    <nav className="bg-white fixed w-screen bottom-0 transition-all transform text-center">
        <ul className="mx-auto h-14 inline-flex text-left items-center shadow-sm divide-x">{
            onselection.map((item,index) => 
            <li 
                key = {item.link}
                onClick={()=> onSelectionChange(index)} 
                className={`text-lg hover:text-blue cursor-pointer px-8 ${item.active}`}>
                {item.name}
            </li>
            )}
        </ul>
    </nav>
    );
}
export default Footer;