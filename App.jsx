\
import React, { useMemo, useState } from 'react';

const PAGE_SIZE = 3;

// Curated working CS2 commands (subset). You can extend this array.
const COMMANDS = [
  // Page 1
  {
    id: 'sv_cheats',
    category: 'Server / Cheats',
    cmd: 'sv_cheats 1',
    en: { name: 'Enable cheats', desc: 'Enables cheat/developer commands on the local server.' },
    ru: { name: 'Включить читы', desc: 'Включает команды разработчика на локальном сервере.' }
  },
  {
    id: 'mp_roundtime_defuse',
    category: 'Server / Gameplay',
    cmd: 'mp_roundtime_defuse 60',
    en: { name: 'Round time (defuse)', desc: 'Sets the round duration (minutes) for defuse maps.' },
    ru: { name: 'Время раунда (бомба)', desc: 'Устанавливает длительность раунда (в минутах) на картах с бомбой.' }
  },
  {
    id: 'mp_maxrounds',
    category: 'Server / Gameplay',
    cmd: 'mp_maxrounds 0',
    en: { name: 'Max rounds / Infinite rounds', desc: 'Set to 0 to disable the round limit.' },
    ru: { name: 'Макс раундов / Бескон. раунды', desc: 'Установите 0, чтобы отключить лимит раундов.' }
  },

  // Page 2
  {
    id: 'bot_add',
    category: 'Bots',
    cmd: 'bot_add_ct / bot_add_t / bot_add',
    en: { name: 'Add bot', desc: 'Adds a bot to CT or T team (or default). Use bot_kick to remove.' },
    ru: { name: 'Добавить бота', desc: 'Добавляет бота в команду CT или T. Для удаления — bot_kick.' }
  },
  {
    id: 'bot_kick',
    category: 'Bots',
    cmd: 'bot_kick',
    en: { name: 'Kick bots', desc: 'Removes bots from the server.' },
    ru: { name: 'Выгнать ботов', desc: 'Удаляет всех ботов с сервера.' }
  },
  {
    id: 'bot_place',
    category: 'Bots',
    cmd: 'bot_place',
    en: { name: 'Place bot', desc: 'Spawns a bot at your crosshair position.' },
    ru: { name: 'Поставить бота', desc: 'Спавнит бота перед прицелом.' }
  },

  // Page 3
  {
    id: 'mp_buytime',
    category: 'Economy',
    cmd: 'mp_buytime 9999',
    en: { name: 'Buy time', desc: 'Extends the buy period.' },
    ru: { name: 'Время покупки', desc: 'Увеличивает время покупки.' }
  },
  {
    id: 'mp_buy_anywhere',
    category: 'Economy',
    cmd: 'mp_buy_anywhere 1',
    en: { name: 'Buy anywhere', desc: 'Allows buying weapons/equipment anywhere.' },
    ru: { name: 'Покупка везде', desc: 'Позволяет покупать снаряжение из любой точки.' }
  },
  {
    id: 'mp_restartgame',
    category: 'Server / Gameplay',
    cmd: 'mp_restartgame 1',
    en: { name: 'Restart round', desc: 'Restarts the current match/round.' },
    ru: { name: 'Перезапуск игры', desc: 'Перезапускает текущую карту/раунд.' }
  },

  // Page 4
  {
    id: 'sv_infinite_ammo',
    category: 'Practice',
    cmd: 'sv_infinite_ammo 1',
    en: { name: 'Infinite ammo', desc: 'Gives unlimited ammo (requires sv_cheats 1).' },
    ru: { name: 'Бескон. патроны', desc: 'Дает бесконечные патроны (требует sv_cheats 1).' }
  },
  {
    id: 'sv_grenade_trajectory',
    category: 'Practice',
    cmd: 'sv_grenade_trajectory 1',
    en: { name: 'Grenade trajectory', desc: 'Displays thrown grenade trajectories (requires sv_cheats).' },
    ru: { name: 'Траектория гранат', desc: 'Показывает траектории гранат (требует sv_cheats).' }
  },
  {
    id: 'sv_grenade_trajectory_time',
    category: 'Practice',
    cmd: 'sv_grenade_trajectory_time 10',
    en: { name: 'Grenade trajectory time', desc: 'How long to show grenade trajectories (in seconds).' },
    ru: { name: 'Время траектории', desc: 'Время показа траекторий гранат (в секундах).' }
  },

  // Page 5
  {
    id: 'mp_freezetime',
    category: 'Server / Gameplay',
    cmd: 'mp_freezetime 0',
    en: { name: 'Freezetime', desc: 'Time at round start when players cannot move.' },
    ru: { name: 'Время заморозки', desc: 'Время, когда игроки не могут двигаться в начале раунда.' }
  },
  {
    id: 'mp_round_restart_delay',
    category: 'Server / Gameplay',
    cmd: 'mp_round_restart_delay 0',
    en: { name: 'Round restart delay', desc: 'Delay before a round restarts (seconds).' },
    ru: { name: 'Задержка перезапуска', desc: 'Задержка перед перезапуском раунда (в секундах).' }
  },
  {
    id: 'mp_timelimit',
    category: 'Server / Gameplay',
    cmd: 'mp_timelimit 0',
    en: { name: 'Map time limit', desc: 'Map time limit (minutes); 0 disables map change.' },
    ru: { name: 'Лимит времени карты', desc: 'Лимит времени карты; 0 — отключить смену карты.' }
  },

  // Page 6
  {
    id: 'cl_crosshairsize',
    category: 'Client / HUD',
    cmd: 'cl_crosshairsize 3',
    en: { name: 'Crosshair size', desc: 'Adjusts the crosshair size.' },
    ru: { name: 'Размер прицела', desc: 'Регулирует размер прицела.' }
  },
  {
    id: 'cl_crosshaircolor',
    category: 'Client / HUD',
    cmd: 'cl_crosshaircolor 5',
    en: { name: 'Crosshair color', desc: 'Sets crosshair color presets.' },
    ru: { name: 'Цвет прицела', desc: 'Устанавливает цвет прицела (пресеты).' }
  },
  {
    id: 'cl_radar_always_centered',
    category: 'Client / HUD',
    cmd: 'cl_radar_always_centered 0',
    en: { name: 'Radar centered', desc: 'Toggle radar centering on player position.' },
    ru: { name: 'Радар по центру', desc: 'Включает или выключает центрирование радара.' }
  },

  // Page 7
  {
    id: 'net_graph',
    category: 'Network',
    cmd: 'net_graph 1',
    en: { name: 'Net graph', desc: 'Show network statistics and FPS.' },
    ru: { name: 'График сети', desc: 'Показывает сетевую статистику и FPS.' }
  },
  {
    id: 'rate',
    category: 'Network',
    cmd: 'rate 786432',
    en: { name: 'Network rate', desc: 'Maximum bytes per second the client will accept (example).' },
    ru: { name: 'Rate', desc: 'Максимум байт/сек, принимаемых клиентом (пример).' }
  },
  {
    id: 'cl_interp',
    category: 'Network',
    cmd: 'cl_interp 0.031',
    en: { name: 'Interpolation', desc: 'Client interpolation amount affecting perceived latency.' },
    ru: { name: 'Интерполяция', desc: 'Величина интерполяции клиента, влияет на задержку.' }
  },

  // Page 8
  {
    id: 'snd_restart',
    category: 'Audio',
    cmd: 'snd_restart',
    en: { name: 'Restart audio', desc: 'Restarts the sound system.' },
    ru: { name: 'Перезапустить звук', desc: 'Перезапускает звуковую систему.' }
  },
  {
    id: 'mat_hdr_level',
    category: 'Graphics',
    cmd: 'mat_hdr_level 0',
    en: { name: 'HDR level', desc: 'Toggle HDR level (0/1/2).' },
    ru: { name: 'Уровень HDR', desc: 'Уровень HDR (0/1/2).' }
  },
  {
    id: 'mat_vsync',
    category: 'Graphics',
    cmd: 'mat_vsync 0',
    en: { name: 'V-Sync', desc: 'Toggle vertical sync.' },
    ru: { name: 'Вертикальная синхронизация', desc: 'Включение/отключение V-Sync.' }
  }
];

