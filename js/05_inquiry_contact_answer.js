const faqData = [
  {
id: "1234",
    question: "제품의 단가는 어디에서 확인할 수 있나요?",
    questionLink: "../05_inquiry_contact-3.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05_inquiry_contact_answer.html" 
  },
  {
    question: "특정 환경(고온·습기·먼지 등)에서도 사용 가능한 제품이 있나요?",
    questionLink: "../05_inquiry_contact-3.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05_inquiry_contact_answer.html" 
  },
  {
    question: "맞춤형(커스터마이징) 제작이 가능한가요? 가능하다면 어떤 정보를 제공해야 하나요?",
    questionLink: "../05_inquiry_contact-3.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05_inquiry_contact_answer.html" 
  },
  {
    question: "모터 설치 및 유지보수는 직접 해야 하나요, 아니면 기술 지원이 제공되나요?",
    questionLink: "../05_inquiry_contact-3.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05_inquiry_contact_answer.html" 
  },
  {
    question: "에너지 효율 등급이나 절전형 제품이 따로 있나요?",
    questionLink: "../05_inquiry_contact-3.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05_inquiry_contact_answer.html" 
  }
];

const faqListElement = document.getElementById("faqList");
const faqCountElement = document.getElementById("faqCount");

function renderFAQ(data) {
  faqListElement.innerHTML = "";
  faqCountElement.textContent = data.length;

  if (data.length === 0) {
    faqListElement.innerHTML = "<p>검색 결과가 없습니다.</p>";
    return;
  }

  data.forEach(item => {
    const faqItem = document.createElement("div");
    faqItem.classList.add("faq-item");

    faqItem.innerHTML = `
      <div class="faq-box">
        <div class="faq-label q">Q</div>
        <div class="faq-content">
          <a href="${item.questionLink}" >${item.question}</a>
        </div>
      </div>
      <div class="faq-box answer">
        <div class="faq-label a">A</div>        
        <div class="faq-content">
          <a href="${item.answerLink}" >${item.answer}</a>
        </div>
      </div>
    `;

    faqListElement.appendChild(faqItem);
  });
}


function searchFAQ() {
  const keyword = document.getElementById("searchInput").value.trim();
  if (!keyword) {
    renderFAQ(faqData);
    return;
  }

  const filtered = faqData.filter(item => item.id.includes(keyword));
  renderFAQ(filtered);
}

// 초기 FAQ 로딩
renderFAQ(faqData);
