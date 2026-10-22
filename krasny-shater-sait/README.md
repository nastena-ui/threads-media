# Сайт Красного Шатра «Энергия женщины»

Vite + React + TypeScript + Tailwind v4 + motion. Сцена из трёх фото, которая управляется прокруткой (на телефоне обычная вертикальная версия).

- `src/App.tsx`: сцена на фиксированном полотне 1440x810, масштабируется по ширине окна
- `src/scroll.ts`: фазы прокрутки и смены фото
- `src/content.ts`: тексты, ссылки, список фото
- `src/Sections.tsx`: программа, галерея, ведущая, вопросы, запись
- `public/img/`: фото (с согласия участниц)

Запуск: `npm install`, `npm run dev`. Сборка: `npm run build`. Публикация: GitHub Actions (`.github/workflows/pages.yml`) собирает `dist` и выкладывает на GitHub Pages после слияния в main.
