const faqs = [
  "제품을 언제는 어디에서 확인할 수 있나요?",
  "대량 구매 시 할인이나 계약 단위 설정이 가능한가요?",
  "거래를 위해 사업자등록증이나 회사정보가 필요한지 미리 알 수 있나요?",
  "해외로 제품 수출도 가능한가요?",
  "A/S나 부품 수리는 어떻게 요청하나요?",
  "제품 보증 기간은 어떻게 되나요?",
  "테스트 용 1줄 추가"
  // 필요 시 더 추가 가능
];

const itemsPerPage = 5;
const faqListEl = document.getElementById('faq-list');
const paginationEl = document.getElementById('pagination');
const countEl = document.getElementById('faq-count');

// 총 개수 표시
countEl.innerText = faqs.length + "건";

function renderPage(page) {
  faqListEl.innerHTML = '';
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentFaqs = faqs.slice(start, end);

  currentFaqs.forEach(question => {
    const item = document.createElement('div');
    item.className = 'faq-item';
    item.innerHTML = `
      <div class="icon">Q</div>
      <a href="./04-1_FAQ.html">${question}</a>
    `;
    faqListEl.appendChild(item);
  });
}

function renderPagination() {
  const pageCount = Math.ceil(faqs.length / itemsPerPage);
  paginationEl.innerHTML = '';

  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.innerText = i;
    if (i === 1) btn.classList.add('active');
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pagination button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPage(i);
    });
    paginationEl.appendChild(btn);
  }
}






renderPage(1);
renderPagination();
