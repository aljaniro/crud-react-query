import { createContext, useState } from 'react'
// eslint-disable-next-line react-refresh/only-export-components
export const conperson = createContext()
export const Contextperson = ({children}) => {
    const [perso,setperso] = useState()
    const [show, setShow] = useState();
    const handleShow = () => setShow(true);
  return (
    <conperson.Provider value={{perso,setperso,show, setShow,handleShow}}>
        {children}
    </conperson.Provider>
  )
}


