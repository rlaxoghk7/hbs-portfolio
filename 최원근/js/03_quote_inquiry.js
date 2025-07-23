const productMap = {
  '효성모터': ['IE3 고효율 모터', '일반 산업용 유도 전동기', '냉각팬모터'],
  'ABB': ['IE3 고효율 모터', '일반 산업용 유도 전동기', '냉각팬모터'],
  '윌로펌프': ['Ex d', 'Ex e', 'Ex t'],
  '그린포스펌프': ['Ex d', 'Ex e', 'Ex t'],
  '데스미펌프': ['Ex d', 'Ex e', 'Ex t'],
  'DANFOSS': ['IE3 모터', 'IE4 프리미엄 모터'],
  '감속기': ['IE3 모터', 'IE4 프리미엄 모터'],
  '자동제어판넬': ['IE3 모터', 'IE4 프리미엄 모터']
};

document.getElementById('category').addEventListener('change', function () {
  const product = document.getElementById('product');
  const selected = this.value;
  product.innerHTML = '<option value="">제품을 선택해주세요</option>';
  if (productMap[selected]) {
    productMap[selected].forEach(name => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = name;
      product.appendChild(opt);
    });
  }
});

document.getElementById('phone').addEventListener('input', function () {
  this.value = this.value.replace(/[^0-9]/g, '');
});

document.getElementById('quoteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const fields = ['category','product','company','name','phone','email','subject','message'];
  for (let id of fields) {
    const el = document.getElementById(id);
    if (!el.value.trim()) {
      alert(`${el.previousElementSibling?.innerText || '필드'}을(를) 입력해주세요.`);
      el.focus();
      return;
    }
  }
  if (!document.getElementById('agree').checked) {
    alert('개인정보 이용에 동의해주세요.');
    return;
  }
  alert('문의가 정상적으로 접수되었습니다!');
  this.reset();
});

// 팝업 제어
const modal = document.getElementById('privacyModal');
let scrollY = 0;

function openPrivacyPopup() {
  modal.style.display = 'flex';
  scrollY = window.scrollY;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
}
function closePrivacyPopup() {
  modal.style.display = 'none';
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, scrollY);
}
document.getElementById('privacyScrollBox').addEventListener('scroll', function () {
  const el = this;
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) {
    document.getElementById('popupAgree').disabled = false;
  }
});
document.getElementById('popupAgree').addEventListener('change', function () {
  document.getElementById('agree').checked = this.checked;
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.style.display === 'flex') {
    closePrivacyPopup();
  }
});
modal.addEventListener('click', function () {
  closePrivacyPopup();
});
// 확인 버튼 클릭 시 팝업 닫기
document.getElementById('confirmPopupBtn').addEventListener('click', function () {
  closePrivacyPopup();
});
