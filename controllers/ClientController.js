class ClientController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllClients(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM clients');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los clientes', details: error.message });
        }
    }

    async getClientById(req, res) {
        const clientId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM clients WHERE id = $1', [clientId]);
            if (result.length === 0) {
                res.status(404).json({ error: 'Cliente no encontrado' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el cliente', details: error.message });
        }
    }

    async createClient(req, res) {
        const { full_name, phone, address } = req.body;
        if (!full_name || !phone || !address) {
            return res.status(400).json({ error: 'Faltan datos' });
        }
        
        try {
            const result = await this.pool.query(
                'INSERT INTO clients (full_name, phone, address) VALUES ($1, $2, $3) RETURNING id',
                [full_name, phone, address]
            );
            res.status(201).json({
                message: "Cliente creado correctamente",
                id: result[0].id,
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear el cliente', details: error.message });
        }
    }

    async updateClient(req, res) {
        const clientId = req.params.id;
        const { full_name, phone, address } = req.body;
        if (!full_name || !phone || !address) {
            return res.status(400).json({ error: 'Faltan datos' });
        }
        
        try {
            const result = await this.pool.query(
                'UPDATE clients SET full_name = $1, phone = $2, address = $3 WHERE id = $4 RETURNING id',
                [full_name, phone, address, clientId]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Cliente no encontrado' });
            } else {
                res.json({
                    message: "Cliente actualizado correctamente",
                    id: clientId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar el cliente', details: error.message });
        }
    }

    async deleteClient(req, res) {
        const clientId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM clients WHERE id = $1 RETURNING id', [clientId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Cliente no encontrado' });
            } else {
                res.json({
                    message: "Cliente eliminado correctamente",
                    id: clientId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar el cliente', details: error.message });
        }
    }

    async getClientLoans(req, res) {
        const clientId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM loans WHERE client_id = $1', [clientId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'No se encontraron préstamos para este cliente' });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los préstamos', details: error.message });
        }
    }

    async getClientPayments(req, res) {
        const clientId = req.params.id;
        try {
            const result = await this.pool.query(
                'SELECT * FROM payments WHERE loan_id IN (SELECT id FROM loans WHERE client_id = $1)',
                [clientId]
            );
            
            if (result.length === 0) {
                res.status(404).json({ error: 'No se encontraron pagos para este cliente' });
            } else {
                res.status(200).json(result);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los pagos', details: error.message });
        }
    }
}

module.exports = ClientController;