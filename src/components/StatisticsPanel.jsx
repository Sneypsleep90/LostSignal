import { motion } from "framer-motion";

export default function StatisticsPanel({ hours, location, startDate }) {
  return (
    <motion.section
      className="statistics-panel"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="rule" aria-hidden="true" />

      <p className="hours">{hours.toLocaleString("ru-RU")} часов возвращено</p>

      <p className="location-label">Текущая локация</p>
      <p className="location-name">{location}</p>

      <div className="rule" aria-hidden="true" />
      {startDate && <p className="started">начало {startDate}</p>}
    </motion.section>
  );
}
