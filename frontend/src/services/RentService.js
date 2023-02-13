import api from "./api"

const RentService = {

    rentScooter(data) {
        console.log(data);
        // return api().post("rent", { "rentScooter" : { "start_slot": data.id } });
    },

    getOneRent() {
        return api().post("/rent");
    },

    bringBackScooter(data) {
        console.log(data);
        // return api().post("return_scooter", { "returnBike": { "end_slot": data.id, "bike_id": data.bike_id } });
    },

};

export default RentService;