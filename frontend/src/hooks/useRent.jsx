import { useEffect, useCallback, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import RentService from "../services/RentService";

export function useRent() {
    const navigate = useNavigate();
    const [isCorrect, setIsCorrect] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const path = pathname.split('/')[1];
        if (path === 'dashboard') {
            console.log('hola admin');
        }
    }, []);

    const useDeleteRentMultiple = async (ids) => {
    }
    
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

    return { isCorrect, setIsCorrect, useDeleteRentMultiple, useRentScooter, useBringBackScooter }
}