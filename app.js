// 공통: Supabase RPC 호출과 작은 도우미
const CIRC = ['', '①', '②', '③', '④', '⑤'];
async function rpc(fn, args) {
  const r = await fetch(APP.url + '/rest/v1/rpc/' + fn, {
    method: 'POST',
    // 새 형식 키(sb_publishable_…)는 JWT가 아니므로 apikey 헤더만 보냄
    headers: Object.assign({ apikey: APP.key, 'Content-Type': 'application/json' },
      APP.key.startsWith('eyJ') ? { Authorization: 'Bearer ' + APP.key } : {}),
    body: JSON.stringify(args || {})
  });
  const t = await r.text();
  let d = null; try { d = t ? JSON.parse(t) : null; } catch (e) {}
  if (!r.ok) throw new Error((d && d.message) || '서버에 연결할 수 없습니다');
  return d;
}
const store = {
  get(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function toast(msg, bad) {
  let t = $('#toast'); if (!t) { t = document.createElement('div'); t.id = 'toast'; document.body.appendChild(t); }
  t.textContent = msg; t.className = 'show' + (bad ? ' bad' : '');
  clearTimeout(t._h); t._h = setTimeout(() => t.className = '', 2600);
}
const range = vol => Array.from({ length: 20 }, (_, i) => (vol - 1) * 20 + i + 1);
