class PaymentPeriodController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllPaymentPeriods(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM payment_periods');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los períodos de pago', details: error.message });
        }
    }

    async getPaymentPeriodById(req, res) {
        const paymentPeriodId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM payment_periods WHERE id = $1', [paymentPeriodId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'Período de pago no encontrado' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el período de pago', details: error.message });
        }
    }

    async createPaymentPeriod(req, res) {
        const { name, days, is_active } = req.body;
        try {
            const result = await this.pool.query(
                'INSERT INTO payment_periods (name, days, is_active) VALUES ($1, $2, $3) RETURNING id',
                [name, days, is_active]
            );
            
            res.json({
                message: 'Período de pago creado correctamente',
                id: result[0].id
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear el período de pago', details: error.message });
        }
    }

    async updatePaymentPeriod(req, res) {
        const paymentPeriodId = req.params.id;
        const { name, days, is_active } = req.body;
        try {
            const result = await this.pool.query(
                'UPDATE payment_periods SET name = $1, days = $2, is_active = $3 WHERE id = $4 RETURNING id',
                [name, days, is_active, paymentPeriodId]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Período de pago no encontrado' });
            } else {
                res.json({
                    message: 'Período de pago actualizado correctamente',
                    id: paymentPeriodId
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar el período de pago', details: error.message });
        }
    }

    async deletePaymentPeriod(req, res) {
        const paymentPeriodId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM payment_periods WHERE id = $1 RETURNING id', [paymentPeriodId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Período de pago no encontrado' });
            } else {
                res.json({ 
                    message: 'Período de pago eliminado correctamente',
                    id: paymentPeriodId
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar el período de pago', details: error.message });
        }
    }
}

module.exports = PaymentPeriodController;