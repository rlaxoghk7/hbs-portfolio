document.getElementById('cancel').addEventListener('click', function () {
  if (confirm('작성을 취소하시겠습니까?')) {
    document.getElementById('inquiry').value = '';
  }
});

document.getElementById('submit').addEventListener('click', function () {
  const content = document.getElementById('inquiry').value.trim();

  if (content === '') {
    alert('문의 내용을 입력해주세요.');
    return;
  }

  // ✅ 접수 후 페이지 이동
  window.location.href = './04-3_FAQ.html'; 
});
