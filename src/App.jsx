import React, { useMemo, useState } from "react";

const PAGE_SIZE = 3;

const COMMANDS = [
  {
    id: "sv_cheats",
    category: "Server / Cheats",
    cmd: "sv_cheats 1",
    en: { name: "Enable cheats", desc: "Enables cheat/developer commands on the local server." },
    ru: { name: "Включить читы", desc: "Включает команды разработчика на локальном сервере." }
  },
  {
    id: "mp_roundtime_defuse",
    category: "Server / Gameplay",
    cmd: "mp_roundtime_defuse 60",
    en: { name: "Round time (defuse)", desc: "Sets the round duration (minutes) for defuse maps." },
    ru: { name: "Время раунда (бомба)", desc: "Устанавливает длительность раунда (в минутах) на картах с бомбой." }
  },
  {
    id: "mp_maxrounds",
    category: "Server / Gameplay",
    cmd: "mp_maxrounds 0",
    en: { name: "Max rounds / Infinite rounds", desc: "Set to 0 to disable the round limit." },
    ru: { name: "Макс раундов / Бескон. раунды", desc: "Установите 0, чтобы отключить лимит раундов." }
  },
  // (оставшиеся команды — можно добавить позже)
];

export default function App() {
  const [lang, setLang] = useState("ru");
  const [page, setPage] = useState(1);
  const totalPages = useMemo(() => Math.max(1, Math.ceil(COMMANDS.length / PAGE_SIZE)), []);
  const current = useMemo(() => {
    const s = (page - 1) * PAGE_SIZE;
    return COMMANDS.slice(s, s + PAGE_SIZE);
  }, [page]);

  function goTo(n) {
    if (n < 1) n = 1;
    if (n > totalPages) n = totalPages;
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function copyText(t) {
    navigator.clipboard.writeText(t).then(() => {
      alert(lang === "ru" ? "Скопировано" : "Copied");
    }).catch(() => alert(lang === "ru" ? "Ошибка копирования" : "Copy failed"));
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="title">CS2 Console Commands</div>
          <div className="subtitle">Black & Yellow theme — Pagination mode. Curated working CS2 commands (no experimental/dev).</div>
        </div>
        <div className="controls">
          <button className="lang-btn" onClick={() => setLang(lang === "ru" ? "en" : "ru")}>{lang === "ru" ? "Русский" : "English"}</button>
          <div style={{ width: 8 }} />
          <div style={{ color: "#9aa0a6", fontSize: 12 }}>Page {page} / {totalPages}</div>
        </div>
      </header>

      <div className="grid">
        <aside className="sidebar">
          <input className="input" placeholder={lang === "ru" ? "Поиск... (необязательно)" : "Search... (optional)"} disabled />
          <div style={{ height: 12 }} />
          <select className="select" disabled>
            <option>{lang === "ru" ? "Категория: Все" : "Category: All"}</option>
          </select>

          <div style={{ marginTop: 12, color: "#9aa0a6", fontSize: 13 }}>
            <div><strong>{lang === "ru" ? "Как использовать" : "How to use"}:</strong></div>
            <ol style={{ paddingLeft: 18, marginTop: 6 }}>
              <li>{lang === "ru" ? "Открой консоль (~) и вставь команду." : "Open console (~) and paste the command."}</li>
              <li>{lang === "ru" ? "Многие команды требуют sv_cheats 1." : "Many commands require sv_cheats 1."}</li>
            </ol>
          </div>
        </aside>

        <main>
          {current.map(c => (
            <article className="card" key={c.id} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div className="command-title">{lang === "ru" ? c.ru.name : c.en.name}</div>
                  <div style={{ color: "#9aa0a6", fontSize: 12, marginTop: 6 }}>{c.category}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                  <div className="cmd-box">{c.cmd}</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="action-btn" onClick={() => copyText(c.cmd)}>{lang === "ru" ? "Копировать" : "Copy"}</button>
                    <button className="action-btn" onClick={() => copyText(c.cmd + "\n// " + (lang === "ru" ? c.ru.desc : c.en.desc))}>{lang === "ru" ? "Коп с описанием" : "Copy w/desc"}</button>
                  </div>
                </div>
              </div>
              <p style={{ color: "#c7c7c7", marginTop: 10 }}>{lang === "ru" ? c.ru.desc : c.en.desc}</p>
            </article>
          ))}

          <nav className="pager">
            <div className="page-buttons">
              <button className="page-num" onClick={() => goTo(page - 1)} disabled={page === 1}>{lang === "ru" ? "Предыдущая" : "Previous"}</button>
              <button className="page-num" onClick={() => goTo(page + 1)} disabled={page === totalPages}>{lang === "ru" ? "Следующая" : "Next"}</button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ color: "#9aa0a6", fontSize: 13 }}>{lang === "ru" ? "Перейти:" : "Jump to:"}</div>
              <div style={{ display: "flex", gap: 6 }}>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button key={i} className="page-num" onClick={() => goTo(i + 1)} style={{ background: page === i + 1 ? "#ffcc33" : "#0a0a0a", color: page === i + 1 ? "#000" : "#cfcfcf" }}>{i + 1}</button>
                ))}
              </div>
            </div>
          </nav>

          <div className="footer">This is a source project. To deploy: run <code>npm install</code> then <code>npm run build</code> and upload the contents of <code>dist</code> to GitHub Pages (or use GitHub Actions).</div>
        </main>
      </div>
    </div>
  );
    }
  
