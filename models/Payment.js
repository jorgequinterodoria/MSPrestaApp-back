class Payment{
    constructor(id, loan_id, amount, interest_pay, capital_pay, remaining, payment_date, notes, created_at) {
        this.id = id;
        this.loan_id = loan_id;
        this.amount = amount;
        this.interest_pay = interest_pay;
        this.capital_pay = capital_pay;
        this.remaining = remaining;
        this.payment_date = payment_date;
        this.notes = notes;
        this.created_at = created_at;
    }
}