import React from 'react';
import SlotCard from './SlotCard';

export default function SlotsList ({ slots }) {

    return  (
        <div className="slots_cards-list">
            {
                slots.map(( slot, index ) => (
                    <SlotCard key={index} slot={slot}/>
                ))
            }
        </div>
    )
}