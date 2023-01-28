import React, { useEffect } from "react";
import('./StationsUpdate.scss');
import StationsForm from "../../../components/Admin/Station/StationsForm";
import { useStations } from "../../../hooks/useStations";
import { useParams } from "react-router-dom";

const StationsUpdate = () => {
    const { slug } = useParams();
    // const { useUpdateStation, useOneStation, oneStation } = useStations();
    const { oneBike, getOneStation,  } = useStations(slug);

    useEffect(() => {
        if (slug !== '') {
            getOneStation(slug);
            // console.log(oneStation);
        }
    }, []);

    return (
        <div className="station_update_container">
            <div className="title">
                <h2>Update Station</h2>
            </div>
            {/* <StationsForm SendData={(data) => useUpdateStation(slug, data)} station={oneStation}/> */}
            <StationsForm station={oneBike}/>
        </div>
    )
}

export default StationsUpdate;