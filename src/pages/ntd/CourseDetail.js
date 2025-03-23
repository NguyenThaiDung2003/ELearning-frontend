import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/courseApi';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        API.get(`/courses/${id}`).then(response => setCourse(response.data));
    }, [id]);

    if (!course) return <p>Đang tải...</p>;

    return (
        <div>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <h3>Nội dung khóa học</h3>
            <ul>
                {course.lessons.map(lesson => (
                    <li key={lesson._id}>
                        <a href={`/courses/${id}/lesson/${lesson._id}`}>{lesson.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseDetail;
