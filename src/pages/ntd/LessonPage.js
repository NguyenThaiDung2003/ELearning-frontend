// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { API } from '../api/courseApi';

// const LessonPage = () => {
//     const { id, lessonId } = useParams();
//     const [lesson, setLesson] = useState(null);

//     useEffect(() => {
//         API.get(`/courses/${id}/lesson/${lessonId}`).then(response => setLesson(response.data));
//     }, [id, lessonId]);

//     if (!lesson) return <p>Đang tải...</p>;

//     return (
//         <div>
//             <h2>{lesson.title}</h2>
//             <video controls src={lesson.videoUrl}></video>
//             <p>{lesson.content}</p>
//         </div>
//     );
// };

// export default LessonPage;





// src/pages/LessonPage.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LessonPage() {
  const { id, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}/lessons/${lessonId}`)
      .then(res => setLesson(res.data));
  }, [id, lessonId]);

  if (!lesson) return <div>Đang tải bài giảng...</div>;

  return (
    <div>
      <h2>{lesson.title}</h2>
      <video width="640" height="360" controls src={lesson.videoUrl}></video>
      <p>{lesson.content}</p>
    </div>
  );
}
