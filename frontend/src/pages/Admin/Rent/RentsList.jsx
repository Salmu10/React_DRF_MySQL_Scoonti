import React from "react";
import { useRent } from "../../../hooks/useRent";
import RentsListAdmin from "../../../components/Admin/Rent/RentsListAdmin";

const RentsList = () => {

    const {rents, useDeleteRent} = useRent();

    return (
        <RentsListAdmin rents={rents} deleteRent={useDeleteRent}/>
    )
}

export default RentsList;
