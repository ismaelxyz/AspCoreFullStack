# Dockerfile para ASP.NET Core con SQL Server

# Imagen base con SDK para desarrollo y migraciones
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY ["aspnetcore-crud-delete.csproj", "./"]
RUN dotnet restore "./aspnetcore-crud-delete.csproj"
COPY . .
RUN dotnet build "aspnetcore-crud-delete.csproj" -c Release -o /app/build
RUN dotnet publish "aspnetcore-crud-delete.csproj" -c Release -o /app/publish

# Instala la herramienta dotnet-ef y netcat para la conectividad
RUN dotnet tool install --global dotnet-ef
RUN apt-get update && apt-get install -y netcat-openbsd curl gnupg && rm -rf /var/lib/apt/lists/*

# Instalar SQL Server command line tools
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - \
    && curl https://packages.microsoft.com/config/ubuntu/22.04/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y mssql-tools unixodbc-dev \
    && rm -rf /var/lib/apt/lists/*

ENV PATH="$PATH:/root/.dotnet/tools:/opt/mssql-tools/bin"

# Copiar scripts de inicio
COPY start-app.sh /app/start-app.sh
COPY wait-for-sqlserver.sh /app/wait-for-sqlserver.sh
RUN chmod +x /app/start-app.sh /app/wait-for-sqlserver.sh

# Cambiar al directorio donde está publicada la aplicación
WORKDIR /app/publish
ENTRYPOINT ["/app/start-app.sh"]
