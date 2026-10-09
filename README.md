# Trumpverse

Trumpverse er en webapplikasjon utviklet som eksamensprosjekt i webutvikling ved Kristiania. Brukeren kan se og administrere personer i Trumps stab.

Prosjektet består av en frontend i React og TypeScript og et backend-API i C# og ASP.NET Core. Data lagres i SQLite gjennom Entity Framework Core.

## Funksjoner

- Se en oversikt over personer i staben
- Legge til nye personer
- Redigere informasjon
- Slette personer
- Laste opp bilder

## Teknologier

- React og TypeScript
- Vite
- Axios
- C# og ASP.NET Core
- Entity Framework Core og SQLite
- Swagger

## Prosjektstruktur

- `TrumpverseUi/` – frontend
- `TrumpverseApi/` – backend og database
- `Rapport.pdf` – prosjektrapport
- `exam_video.mp4` – demonstrasjon

## Last ned og kjør prosjektet

### Forutsetninger

Installer Node.js med npm og .NET 8 SDK. Bruk gjerne VS Code til å åpne prosjektet.

### 1. Last ned prosjektet

Trykk **Code → Download ZIP** på GitHub, pakk ut filen og åpne prosjektmappen i VS Code.

Du kan også klone prosjektet:

```bash
git clone https://github.com/hesi016/webutvikling-trump.git
cd webutvikling-trump
```

### 2. Start backend

Åpne en terminal i prosjektets hovedmappe og kjør:

```bash
cd TrumpverseApi
dotnet run --launch-profile http
```

API-et kjører på http://localhost:5027.

Swagger er tilgjengelig på http://localhost:5027/swagger.

La terminalen stå åpen.

### 3. Start frontend

Åpne en ny terminal i prosjektets hovedmappe og kjør:

```bash
cd TrumpverseUi
npm install
npm run dev
```

Åpne http://localhost:3000/ i nettleseren, eller adressen som vises i terminalen.

Både backend og frontend må kjøre samtidig. Avslutt med **Ctrl + C** i hver terminal.

## Demonstrasjon

[Se demonstrasjonsvideoen](exam_video.mp4)

## Rapport

[Les prosjektrapporten](Rapport.pdf)
