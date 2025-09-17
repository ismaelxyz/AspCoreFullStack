-- Crear la base de datos si no existe
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ListDb')
BEGIN
    CREATE DATABASE ListDb;
    PRINT 'Base de datos ListDb creada exitosamente.';
END
ELSE
BEGIN
    PRINT 'La base de datos ListDb ya existe.';
END
