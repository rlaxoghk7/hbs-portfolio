function searchQuote() {
  const input = document.getElementById("quoteNumber").value.trim();
  const resultBox = document.getElementById("resultBox");

  if (input === "") {
    alert("견적번호를 입력해 주세요.");
    return;
  }

  // 결과 박스 표시
  resultBox.style.display = "block";

  // 모든 단계 초기화
  const steps = document.querySelectorAll(".progress .step");
  steps.forEach(step => step.classList.remove("active"));

  // 상태 텍스트 초기화
  const statusText = document.querySelector(".status-text p");
  const 단계이름 = ["견적 확인", "제작중", "제작완료", "배송중", "배송완료"];

  단계이름.forEach((name, index) => {
    setTimeout(() => {
      steps[index].classList.add("active");
      statusText.innerHTML = `
        <span class="icon">📌</span>
        지금은 <span class="highlight">${name}</span> 중 입니다.<br />
        잠시만 기다려 주십시오.
      `;
    }, index * 1000000); // 1초 간격
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("quoteNumber");
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      searchQuote();
    }
  });
});
