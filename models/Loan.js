class Loan {
    constructor(id, client_id, user_id,loan_type, principal_amount, start_date,  interest_rate_id, payment_period_id, cuote, num_cuotes, current_balance,status, created_at) {
        this.id = id;
        this.client_id = client_id;
        this.user_id = user_id;
        this.loan_type = loan_type;
        this.principal_amount = principal_amount;
        this.start_date = start_date;
        this.interest_rate_id = interest_rate_id;
        this.payment_period_id = payment_period_id;
        this.cuote = cuote;
        this.num_cuotes = num_cuotes;
        this.current_balance = current_balance;
        this.status = status;
        this.created_at = created_at;
    }
}
module.exports = Loan;