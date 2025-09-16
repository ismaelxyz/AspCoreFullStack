#!/bin/bash
# Espera a que SQL Server esté listo antes de iniciar la app
set -e

host="$1"
port="$2"

until nc -z "$host" "$port"; do
  echo "Esperando a SQL Server en $host:$port..."
  sleep 2
done

echo "SQL Server está listo, iniciando la app..."
exec "$@"
