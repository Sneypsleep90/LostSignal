import { motion } from "framer-motion";

export default function AppHeader() {
  return (
    <motion.header
      className="top-bar"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="brand-zone">
        <h1 className="brand">LOST SIGNAL</h1>
        <p className="signal-line">ещё один день дальше от шума</p>
      </div>

      <nav className="main-nav" aria-label="Главное меню">
        <span className="main-nav__item is-active">Обзор</span>
        <span className="main-nav__item">Дневник</span>
        <span className="main-nav__item">Статистика</span>
        <span className="main-nav__item">Настройки</span>
      </nav>

      <div className="forest-mark" aria-hidden="true">
        <svg viewBox="0 0 32 32" role="presentation">
          <path d="M16 5 L10 15 H13 L8 23 H14 V27 H18 V23 H24 L19 15 H22 Z" />
        </svg>
      </div>
    </motion.header>
  );
}
