import React from 'react';

import StationCard from './StationCard';

export default function StationsList ({ stations }) {

    return  (
        <div className="stations_cards-list">
            {
                stations.map(( station, index ) => (
                    station.status === "active" ? <StationCard key={index} station={station}/> : ""
                ))
            }
        </div>

        // <section className="bg-base-content">
        //     <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
        //         <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        //             {
        //                 stations.map(( station, index ) => (
        //                     station.status === "active" ? <StationCard key={index} station={station}/> : ""
        //                 ))
        //             }
        //         </div>
        //     </div>
        // </section>
    )
}