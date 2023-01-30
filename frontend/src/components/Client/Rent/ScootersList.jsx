import React from 'react';

import ScooterCard from './ScooterCard';

export default function ScootersList ({ scooters }) {

    return  (
        <section className="bg-base-content">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    {
                        scooters.map(( scooter, index ) => (
                            scooter.status === "active" ? <ScooterCard key={index} scooter={scooter}/> : ""
                        ))
                    }
                </div>
            </div>
        </section>
    )
}