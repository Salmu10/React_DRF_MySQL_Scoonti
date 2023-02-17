import React, {useState} from 'react';
import './IncidentsCardAdmin.scss';
import { Popover } from '@headlessui/react'

export default function IncidentsCardAdmin ({ incidence, index, deleteIncidence, type }) {
    const [filter, setFilter] = useState(null);
    const [filterData, setFilterData] = useState([]);

    const id = type == 'slot' ? incidence.slot_id : incidence.scooter_id;

    return (
        <tr>
            <td className="id_col">{incidence.id}</td>
            <td>{incidence.title}</td>
            <td>{incidence.status}</td>
            <td>{incidence.desc}</td>
            <td>{id}</td>
            <td>{incidence.user_id}</td>
            <td>
                <Popover className="popover">
                    <Popover.Button>Update Status</Popover.Button>
                    <Popover.Panel className="absolute z-10">
                        <div className="grid grid-cols-2">

                        </div>
                    </Popover.Panel>
                </Popover>
                <button className="buttons" onClick={() => setShow(!show)}>Update</button>
                <button className="buttons" onClick={() => deleteIncidence(type, incidence.id)}>Delete</button>
            </td>
        </tr>
    )
}