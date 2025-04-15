class UserController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllUsers(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM users');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar los usuarios', details: error.message });
        }
    }

    async getUserById(req, res) {
        const userId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM users WHERE id = $1', [userId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'Usuario no encontrado' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar el usuario', details: error.message });
        }
    }

    async createUser(req, res) {
        const { name, username, password, role, phone } = req.body;
        try {
            const result = await this.pool.query(
                'INSERT INTO users (name, username, password, role, phone) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [name, username, password, role, phone]
            );
            
            res.json({
                message: "Usuario creado correctamente",
                id: result[0].id,
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
        }
    }

    async updateUser(req, res) {
        const userId = req.params.id;
        const { name, username, password, role, phone } = req.body;
        try {
            const result = await this.pool.query(
                'UPDATE users SET name = $1, username = $2, password = $3, role = $4, phone = $5 WHERE id = $6 RETURNING id',
                [name, username, password, role, phone, userId]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Usuario no encontrado' });
            } else {
                res.json({
                    message: "Usuario actualizado correctamente",
                    id: userId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
        }
    }

    async deleteUser(req, res) {
        const userId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM users WHERE id = $1 RETURNING id', [userId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Usuario no encontrado' });
            } else {
                res.json({
                    message: "Usuario eliminado correctamente",
                    id: userId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
        }
    }
}

module.exports = UserController;