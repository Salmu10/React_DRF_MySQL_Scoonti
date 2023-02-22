import React from 'react';
import './IncidentsListAdmin.scss';
import IncidentsCardAdmin from './IncidentsCardAdmin';

export default function IncidentsListAdmin ({ incidents_slots, incidents_scooters, deleteIncidence }) {

    return  (
        <div className="incidents_list_container">
            <h1>Incidents List</h1>
            <h3>Incidents Slots List</h3>
            <table className="slot_table" border="1">
                <thead className="thead_incidents_list">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Slot ID</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_incidents_list">
                    {
                        incidents_slots.map(( incidence, index ) => (
                            <IncidentsCardAdmin key={index} incidence={incidence} deleteIncidence={deleteIncidence} type={"slot"}/>
                        ))
                    }
                </tbody>
            </table>
            <h3>Incidents Scooters List</h3>
            <table className="scooter_table" border="1">
                <thead className="thead_incidents_list">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Description</th>
                        <th>Scooter ID</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="tbody_incidents_list">
                    {
                        incidents_scooters.map(( incidence, index ) => (
                            <IncidentsCardAdmin key={index} incidence={incidence} deleteIncidence={deleteIncidence} type={"scooter"}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}