import { useState } from "react";
import { motion } from "framer-motion";

function todayISO() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);
  return localDate.toISOString().slice(0, 10);
}

export default function Onboarding({ onStart }) {
  const [date, setDate] = useState(todayISO);
  const [isExiting, setIsExiting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const formDate = event.currentTarget.elements.startDate.value;
    const selectedDate = formDate || date;

    if (!selectedDate) {
      return;
    }

    setIsExiting(true);
    window.setTimeout(() => onStart(selectedDate), 360);
  }

  return (
    <motion.form
      className="onboarding"
      initial={{ opacity: 0 }}
      animate={{ opacity: isExiting ? 0 : 1 }}
      transition={{ duration: 0.42, ease: "easeOut" }}
      onSubmit={handleSubmit}
    >
      <div className="onboarding__panel">
        <h2 className="onboarding__title">Когда ты вышел из шума?</h2>
        <p className="onboarding__hint">Отсюда начинается дорога в тишину.</p>
        <input
          className="date-input"
          type="date"
          name="startDate"
          value={date}
          max={todayISO()}
          onChange={(event) => setDate(event.target.value)}
          onInput={(event) => setDate(event.target.value)}
          aria-label="Дата начала"
          required
        />
        <button className="begin-button" type="submit" disabled={!date}>
          Начать путь
        </button>
      </div>
    </motion.form>
  );
}
