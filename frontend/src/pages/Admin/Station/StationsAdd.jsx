import React from "react";
import('./StationsAdd.scss');
import StationsForm from "../../../components/Admin/Station/StationsForm";
// import { useStations } from "../../../hooks/useStations";

const StationsAdd = () => {
    // const { useAddStation } = useStations();
    return (
        <div className="station_add_container">
            <div className="title">
                <h2>Create Station</h2>
            </div>
            <StationsForm/>
            {/* <StationsForm SendData={(data) => useAddStation(data)} station={oneStation}/> */}
        </div>
    )
}

export default StationsAdd;