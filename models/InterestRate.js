class InterestRate {
    constructor(id, percentage, description,is_active,created_at) {
        this.id = id;
        this.percentage = percentage;
        this.description = description;
        this.is_active = is_active;
        this.created_at = created_at;
    }
}
module.exports = InterestRate;