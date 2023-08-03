FROM node:14 as build-node

WORKDIR /app

COPY dddSample/ClientApp/package.json .
COPY dddSample/ClientApp/package-lock.json .
RUN npm install

COPY dddSample/ClientApp .

RUN npm run build --configuration=production --output-path=/app/dist

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-net

WORKDIR /app

COPY *.sln .
COPY Contracts/Core.csproj ./Contracts/
COPY dddSample/dddSample.csproj ./dddSample/
COPY Domain/Domain.csproj ./Domain/
COPY Infrastructure/Infrastructure.csproj ./Infrastructure/
RUN dotnet restore

COPY . .

RUN dotnet build -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS runtime

WORKDIR /app

COPY --from=build-net /app/out ./

COPY --from=build-node /app/dist ./wwwroot

EXPOSE 2443

ENTRYPOINT ["dotnet", "dddSample.dll"]
