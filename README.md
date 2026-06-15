# Lost Signal

Тёмное React-приложение про уход от цифрового шума.  
Lost Signal показывает, сколько дней пользователь идёт дальше от шума, сколько времени вернулось, где он сейчас на маршруте и сколько осталось до первого рубежа.

Интерфейс держится на образе ночного северного леса: туман, слабый сигнал, стеклянные панели, приглушённый зелёный акцент и минимум текста.

## Что готово

- fullscreen onboarding с выбором шума, времени, даты старта и первого рубежа;
- профиль `signalProfile` в `localStorage` по ключу `lost_signal_profile`;
- миграция старого ключа `lost_signal_start`;
- главный экран с днями, возвращённым временем, текущей локацией и маршрутом;
- тёмный лесной фон, fog/noise layers и спокойные анимации;
- reset flow: `Начать заново` через подтверждение.

## Стек

- React
- Vite
- pnpm
- Framer Motion
- localStorage
- CSS в `src/styles/`

## Запуск

```bash
pnpm install
pnpm run dev
```

Локальный адрес Vite:

```text
http://localhost:5173/
```

## Сборка

```bash
pnpm run build
```

## Структура

```text
src/
  assets/        # фон и локальные ассеты
  components/    # UI-компоненты
  constants/     # targets, themes, journey
  styles/        # базовые стили, layout, background, responsive
  utils/         # storage, dates, progress, format, stats
  App.jsx
  main.jsx

design/          # визуальные референсы и дизайн-контекст
docs/            # правила, продуктовая идея, архитектурный контекст
tasks/           # история задач и дальнейшие шаги
```

## Документы

- [docs/product-vision.md](docs/product-vision.md) — суть продукта и тон.
- [design/visual-language.md](design/visual-language.md) — визуальный язык.
- [docs/codex-rules.md](docs/codex-rules.md) — правила работы над проектом.
- [tasks/TASKS.md](tasks/TASKS.md) — история сделанных задач и ближайшие шаги.
