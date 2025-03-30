import React from 'react';
import './LessonForm.css';

export default function LessonForm() {
  return (
    <div className="lesson-form">

      <form>
        <div className="info-group">
          <label>Tên bài học</label>
          <input type="text" name="title" placeholder="Nhập tên bài học" />

          <label>Mô tả</label>
          <textarea name="description" placeholder="Mô tả ngắn về bài học..." />

          <label>Tài liệu </label>
          <input type="file" name="material" />

          <label>URL video bài giảng</label>
          <input type="url" name="videoUrl" placeholder="https://..." />

        </div>

        <div className="quiz-area">
          <label>Bài kiểm tra</label>
          <button type="button" class="addQuiz" onClick={() => alert("Mở form thêm bài kiểm tra")}>
            Thêm bài kiểm tra
          </button>
        </div>

        <div className="submit-area">
          <button type="submit" class="submit">Lưu bài học</button>
          <button type="submit" class="cancel">Huỷ</button>
        </div>

      </form>
    </div>
  );
}
