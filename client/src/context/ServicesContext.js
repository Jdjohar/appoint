import React, {useState, createContext} from 'react';

export const ServicesContext = createContext();

export const ServicesContextProvider = props => {
    const [list_services, setlist_services] = useState([]);
    const [selectedlist_services, setSelectedlist_services] = useState(null);

    const list_services1 = (list_services1) => {
        setlist_services([...list_services,list_services1]);
    };

    return(
        <ServicesContext.Provider 
        value={{list_services, 
                setlist_services, 
                list_services1,
                selectedlist_services,
                setSelectedlist_services,
                }}
                >
               {props.children}
        </ServicesContext.Provider>
    );
};
