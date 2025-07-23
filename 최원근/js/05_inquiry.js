const faqData = [
  {
id: "1234",
    question: "제품의 단가는 어디에서 확인할 수 있나요?",
    questionLink: "../05-1_inquery.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05-2_inquery.html" 
  },
  {
    question: "제품의 단가는 어디에서 확인할 수 있나요?",
    questionLink: "../05-1_inquery.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05-2_inquery.html" 
  },
  {
    question: "제품의 단가는 어디에서 확인할 수 있나요?",
    questionLink: "../05-1_inquery.html",   
    answer: "답변이 등록되었습니다.",
    answerLink: "../05-2_inquery.html" 
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
          <a href="${item.questionLink}" target="_blank">${item.question}</a>
        </div>
      </div>
      <div class="faq-box answer">
        <div class="faq-label a">A</div>
        <div class="faq-content">
          <a href="${item.answerLink}" target="_blank">${item.answer}</a>
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
