#!/bin/bash
set -e

echo "Esperando a que SQL Server esté listo..."
# Esperar a que SQL Server esté disponible
until nc -z sqlserver 1433; do
  echo "Esperando a SQL Server..."
  sleep 2
done

echo "SQL Server está listo."

# Crear la base de datos si no existe (usando sqlcmd)
echo "Verificando/creando base de datos..."
/opt/mssql-tools/bin/sqlcmd -S sqlserver -U sa -P PeneRico12! -Q "IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'ListDb') CREATE DATABASE ListDb;" || echo "Base de datos ya existe o error al crearla"

# Ejecutar migraciones desde el directorio del proyecto donde está el .csproj
echo "Ejecutando migraciones de Entity Framework..."
export ASPNETCORE_ENVIRONMENT=Development

# Cambiar al directorio donde está el proyecto para ejecutar migraciones
cd /app
# Usar la versión publicada para las migraciones
dotnet ef database update --no-build --verbose --configuration Release || echo "Migraciones completadas o no necesarias"

# Cambiar al directorio de trabajo correcto para ejecutar la aplicación
cd /app/publish

echo "Iniciando la aplicación..."
exec dotnet aspnetcore-crud-delete.dll