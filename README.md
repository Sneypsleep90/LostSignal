# Lost Signal

Lost Signal — атмосферное React-приложение для отслеживания дней вдали от цифрового шума. Интерфейс построен как тихое путешествие вглубь темного северного леса: крупный счетчик дней, возвращенные часы, текущая локация, дата начала и минимальная шкала прогресса.

## Stack

- React
- Vite
- Framer Motion
- localStorage
- Modular CSS files in `src/styles/`

## Install

```bash
pnpm install
```

## Run Locally

```bash
pnpm run dev
```

По умолчанию Vite поднимает локальный dev-сервер, например:

```text
http://localhost:5173/
```

## Production Build

```bash
pnpm run build
```

## Project Structure

```text
.
├── design/
│   └── README.md
├── src/
│   ├── components/
│   │   ├── AppHeader.jsx
│   │   ├── ForestBackground.jsx
│   │   ├── HeroCounter.jsx
│   │   ├── JourneyProgress.jsx
│   │   ├── Onboarding.jsx
│   │   └── StatisticsPanel.jsx
│   ├── constants/
│   │   └── journey.js
│   ├── styles/
│   │   ├── background.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── layout.css
│   │   ├── onboarding.css
│   │   └── responsive.css
│   ├── utils/
│   │   ├── computeStats.js
│   │   ├── formatDate.js
│   │   └── storage.js
│   ├── App.jsx
│   └── main.jsx
├── CHANGELOG.md
├── PROJECT_CONTEXT.md
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
└── vite.config.js
```
