function searchQuote() {
  const input = document.getElementById("quoteNumber").value.trim();
  if (input === "") {
    alert("견적번호를 입력해 주세요.");
    return;
  }

  // 실제 검색 기능은 백엔드 연동 필요
  console.log("검색된 견적번호:", input);
  alert(`'${input}' 번호로 검색합니다.`);
}
