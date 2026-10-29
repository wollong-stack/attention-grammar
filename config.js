// Supabase 프로젝트 정보 (Publishable key는 브라우저에 공개되어도 되는 키)
window.APP = {
  url: 'https://jjblyxzfpofdpyjnqxpi.supabase.co',
  key: 'sb_publishable_lMBqPGXjKy4iOl7KIIASNQ_449pJbk4',
  vols: 70
};
// 로컬 테스트일 때만 모의 서버 사용
if (location.hostname === '127.0.0.1' || location.hostname === 'localhost') { APP.url = location.origin; APP.key = 'local-test'; }
