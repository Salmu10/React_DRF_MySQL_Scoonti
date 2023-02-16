import { useContext, useCallback, useState } from 'react'
import SlotService from '../services/SlotService';
import SlotsContext from '../context/SlotsContext';

export function useSlots() {
    const {slots, setSlots} = useContext(SlotsContext);
    const [oneSlot, setOneSlot] = useState({});

    const useOneSlot = useCallback((id) => {
        SlotService.getOne(id).
            then(({ data }) => {
                setOneSlot(data)
            })
            .catch(e => console.error(e));
    }, []);

    return { slots, setSlots, useOneSlot, oneSlot, setOneSlot }
}