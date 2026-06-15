export const JOURNEY_STAGES = [
  {
    id: "forest_edge",
    englishName: "Forest Edge",
    ruName: "Опушка",
    description: "Первые шаги от шума.",
  },
  {
    id: "deep_pines",
    englishName: "Deep Pines",
    ruName: "Глубокие сосны",
    description: "Лес становится гуще.",
  },
  {
    id: "old_cabin",
    englishName: "Old Cabin",
    ruName: "Старая хижина",
    description: "Тихая точка на пути.",
  },
  {
    id: "foggy_lake",
    englishName: "Foggy Lake",
    ruName: "Туманное озеро",
    description: "Сигнал отражается в тумане.",
  },
  {
    id: "silent_valley",
    englishName: "Silent Valley",
    ruName: "Тихая долина",
    description: "Шум почти не доходит сюда.",
  },
  {
    id: "lost_signal",
    englishName: "Lost Signal",
    ruName: "Lost Signal",
    description: "Сигнал почти исчез.",
  },
];

export const JOURNEY_MILESTONES = JOURNEY_STAGES.map((stage, index) => ({
  day: index,
  label: stage.ruName,
  ...stage,
}));
