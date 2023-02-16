import api from "./api"

const NotificationsService = {

    getAllNotifications() {
        // console.log('hola');
        return api().get("/notifications");
    },

    updateNotificationStatus(id) {
        // return api().delete(`notification/${id}`);
        console.log(id);
    }
    
};

export default NotificationsService;