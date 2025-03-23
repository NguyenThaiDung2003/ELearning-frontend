import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/courseApi';

const LessonPage = () => {
    const { id, lessonId } = useParams();
    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        API.get(`/courses/${id}/lesson/${lessonId}`).then(response => setLesson(response.data));
    }, [id, lessonId]);

    if (!lesson) return <p>Đang tải...</p>;

    return (
        <div>
            <h2>{lesson.title}</h2>
            <video controls src={lesson.videoUrl}></video>
            <p>{lesson.content}</p>
        </div>
    );
};

export default LessonPage;
