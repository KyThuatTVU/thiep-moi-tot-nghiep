# HƯỚNG DẪN TÙY CHỈNH THIỆP MỜI TỐT NGHIỆP

Trang web thiệp mời tốt nghiệp đã được tạo hoàn chỉnh bằng **HTML thuần**, **CSS** và **JavaScript vanilla**, tối ưu chuẩn giao diện di động (Mobile-First) và hỗ trợ đầy đủ tiếng Việt.

---

### 1. Cách thêm Hình Ảnh 📸
Bạn chỉ cần chép các file ảnh của mình vào thư mục `images/`:
* **Ảnh đại diện chính (khung Polaroid)**: Đặt tên là `avatar.jpg`
* **Album ảnh kỷ niệm (Khoảnh khắc thanh xuân)**:
  * `gallery-1.jpg` (Ảnh lớn nổi bật)
  * `gallery-2.jpg`
  * `gallery-3.jpg`
  * `gallery-4.jpg`
  * `gallery-5.jpg`

*(Lưu ý: Nếu chưa có ảnh, giao diện vẫn có khung chờ tự động rất đẹp mắt và không bị vỡ bố cục).*

---

### 2. Cách chèn Nhạc Nền 🎵
Bạn có 2 cách rất đơn giản:
* **Cách 1 (Khuyên dùng)**: Tải bài hát MP3 bạn yêu thích về máy, đổi tên thành `music.mp3` rồi bỏ vào thư mục `audio/`.
* **Cách 2**: Mở file `index.html`, tìm đến dòng số **22**:
  ```html
  <audio id="bg-music" loop preload="auto" src="audio/music.mp3"></audio>
  ```
  Thay đổi giá trị `src="audio/music.mp3"` bằng đường dẫn URL online trực tiếp của bài nhạc (ví dụ: `https://example.com/baihat.mp3`).

* **Cơ chế phát nhạc**:
  * Khi khách mời bấm nút **"Mở thiệp"**, nhạc sẽ **tự động phát** (đúng chuẩn tương tác mà không bị trình duyệt chặn).
  * Góc trên bên phải có nút đĩa nhạc xoay & sóng âm thanh để bật/tắt bất kỳ lúc nào.

---

### 3. Font chữ đã được cấu hình ✍️
Đã tích hợp đúng cấu hình font bạn yêu cầu với đầy đủ ký tự tiếng Việt:
* **Font tiêu đề (`--font-heading`)**: `'Quicksand', 'Plus Jakarta Sans', 'Be Vietnam Pro', system-ui, sans-serif`
* **Font nội dung (`--font-body`)**: `'Quicksand', 'Be Vietnam Pro', 'Plus Jakarta Sans', system-ui, sans-serif`
* **Font điểm nhấn viết tay (`--font-script`)**: `'Dancing Script', cursive` (dành cho các câu chữ nghệ thuật như *"Let's celebrate!"*, *"New chapter begins"*).

---

### 4. Tùy chỉnh Ngày Giờ & Thông Tin ⚙️
* **Đổi ngày đếm ngược**: Mở file `script.js`, dòng 6:
  ```javascript
  eventDate: new Date("2026-10-24T11:00:00").getTime(),
  ```
  Bạn có thể đổi thành ngày giờ thật của bạn.
* **Đổi số điện thoại / Link Zalo / Facebook**:
  Mở file `index.html`, cuộn xuống phần thẻ `<dialog id="contact-dialog">` ở cuối trang để đổi số điện thoại và đường dẫn mạng xã hội của bạn.

---

### 5. Cách xem thử
* Bạn chỉ cần nhấp đúp chuột vào file `index.html` để mở trực tiếp trên trình duyệt (Chrome, Cốc Cốc, Edge, Safari...).
* Có thể nhấn `F12` trên bàn phím và chọn biểu tượng điện thoại (Toggle device toolbar) để xem giao diện trên iPhone/Android.
