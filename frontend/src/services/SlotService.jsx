import api from "./api"

const SlotService = {

    getAllSlots(station = null) {
        return api().get("/slot", { params: station });
    },

    getOneSlot(id) {
        return api().get(`slot/${id}`);
    },

};

export default SlotService;