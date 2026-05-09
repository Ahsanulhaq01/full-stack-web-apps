import { useState } from "react";

export default function useDynamicList(intialValue = [""]){
    const [items ,setItems] = useState(intialValue)


    const addItem = ()=>{
        setItems([...items , ""]);
    }

    const removeItem = (index)=>{
        const updated = items.filter((_ ,i) => i !== index);
        setItems(updated)
    }

     const updateItem = (index, value) => {
    const updated = [...items];
    updated[index] = value;
    setItems(updated);
  };


    return {items ,setItems ,addItem , removeItem , updateItem}
}