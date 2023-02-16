import api from "./api"

const RentService = {

    getAllRents() {
        return api().get("/rents");
    },

    rentScooter(slot) {
        return api().post(`rent/${slot.id}`);
    },

    getOneRent() {
        return api().get("/rent");
    },

    bringBackScooter(slot) {
        return api().post("bringbackScooter", { "scooter": { "end_slot": slot.id, "scooter_id": slot.scooter_id } });
    },

    deleteRent(id) {
        return api().delete(`deleteRent/${id}`);
    },

};

export default RentService;