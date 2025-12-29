
DROP DATABASE IF EXISTS carrosdb;
CREATE DATABASE carrosdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE carrosdb;

CREATE TABLE marcas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_marca VARCHAR(50) NOT NULL
);

INSERT INTO marcas (id, nome_marca) VALUES 
(1, 'Ford'), (2, 'BMW'), (3, 'Toyota'), (4, 'Audi'),
(5, 'Mercedes-Benz'), (6, 'Volkswagen'), (7, 'Tesla'), (8, 'Porsche'),
(9, 'Ferrari'), (10, 'Hyundai'), (11, 'Volvo'), (12, 'Nissan'), (13, 'Chevrolet');

CREATE TABLE tipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_tipo VARCHAR(50) NOT NULL
);

INSERT INTO tipos (id, nome_tipo) VALUES 
(1, 'Desportivo'), (2, 'SUV'), (3, 'Sedan'), (4, 'Carrinha (Station Wagon)'),
(5, 'Coupé'), (6, 'Cabriolet'), (7, 'Pick-up'), (8, 'Elétrico'),
(9, 'Híbrido'), (10, 'Citadino'), (11, 'Monovolume');


CREATE TABLE carros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    ano INT NOT NULL,
    motorizacao VARCHAR(100),
    potencia_cv INT,
    marca_id INT,
    tipo_id INT,
    FOREIGN KEY (marca_id) REFERENCES marcas(id),
    FOREIGN KEY (tipo_id) REFERENCES tipos(id)
);


INSERT INTO carros (modelo, ano, motorizacao, potencia_cv, marca_id, tipo_id) VALUES 

('M4 Competition', 2024, '3.0L TwinTurbo', 510,  2, 5),


('Yaris Hybrid', 2023, '1.5L Hybrid', 116, 3, 9),

('A6 Avant', 2023, '2.0L TDI', 204, 4, 4),


('Classe S Longo', 2024, '3.0L I6', 435, 5, 3),

('Polo GTI', 2023, '2.0L TSI', 207, 6, 10),


('Model Y Performance', 2024, 'Dual Motor AWD', 534, 7, 8),

('911 Carrera S Cabrio', 2024, '3.0L Boxer 6', 450, 8, 6),


('F8 Tributo', 2023, '3.9L V8 Turbo', 720, 9, 1),

('Tucson N Line', 2024, '1.6L T-GDI', 180, 10, 2),


('XC90 Recharge', 2024, 'Híbrido Plug-in', 455, 11, 2),


('Navara Pro-4X', 2023, '2.3L dCi', 190, 12, 7),


('Corvette Stingray', 2024, '6.2L V8', 495, 13, 1);