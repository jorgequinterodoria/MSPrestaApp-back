class PaymentController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllPayments(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM payments');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los pagos', details: error.message });
        }
    }

    async getTotalPaymentsPerMonth(req, res) {
        try {
            const result = await this.pool.query('SELECT EXTRACT(MONTH FROM payment_date) AS month, SUM(amount) AS total_amount FROM payments GROUP BY month ORDER BY month');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el total de pagos por mes', details: error.message });
        }
    }
    async getPaymentById(req, res) {
        const paymentId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM payments WHERE id = $1', [paymentId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'Pago no encontrado' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el pago', details: error.message });
        }
    }

    async createPayment(req, res) {
        const { loan_id, amount, interest_pay, capital_pay, remaining, payment_date, notes } = req.body;
        try {
            const result = await this.pool.query(
                'INSERT INTO payments (loan_id, amount, interest_pay, capital_pay, remaining, payment_date, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
                [loan_id, amount, interest_pay, capital_pay, remaining, payment_date, notes]
            );
            
            res.json({
                id: result[0].id,
                loan_id,
                amount,
                interest_pay,
                capital_pay,
                remaining,
                payment_date,
                notes,
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear el pago', details: error.message });
        }
    }

    async updatePayment(req, res) {
        const paymentId = req.params.id;
        const { loan_id, amount, interest_pay, capital_pay, remaining, payment_date, notes } = req.body;
        try {
            const result = await this.pool.query(
                'UPDATE payments SET loan_id = $1, amount = $2, interest_pay = $3, capital_pay = $4, remaining = $5, payment_date = $6, notes = $7 WHERE id = $8 RETURNING id',
                [loan_id, amount, interest_pay, capital_pay, remaining, payment_date, notes, paymentId]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Pago no encontrado' });
            } else {
                res.json({
                    id: paymentId,
                    loan_id,
                    amount,
                    interest_pay,
                    capital_pay,
                    remaining,
                    payment_date,
                    notes,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar el pago', details: error.message });
        }
    }

    async deletePayment(req, res) {
        const paymentId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM payments WHERE id = $1 RETURNING id', [paymentId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Pago no encontrado' });
            } else {
                res.json({ message: 'Pago eliminado correctamente' });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar el pago', details: error.message });
        }
    }
}

module.exports = PaymentController;