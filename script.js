/* ========================================================
   GRADUATION INVITATION - JAVASCRIPT LOGIC
   ======================================================== */

// Cấu hình sự kiện (Bạn có thể thay đổi ngày giờ ở đây)
const EVENT_CONFIG = {
  title: "Lễ Tốt Nghiệp của Nguyễn Huỳnh Kỹ Thuật",
  eventDate: new Date("2026-10-24T11:00:00").getTime(),
};

// Gợi ý lời chúc có sẵn cho khách mời
const WISH_SUGGESTIONS = [
  "Chúc mừng bạn đã hoàn thành xuất sắc chặng đường đại học! Chúc bạn tương lai rộng mở và gặt hái thật nhiều thành công!",
  "Chúc mừng Tân Cử Nhân/Tân Kỹ Sư! Chúc bạn luôn giữ vững nhiệt huyết và chạm tới ước mơ của mình nhé!",
  "Ngày hái quả ngọt sau bao năm nỗ lực! Chúc mừng bạn và chúc cho chặng đường mới luôn tràn ngập niềm vui!",
  "Tự hào về bạn rất nhiều! Chúc bạn công việc thuận lợi, sự nghiệp thăng tiến và luôn rạng ngời!",
  "Một chương mới bắt đầu, chúc bạn chân cứng đá mềm, vững bước trên con đường phía trước!"
];

document.addEventListener("DOMContentLoaded", () => {
  initAudio();
  initEnvelope();
  initCountdown();
  initCalendar();
  initGalleryLightbox();
  initGuestbook();
  initRSVP();
  initContactDialog();
});

/* ========================================================
   1. AUDIO / NHẠC NỀN
   ======================================================== */
function initAudio() {
  const audio = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-toggle-btn");
  const audioWrap = document.querySelector(".audio-control");

  if (!audio || !musicBtn) return;

  // Bật chế độ lặp vô tận (Loop)
  audio.loop = true;

  // Cơ chế dự phòng: khi bài hát hết sẽ tự động tua về 0 và phát lại ngay lập tức
  audio.addEventListener("ended", () => {
    audio.currentTime = 0;
    audio.play().catch(err => console.log("Lặp lại bài hát:", err));
  });

  // Cố gắng bật nhạc khi gọi hàm này
  window.playMusic = function() {
    audio.play().then(() => {
      musicBtn.classList.add("playing");
      audioWrap.classList.remove("paused");
    }).catch(err => {
      console.log("Trình duyệt chặn autoplay hoặc chưa có file nhạc:", err);
      musicBtn.classList.remove("playing");
      audioWrap.classList.add("paused");
    });
  };

  window.toggleMusic = function() {
    if (audio.paused) {
      window.playMusic();
    } else {
      audio.pause();
      musicBtn.classList.remove("playing");
      audioWrap.classList.add("paused");
    }
  };

  musicBtn.addEventListener("click", window.toggleMusic);
}

/* ========================================================
   2. MÀN HÌNH MỞ THIỆP (ENVELOPE SCREEN)
   ======================================================== */
function initEnvelope() {
  const envelope = document.getElementById("envelope-screen");
  const openBtn = document.getElementById("btn-open-invite");

  // Kiểm tra nếu có param ?opened=1 trên URL thì bỏ qua màn hình mở thiệp
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("opened") === "1") {
    if (envelope) envelope.classList.add("opened");
    return;
  }

  if (openBtn && envelope) {
    openBtn.addEventListener("click", () => {
      envelope.classList.add("opened");
      // Phát nhạc ngay khi khách click nút Mở thiệp (tương tác trực tiếp được trình duyệt cho phép)
      if (window.playMusic) {
        window.playMusic();
      }
    });
  }
}

/* ========================================================
   3. ĐỒNG HỒ ĐẾM NGƯỢC (COUNTDOWN TIMER)
   ======================================================== */
