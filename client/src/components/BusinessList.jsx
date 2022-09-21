import React, { useEffect, useContext } from "react";
import Businessall from "../apis/Businessall";
import { BusinessContext } from "../context/BusinessContext";

const Businesslist = (props) => {
    const { business, setBusiness } = useContext(BusinessContext);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Businessall.get("/");
                setBusiness(response.data.data.business);
            } catch (err) {}
        };

        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope="col">Business Name</th>
                        <th scope="col">Country</th>
                        <th scope="col">Province</th>
                    </tr>
                </thead>
                <tbody>
                    {business.map((business) => {
                        return (
                            <tr key={business.id}>
                                <td>{business.business_name}</td>
                                <td>{business.country}</td>
                                <td>{business.province}</td>
                              
                            </tr>
                        );
                    })}

                
                </tbody>
            </table>
        </div>
    );
};
export default Businesslist;
