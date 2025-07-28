  document.addEventListener("DOMContentLoaded", function () {
    const openBtn = document.querySelector(".openEmailPopup");
    const popup = document.querySelector(".emailPopup");
    const closeBtn = document.querySelector(".closeEmailPopup");

    openBtn.addEventListener("click", function (e) {
      e.preventDefault();
      popup.style.display = "block";
    });

    closeBtn.addEventListener("click", function () {
      popup.style.display = "none";
    });

    // 팝업 바깥 클릭 시 닫기
    popup.addEventListener("click", function (e) {
      if (e.target === popup) {
        popup.style.display = "none";
      }
    });
  });


  document.addEventListener("DOMContentLoaded", function () {
    const openTermsBtn = document.querySelector(".openTermsPopup");
    const termsPopup = document.querySelector(".termsInfoPopup");
    const closeTermsBtn = document.querySelector(".closeTermsPopup");

    openTermsBtn?.addEventListener("click", function (e) {
      e.preventDefault();
      termsPopup.style.display = "block";
    });

    closeTermsBtn?.addEventListener("click", function () {
      termsPopup.style.display = "none";
    });

    termsPopup?.addEventListener("click", function (e) {
      if (e.target === termsPopup) {
        termsPopup.style.display = "none";
      }
    });
  });