function initCountdown() {
  const daysEl = document.getElementById("count-days");
  const hoursEl = document.getElementById("count-hours");
  const minutesEl = document.getElementById("count-minutes");
  const secondsEl = document.getElementById("count-seconds");

  if (!daysEl) return;

  function updateTimer() {
    const now = new Date().getTime();
    const distance = EVENT_CONFIG.eventDate - now;

    if (distance < 0) {
      daysEl.innerText = "00";
      hoursEl.innerText = "00";
      minutesEl.innerText = "00";
      if (secondsEl) secondsEl.innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.innerText = days < 10 ? "0" + days : days;
    hoursEl.innerText = hours < 10 ? "0" + hours : hours;
    minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
    if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ========================================================
   4. LỊCH MINI THÁNG 10 / 2026
   ======================================================== */
function initCalendar() {
  const calendarGrid = document.getElementById("calendar-cells");
  if (!calendarGrid) return;

  // Tháng 10 năm 2026: ngày 1/10/2026 rơi vào Thứ Năm.
  // Thứ 2 là cột 1, ..., Thứ 5 là cột 4 => 3 ô trống trước ngày 1 (T2, T3, T4).
  const totalDays = 31;
  const startOffset = 3; // 3 ô trống đầu tháng
  const eventDay = 24;

  let html = "";
  for (let i = 0; i < startOffset; i++) {
    html += `<div class="cal-cell empty"></div>`;
  }

  for (let d = 1; d <= totalDays; d++) {
    if (d === eventDay) {
      html += `
        <div class="cal-cell event-day">
          <svg viewBox="0 0 32 30" aria-hidden="true">
            <path d="M16 28S1 19.5 1 10.5C1 5.8 4.8 2 9.5 2c2.7 0 5.1 1.3 6.5 3.3C17.4 3.3 19.8 2 22.5 2 27.2 2 31 5.8 31 10.5 31 19.5 16 28 16 28z"></path>
          </svg>
          <span>${d}</span>
        </div>`;
    } else {
      html += `<div class="cal-cell"><span>${d}</span></div>`;
    }
  }

  calendarGrid.innerHTML = html;
}

/* ========================================================
   5. LIGHTBOX XEM ẢNH PHÓNG TO
   ======================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById("gallery-lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (!lightbox || !lightboxImg) return;

  galleryItems.forEach(item => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img && img.src && !img.src.includes("data:image/svg+xml")) {
        lightboxImg.src = img.src;
        lightbox.classList.add("active");
      }
    });
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}

/* ========================================================
   6. SỔ LƯU BÚT (GUESTBOOK) & GỢI Ý LỜI CHÚC
   ======================================================== */
function initGuestbook() {
  const nameInput = document.getElementById("guest-name");
  const messageInput = document.getElementById("guest-message");
  const charCounter = document.getElementById("char-counter");
  const submitBtn = document.getElementById("btn-submit-wish");
  const wishesList = document.getElementById("wishes-list");
  const suggestBtn = document.getElementById("btn-suggest-wish");
  const suggestModal = document.getElementById("modal-suggestions");
  const suggestCloseBtn = document.getElementById("close-suggestions");
  const suggestContainer = document.getElementById("suggestions-items");

  if (!submitBtn || !messageInput) return;

  // Bộ đếm ký tự
  messageInput.addEventListener("input", () => {
    const count = messageInput.value.length;
    if (charCounter) charCounter.innerText = `${count} / 500`;
  });

  // Load danh sách lời chúc từ localStorage
  const STORAGE_KEY = "graduation_wishes_saved";
  function loadWishes() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  }

  function renderWishes() {
    if (!wishesList) return;
    const wishes = loadWishes();
    if (wishes.length === 0) {
      wishesList.innerHTML = `<p class="wishes-empty">Hãy là người đầu tiên gửi lời chúc mừng!</p>`;
      return;
    }

    wishesList.innerHTML = wishes.map(item => `
      <div class="wish-item">
        <div class="wish-author">
          <span>${escapeHtml(item.name)}</span>
          <span class="wish-time">${item.time}</span>
        </div>
        <div class="wish-text">${escapeHtml(item.message)}</div>
      </div>
    `).join("");
  }

  renderWishes();

  // Gửi lời chúc
  submitBtn.addEventListener("click", () => {
    const name = nameInput.value.trim() || "Người bạn giấu tên";
    const message = messageInput.value.trim();

    if (!message) {
      alert("Vui lòng nhập lời chúc của bạn trước khi gửi!");
      messageInput.focus();
      return;
    }

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}`;

    const newWish = { name, message, time: timeStr };
    const wishes = loadWishes();
    wishes.unshift(newWish);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));

    // Reset form
    messageInput.value = "";
    if (charCounter) charCounter.innerText = "0 / 500";
    renderWishes();
  });

  // Modal gợi ý lời chúc
  if (suggestBtn && suggestModal) {
    if (suggestContainer) {
      suggestContainer.innerHTML = WISH_SUGGESTIONS.map(wish => `
        <div class="suggestion-chip">${escapeHtml(wish)}</div>
      `).join("");

      suggestContainer.querySelectorAll(".suggestion-chip").forEach(chip => {
        chip.addEventListener("click", () => {
          messageInput.value = chip.innerText;
          if (charCounter) charCounter.innerText = `${chip.innerText.length} / 500`;
          suggestModal.close();
        });
      });
    }

    suggestBtn.addEventListener("click", () => suggestModal.showModal());
    if (suggestCloseBtn) suggestCloseBtn.addEventListener("click", () => suggestModal.close());
    suggestModal.addEventListener("click", (e) => {
      if (e.target === suggestModal) suggestModal.close();
    });
  }
}

/* ========================================================
   7. XÁC NHẬN THAM DỰ (RSVP)
   ======================================================== */
function initRSVP() {
  const nameInput = document.getElementById("rsvp-name");
  const rsvpOptions = document.querySelectorAll(".rsvp-btn-option");
  const submitRsvpBtn = document.getElementById("btn-submit-rsvp");
  const rsvpNotice = document.getElementById("rsvp-notice");

  let selectedStatus = null;

  rsvpOptions.forEach(btn => {
    btn.addEventListener("click", () => {
      rsvpOptions.forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");
      selectedStatus = btn.getAttribute("data-status");
      if (submitRsvpBtn) submitRsvpBtn.removeAttribute("disabled");
    });
  });

  if (submitRsvpBtn) {
    submitRsvpBtn.addEventListener("click", () => {
      if (!selectedStatus) return;
      const guestName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Khách mời";

      const now = new Date();
      const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate()}/${now.getMonth() + 1}`;

      const rsvpEntry = {
        name: guestName,
        status: selectedStatus === "yes" ? "Sẽ tham dự" : "Vắng mặt",
        time: timeStr
      };

      // Lưu vào danh sách quản lý
      const currentList = JSON.parse(localStorage.getItem("graduation_rsvp_list") || "[]");
      currentList.unshift(rsvpEntry);
      localStorage.setItem("graduation_rsvp_list", JSON.stringify(currentList));

      if (rsvpNotice) {
        rsvpNotice.style.display = "block";
        rsvpNotice.innerText = selectedStatus === "yes" 
          ? `🎉 Cảm ơn ${guestName}! Hẹn gặp bạn tại buổi lễ nhé!` 
          : `❤️ Cảm ơn ${guestName} đã phản hồi! Rất tiếc vì bạn không thể đến.`;
      }
      submitRsvpBtn.innerText = "Đã gửi xác nhận ✓";
      submitRsvpBtn.disabled = true;
      if (nameInput) nameInput.disabled = true;
    });
  }
}

/* ========================================================
   8. THÔNG TIN LIÊN HỆ (POPUP MODAL)
   ======================================================== */
function initContactDialog() {
  const triggerBtn = document.getElementById("btn-open-contact");
  const dialog = document.getElementById("contact-dialog");
  const closeBtn = document.getElementById("close-contact-dialog");

  if (!triggerBtn || !dialog) return;

  triggerBtn.addEventListener("click", () => dialog.showModal());
  if (closeBtn) closeBtn.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

// Utility: Escape HTML
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}
