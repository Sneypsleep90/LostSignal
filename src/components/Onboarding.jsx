import { useEffect, useMemo, useState } from "react";
import {
  DEFAULT_TARGET_ID,
  TARGETS,
  getTargetById,
} from "../constants/targets.js";
import { DEFAULT_THEME_ID, THEMES } from "../constants/themes.js";
import { getTodayDateString } from "../utils/dates.js";

const DAILY_TIME_OPTIONS = [
  { id: "30", label: "30 мин", value: 30 },
  { id: "60", label: "1 час", value: 60 },
  { id: "90", label: "1.5 часа", value: 90 },
  { id: "120", label: "2 часа", value: 120 },
  { id: "180", label: "3 часа", value: 180 },
  { id: "custom", label: "Своё", value: "custom" },
];

const THRESHOLD_OPTIONS = [
  { id: "14", label: "14 дней", value: 14 },
  { id: "30", label: "30 дней", value: 30 },
  { id: "45", label: "45 дней", value: 45 },
  { id: "60", label: "60 дней", value: 60 },
  { id: "custom", label: "Свой рубеж", value: "custom" },
];

function getDateOffsetString(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

function toPositiveInteger(value, fallback) {
  const number = Math.trunc(Number(value));
  return Number.isFinite(number) && number > 0 ? number : fallback;
}

function ChoiceButton({ isSelected, children, onClick }) {
  return (
    <button
      className={["onboarding-choice", isSelected ? "is-selected" : ""]
        .filter(Boolean)
        .join(" ")}
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function Onboarding({ onComplete }) {
  const today = getTodayDateString();
  const yesterday = getDateOffsetString(-1);
  const [step, setStep] = useState(0);
  const [target, setTarget] = useState(DEFAULT_TARGET_ID);
  const activeTarget = useMemo(() => getTargetById(target), [target]);
  const [dailyOption, setDailyOption] = useState(
    String(activeTarget.defaultDailyUsageMinutes),
  );
  const [dailyUsageMinutes, setDailyUsageMinutes] = useState(
    activeTarget.defaultDailyUsageMinutes,
  );
  const [dateOption, setDateOption] = useState("today");
  const [startDate, setStartDate] = useState(today);
  const [thresholdOption, setThresholdOption] = useState(
    String(activeTarget.defaultGoalDays),
  );
  const [goalDays, setGoalDays] = useState(activeTarget.defaultGoalDays);
  const [dateMessage, setDateMessage] = useState("");

  useEffect(() => {
    setDailyOption(String(activeTarget.defaultDailyUsageMinutes));
    setDailyUsageMinutes(activeTarget.defaultDailyUsageMinutes);
    setThresholdOption(String(activeTarget.defaultGoalDays));
    setGoalDays(activeTarget.defaultGoalDays);
  }, [activeTarget]);

  function chooseDailyTime(option) {
    setDailyOption(option.id);

    if (option.value !== "custom") {
      setDailyUsageMinutes(option.value);
    }
  }

  function chooseDate(nextOption) {
    setDateOption(nextOption);
    setDateMessage("");

    if (nextOption === "today") {
      setStartDate(today);
    }

    if (nextOption === "yesterday") {
      setStartDate(yesterday);
    }
  }

  function handleCustomDate(value) {
    if (value > today) {
      setStartDate(today);
      setDateMessage("Будущая дата не подходит.");
      return;
    }

    setStartDate(value || today);
    setDateMessage("");
  }

  function chooseThreshold(option) {
    setThresholdOption(option.id);

    if (option.value !== "custom") {
      setGoalDays(option.value);
    }
  }

  function completeOnboarding() {
    onComplete({
      startDate: startDate > today ? today : startDate,
      target,
      dailyUsageMinutes: toPositiveInteger(
        dailyUsageMinutes,
        activeTarget.defaultDailyUsageMinutes,
      ),
      goalDays: toPositiveInteger(goalDays, activeTarget.defaultGoalDays),
      theme: DEFAULT_THEME_ID,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (step === 5) {
      completeOnboarding();
      return;
    }

    setStep((currentStep) => Math.min(currentStep + 1, 5));
  }

  if (step === 0) {
    return (
      <section className="onboarding onboarding--intro" aria-label="Lost Signal">
        <div className="onboarding-intro" aria-live="polite">
          <p className="onboarding-intro__logo">Lost Signal</p>
          <h1 className="onboarding-intro__title">Уйти от шума.</h1>
          <button
            className="begin-button onboarding-intro__button"
            type="button"
            onClick={() => setStep(1)}
          >
            Начать путь
          </button>
        </div>
      </section>
    );
  }

  return (
    <form className="onboarding onboarding--questions" onSubmit={handleSubmit}>
      <div
        key={step}
        className="onboarding__panel"
      >
        <p className="onboarding__step">0{step} / 05</p>

        {step === 1 && (
          <>
            <h2 className="onboarding__title">Что для тебя шум?</h2>
            <div className="onboarding-options" aria-label="Источник шума">
              {TARGETS.map((targetOption) => (
                <ChoiceButton
                  key={targetOption.id}
                  isSelected={targetOption.id === target}
                  onClick={() => setTarget(targetOption.id)}
                >
                  {targetOption.label}
                </ChoiceButton>
              ))}
            </div>
            <button className="begin-button" type="submit">
              Дальше
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="onboarding__title">
              Сколько времени шум забирал в день?
            </h2>
            <div className="onboarding-options onboarding-options--grid">
              {DAILY_TIME_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.id}
                  isSelected={option.id === dailyOption}
                  onClick={() => chooseDailyTime(option)}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
            {dailyOption === "custom" && (
              <label className="quiet-field">
                <span>Минут в день</span>
                <input
                  className="quiet-input"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={dailyUsageMinutes}
                  onChange={(event) =>
                    setDailyUsageMinutes(toPositiveInteger(event.target.value, 1))
                  }
                  onInput={(event) =>
                    setDailyUsageMinutes(toPositiveInteger(event.target.value, 1))
                  }
                />
              </label>
            )}
            <button className="begin-button" type="submit">
              Дальше
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="onboarding__title">Когда ты вышел из шума?</h2>
            <div className="onboarding-options onboarding-options--grid">
              <ChoiceButton
                isSelected={dateOption === "today"}
                onClick={() => chooseDate("today")}
              >
                Сегодня
              </ChoiceButton>
              <ChoiceButton
                isSelected={dateOption === "yesterday"}
                onClick={() => chooseDate("yesterday")}
              >
                Вчера
              </ChoiceButton>
              <ChoiceButton
                isSelected={dateOption === "custom"}
                onClick={() => chooseDate("custom")}
              >
                Выбрать дату
              </ChoiceButton>
            </div>
            {dateOption === "custom" && (
              <label className="quiet-field">
                <span>Дата начала</span>
                <input
                  className="quiet-input"
                  type="date"
                  max={today}
                  value={startDate}
                  onChange={(event) => handleCustomDate(event.target.value)}
                  onInput={(event) => handleCustomDate(event.target.value)}
                />
              </label>
            )}
            {dateMessage && <p className="onboarding__note">{dateMessage}</p>}
            <button className="begin-button" type="submit">
              Дальше
            </button>
          </>
        )}

        {step === 4 && (
          <>
            <h2 className="onboarding__title">Первый рубеж</h2>
            <p className="onboarding__hint">
              Это не конец пути. Это первая настоящая дистанция.
            </p>
            <div className="onboarding-options onboarding-options--grid">
              {THRESHOLD_OPTIONS.map((option) => (
                <ChoiceButton
                  key={option.id}
                  isSelected={option.id === thresholdOption}
                  onClick={() => chooseThreshold(option)}
                >
                  {option.label}
                </ChoiceButton>
              ))}
            </div>
            {thresholdOption === "custom" && (
              <label className="quiet-field">
                <span>Дней до рубежа</span>
                <input
                  className="quiet-input"
                  type="number"
                  min="1"
                  inputMode="numeric"
                  value={goalDays}
                  onChange={(event) =>
                    setGoalDays(toPositiveInteger(event.target.value, 1))
                  }
                  onInput={(event) =>
                    setGoalDays(toPositiveInteger(event.target.value, 1))
                  }
                />
              </label>
            )}
            <button className="begin-button" type="submit">
              Дальше
            </button>
          </>
        )}

        {step === 5 && (
          <>
            <h2 className="onboarding__title">Куда уходит сигнал?</h2>
            <div className="route-card">
              <div>
                <p className="route-card__status">Доступно</p>
                <h3>{THEMES[0].label}</h3>
              </div>
              <p>{THEMES[0].description}</p>
            </div>
            <button className="begin-button" type="submit">
              Начать путь
            </button>
          </>
        )}
      </div>
    </form>
  );
}
