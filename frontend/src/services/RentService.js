import api from "./api"

const RentService = {

    rentScooter(slot) {
        return api().post(`rent/${slot.id}`);
    },

    getOneRent() {
        return api().get("/rent");
    },

    bringBackScooter(slot) {
        return api().post("bringbackScooter", { "scooter": { "end_slot": slot.id, "scooter_id": slot.scooter_id } });
    },

};

export default RentService;