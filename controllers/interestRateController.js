class InterestRateController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllInterestRates(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM interest_rates');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los intereses', details: error.message });
        }
    }

    async getInterestRateById(req, res) {
        const interestRateId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM interest_rates WHERE id = $1', [interestRateId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'Interés no encontrado' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el interés', details: error.message });
        }
    }

    async createInterestRate(req, res) {
        const { percentage, description, is_active } = req.body;
        try {
            const result = await this.pool.query(
                'INSERT INTO interest_rates (percentage, description, is_active) VALUES ($1, $2, $3) RETURNING id',
                [percentage, description, is_active]
            );
            
            res.json({
                message: "Interés creado correctamente",
                id: result[0].id,
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear el interés', details: error.message });
        }
    }

    async updateInterestRate(req, res) {
        const interestRateId = req.params.id;
        const { percentage, description, is_active } = req.body;
        try {
            const result = await this.pool.query(
                'UPDATE interest_rates SET percentage = $1, description = $2, is_active = $3 WHERE id = $4 RETURNING id',
                [percentage, description, is_active, interestRateId]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Interés no encontrado' });
            } else {
                res.json({
                    message: "Interés actualizado correctamente",
                    id: interestRateId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar el interés', details: error.message });
        }
    }

    async deleteInterestRate(req, res) {
        const interestRateId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM interest_rates WHERE id = $1 RETURNING id', [interestRateId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Interés no encontrado' });
            } else {
                res.json({
                    message: "Interés eliminado correctamente",
                    id: interestRateId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar el interés', details: error.message });
        }
    }
}

module.exports = InterestRateController;