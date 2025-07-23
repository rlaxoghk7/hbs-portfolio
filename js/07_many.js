document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq-item");
  const faqTotal = document.querySelector(".faq-total");

  // 총 질문 수 반영
  faqTotal.textContent = faqItems.length;

  // 아코디언
  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".toggle-icon");

    answer.style.display = "none"; // 확실히 닫아둠

    question.addEventListener("click", () => {
      const isOpen = answer.style.display === "flex";

      // 모든 항목 닫기
      faqItems.forEach(i => {
        i.querySelector(".faq-answer").style.display = "none";
        i.querySelector(".toggle-icon").textContent = "+";
      });

      // 클릭한 항목 열기
      if (!isOpen) {
        answer.style.display = "flex";
        icon.textContent = "−";
      }
    });
  });
});
