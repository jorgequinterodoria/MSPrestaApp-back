CREATE DATABASE IF NOT EXISTS loan_management;
USE loan_management;

-- Tabla de Clientes
CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Tasas de Interés
CREATE TABLE interest_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    percentage DECIMAL(5,2) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Períodos de Pago
CREATE TABLE payment_periods (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    days INT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Préstamos
CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    loan_type ENUM('interest_only', 'fixed_installment') NOT NULL,
    principal_amount DECIMAL(15,2) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    interest_rate_id INT NOT NULL,
    payment_period_id INT NOT NULL,
    current_balance DECIMAL(15,2) NOT NULL,
    status ENUM('active', 'terminated') DEFAULT 'active',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (interest_rate_id) REFERENCES interest_rates(id),
    FOREIGN KEY (payment_period_id) REFERENCES payment_periods(id)
);

-- Tabla de Pagos
CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    loan_id INT NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    payment_date DATETIME NOT NULL,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (loan_id) REFERENCES loans(id)
);

-- Tabla de Notificaciones
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    loan_id INT,
    message TEXT NOT NULL,
    type ENUM('reminder', 'due', 'alert') NOT NULL,
    send_date DATETIME NOT NULL,
    status ENUM('sent', 'pending') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id),
    FOREIGN KEY (loan_id) REFERENCES loans(id)
);

-- Tabla de Usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'collector') NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_loans_client ON loans(client_id);
CREATE INDEX idx_loans_interest ON loans(interest_rate_id);
CREATE INDEX idx_loans_period ON loans(payment_period_id);
CREATE INDEX idx_payments_loan ON payments(loan_id);
CREATE INDEX idx_notifications_client ON notifications(client_id);
CREATE INDEX idx_notifications_loan ON notifications(loan_id);
CREATE INDEX idx_users_username ON users(username);