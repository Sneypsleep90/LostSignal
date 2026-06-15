# Lost Signal — Task History

Файл для отслеживания сделанных шагов и ближайших задач.  
Обновлять после каждой значимой итерации.

## Сделано

### 2026-06-16

- **Task 01 — Foundation**
  - добавлена модель `signalProfile`;
  - добавлены constants для targets, themes и journey;
  - добавлены utils для storage, dates, progress и format;
  - реализована миграция со старого ключа `lost_signal_start`;
  - подключён основной лесной фон.

- **Task 02 — Onboarding**
  - добавлен fullscreen onboarding;
  - пользователь выбирает шум, ежедневное время, дату старта, первый рубеж и маршрут;
  - профиль сохраняется в `lost_signal_profile`;
  - dashboard открывается сразу, если профиль уже есть.

- **Task 02 Patch — Intro**
  - исправлен first-entry flow;
  - dashboard больше не рендерится под onboarding;
  - добавлен отдельный чёрный intro screen.

- **Task 04 — Dashboard**
  - обновлён `OverviewCard`;
  - добавлены hero-copy, metrics, location block и route progress;
  - улучшены quiet animations и responsive states.

- **Task 05 — Navigation and Reset**
  - добавлена стрелка назад в onboarding;
  - выбранные ответы сохраняются при возврате назад;
  - добавлен flow `Начать заново` с подтверждением;
  - reset очищает профиль и возвращает onboarding без перезагрузки.

- **Docs**
  - обновлён `README.md`;
  - добавлен этот task history.

## Следующие шаги

- улучшить мобильные состояния dashboard после визуальной проверки;
- привести неиспользуемые старые компоненты к текущей архитектуре или удалить позже отдельным cleanup;
- доработать дневник/статистику только после стабилизации главного экрана.
