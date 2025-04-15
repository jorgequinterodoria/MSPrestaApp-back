class LoanController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllLoans(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM loans');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los préstamos', details: error.message });
        }
    }

    async getLoanById(req, res) {
        const loanId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM loans WHERE id = $1', [loanId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'Préstamo no encontrado' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el préstamo', details: error.message });
        }
    }

    async createLoan(req, res) {
        const { 
            client_id, user_id, loan_type, principal_amount, start_date, 
            end_date, interest_rate_id, payment_period_id, cuote, 
            num_cuotes, current_balance, status 
        } = req.body;
        
        try {
            const result = await this.pool.query(
                `INSERT INTO loans (
                    client_id, user_id, loan_type, principal_amount, start_date, 
                    end_date, interest_rate_id, payment_period_id, cuote, 
                    num_cuotes, current_balance, status
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
                [
                    client_id, user_id, loan_type, principal_amount, start_date, 
                    end_date, interest_rate_id, payment_period_id, cuote, 
                    num_cuotes, current_balance, status
                ]
            );
            
            res.json({
                message: "Préstamo creado correctamente",
                id: result[0].id,
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear el préstamo', details: error.message });
        }
    }

    async updateLoan(req, res) {
        const loanId = req.params.id;
        const { 
            client_id, user_id, loan_type, principal_amount, start_date,
            interest_rate_id, payment_period_id, cuote, num_cuotes, 
            current_balance, status 
        } = req.body;
        
        try {
            const result = await this.pool.query(
                `UPDATE loans SET 
                    client_id = $1, user_id = $2, loan_type = $3, principal_amount = $4, 
                    start_date = $5, interest_rate_id = $6, payment_period_id = $7, 
                    cuote = $8, num_cuotes = $9, current_balance = $10, status = $11 
                WHERE id = $12 RETURNING id`,
                [
                    client_id, user_id, loan_type, principal_amount, start_date,
                    interest_rate_id, payment_period_id, cuote, num_cuotes,
                    current_balance, status, loanId
                ]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Préstamo no encontrado' });
            } else {
                res.json({
                    message: "Préstamo actualizado correctamente",
                    id: loanId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar el préstamo', details: error.message });
        }
    }

    async deleteLoan(req, res) {
        const loanId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM loans WHERE id = $1 RETURNING id', [loanId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Préstamo no encontrado' });
            } else {
                res.json({
                    message: "Préstamo eliminado correctamente",
                    id: loanId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar el préstamo', details: error.message });
        }
    }
}

module.exports = LoanController;