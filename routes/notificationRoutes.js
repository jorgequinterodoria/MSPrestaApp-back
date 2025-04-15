const express = require('express');
const router = express.Router();
const DatabaseService = require('../config/db')
const NotificationController = require('../controllers/notificationController');

const notificationController = new NotificationController(DatabaseService.getConnection());

router.get('/', notificationController.getAllNotifications.bind(notificationController));
router.get('/:id', notificationController.getNotificationById.bind(notificationController));
router.post('/', notificationController.createNotification.bind(notificationController));
router.put('/:id', notificationController.updateNotification.bind(notificationController));
router.delete('/:id', notificationController.deleteNotification.bind(notificationController));

module.exports = router;