class Notification {
    constructor(id, client_id, loan_id, message, type,send_date, status, created_at) {
        this.id = id;
        this.client_id = client_id;
        this.loan_id = loan_id;
        this.message = message;
        this.type = type; 
        this.send_date = send_date;
        this.status = status;
        this.created_at = created_at;
    }
}
module.exports = Notification;