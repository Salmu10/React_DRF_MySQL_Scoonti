import { useEffect, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import RentService from "../services/RentService";

export function useRent() {
    const navigate = useNavigate();
    const [rents, setRents] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname.split('/')[1];
        if (path === 'dashboard') {
            RentService.getAllRents()
                .then(({ data, status }) => {
                    if (status === 200) {
                        setRents(data);
                    }
                })
                .catch(e => console.error(e));
        }
    }, []);

    const useRentScooter = (slot) => {
        RentService.rentScooter(slot)
            .then(({ data, status }) => {
                if (status == 200) {
                    toast.success("Scooter rented, thank you!")
                    setIsCorrect(true);
                    setTimeout(() => { setIsCorrect(false); }, 1000);
                }
            })
            .catch(() => {
                toast.warning("You can't rent more than 1 scooter")
            });
    }

    const useBringBackScooter = (slot) => {
        RentService.getOneRent()
            .then(({ data, status }) => {
                if (status == 200) {
                    slot.scooter_id = data.scooter;
                    RentService.bringBackScooter(slot)
                        .then(({ data, status }) => {
                            if (status == 200) {
                                toast.success("Scooter bringed back, thank you!")
                                setIsCorrect(true);
                                setTimeout(() => { setIsCorrect(false); }, 1000);
                            }
                        })
                        .catch((e) => {
                            toast.error(e.response.data[0]);
                        });
                }
            })
            .catch(() => {
                toast.warning("You don't have any scooter")
            });
    }

    const useDeleteRent = (id) => {
        RentService.deleteRent(id)
            .then(({ data, status }) => {
                if (status === 200) {
                    setRents(rents.filter(rent => rent.id !== id));
                    toast.success(data.data);
                }
            })
            .catch(e => console.error(e));
    }
    

    return { isCorrect, setIsCorrect, rents, setRents, useRentScooter, useBringBackScooter, useDeleteRent }
}