export default function App() {
  const [lang, setLang] = useState('ru');
  const [page, setPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(COMMANDS.length / PAGE_SIZE)), []);
  const current = useMemo(() => {
    const s = (page - 1) * PAGE_SIZE;
    return COMMANDS.slice(s, s + PAGE_SIZE);
  }, [page]);

  function goTo(n){
    if(n<1) n=1;
    if(n>totalPages) n=totalPages;
    setPage(n);
    window.scrollTo({top:0, behavior:'smooth'});
  }

  function copyText(t){
    navigator.clipboard.writeText(t).then(()=> {
      alert(lang==='ru' ? 'Скопировано' : 'Copied');
    }).catch(()=> alert(lang==='ru' ? 'Ошибка копирования' : 'Copy failed'));
  }

  return (
    <div className="container">
      <header className="header">
        <div>
          <div className="title">CS2 Console Commands</div>
          <div className="subtitle">Black & Yellow theme — Pagination mode. Curated working CS2 commands (no experimental/dev).</div>
        </div>
        <div className="controls">
          <button className="lang-btn" onClick={()=>setLang(lang==='ru'?'en':'ru')}>{lang==='ru' ? 'Русский' : 'English'}</button>
          <div style={{width:8}} />
          <div style={{color:'#9aa0a6', fontSize:12}}>Page {page} / {totalPages}</div>
        </div>
      </header>

      <div className="grid">
        <aside className="sidebar">
          <input className="input" placeholder={lang==='ru' ? 'Поиск... (необязательно)' : 'Search... (optional)'} disabled />
          <div style={{height:12}} />
          <select className="select" disabled>
            <option>{lang==='ru' ? 'Категория: Все' : 'Category: All'}</option>
          </select>

          <div style={{marginTop:12, color:'#9aa0a6', fontSize:13}}>
            <div><strong>{lang==='ru' ? 'Как использовать' : 'How to use'}:</strong></div>
            <ol style={{paddingLeft:18, marginTop:6}}>
              <li>{lang==='ru' ? 'Открой консоль (~) и вставь команду.' : 'Open console (~) and paste the command.'}</li>
              <li>{lang==='ru' ? 'Многие команды требуют sv_cheats 1.' : 'Many commands require sv_cheats 1.'}</li>
            </ol>
          </div>
        </aside>

        <main>
          {current.map(c=>(
            <article className="card" key={c.id} style={{marginBottom:12}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                <div>
                  <div className="command-title">{lang==='ru' ? c.ru.name : c.en.name}</div>
                  <div style={{color:'#9aa0a6', fontSize:12, marginTop:6}}>{c.category}</div>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8}}>
                  <div className="cmd-box">{c.cmd}</div>
                  <div style={{display:'flex', gap:8}}>
                    <button className="action-btn" onClick={()=>copyText(c.cmd)}>{lang==='ru' ? 'Копировать' : 'Copy'}</button>
                    <button className="action-btn" onClick={()=>copyText(c.cmd + '\\n// ' + (lang==='ru' ? c.ru.desc : c.en.desc))}>{lang==='ru' ? 'Коп с описанием' : 'Copy w/desc'}</button>
                  </div>
                </div>
              </div>
              <p style={{color:'#c7c7c7', marginTop:10}}>{lang==='ru' ? c.ru.desc : c.en.desc}</p>
            </article>
          ))}

          <nav className="pager">
            <div className="page-buttons">
              <button className="page-num" onClick={()=>goTo(page-1)} disabled={page===1}>{lang==='ru' ? 'Предыдущая' : 'Previous'}</button>
              <button className="page-num" onClick={()=>goTo(page+1)} disabled={page===totalPages}>{lang==='ru' ? 'Следующая' : 'Next'}</button>
            </div>

            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <div style={{color:'#9aa0a6', fontSize:13}}>{lang==='ru' ? 'Перейти:' : 'Jump to:'}</div>
              <div style={{display:'flex', gap:6}}>
                {Array.from({length:totalPages}).map((_,i)=>(
                  <button key={i} className="page-num" onClick={()=>goTo(i+1)} style={{background: page===i+1 ? '#ffcc33' : '#0a0a0a', color: page===i+1 ? '#000' : '#cfcfcf'}}>{i+1}</button>
                ))}
              </div>
            </div>
          </nav>

          <div className="footer">This is a source project. To deploy: run <code>npm install</code> then <code>npm run build</code> and upload the contents of <code>dist</code> to GitHub Pages (or set the repo to use /docs and copy files there).</div>
        </main>
      </div>
    </div>
  );
}
