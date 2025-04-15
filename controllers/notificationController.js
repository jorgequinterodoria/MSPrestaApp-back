class NotificationController {
    constructor(pool) {
        this.pool = pool;
    }

    async getAllNotifications(req, res) {
        try {
            const result = await this.pool.query('SELECT * FROM notifications');
            res.json(result);
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar las notificaciones', details: error.message });
        }
    }

    async getNotificationById(req, res) {
        const notificationId = req.params.id;
        try {
            const result = await this.pool.query('SELECT * FROM notifications WHERE id = $1', [notificationId]);
            
            if (result.length === 0) {
                res.status(404).json({ error: 'Notificación no encontrada' });
            } else {
                res.json(result[0]);
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al cargar la notificación', details: error.message });
        }
    }

    async createNotification(req, res) {
        const { client_id, loan_id, message, type, send_date, status } = req.body;
        try {
            const result = await this.pool.query(
                'INSERT INTO notifications (client_id, loan_id, message, type, send_date, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
                [client_id, loan_id, message, type, send_date, status]
            );
            
            res.json({
                message: "Notificación creada correctamente",
                id: result[0].id,
            });
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al crear la notificación', details: error.message });
        }
    }

    async updateNotification(req, res) {
        const notificationId = req.params.id;
        const { client_id, loan_id, message, type, send_date, status } = req.body;
        try {
            const result = await this.pool.query(
                'UPDATE notifications SET client_id = $1, loan_id = $2, message = $3, type = $4, send_date = $5, status = $6 WHERE id = $7 RETURNING id',
                [client_id, loan_id, message, type, send_date, status, notificationId]
            );
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Notificación no encontrada' });
            } else {
                res.json({
                    message: "Notificación actualizada correctamente",
                    id: notificationId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al actualizar la notificación', details: error.message });
        }
    }

    async deleteNotification(req, res) {
        const notificationId = req.params.id;
        try {
            const result = await this.pool.query('DELETE FROM notifications WHERE id = $1 RETURNING id', [notificationId]);
            
            if (result.rowCount === 0) {
                res.status(404).json({ error: 'Notificación no encontrada' });
            } else {
                res.json({
                    message: "Notificación eliminada correctamente",
                    id: notificationId,
                });
            }
        } catch (error) {
            console.error('Error executing query', error);
            res.status(500).json({ error: 'Error al eliminar la notificación', details: error.message });
        }
    }
}

module.exports = NotificationController;