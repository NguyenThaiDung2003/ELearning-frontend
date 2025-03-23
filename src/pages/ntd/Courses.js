import { useEffect, useState } from 'react';
import { API } from '../api/courseApi';
import CourseCard from '../components/CourseCard';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        API.get('/courses').then(response => setCourses(response.data));
    }, []);

    return (
        <div>
            <h2>Danh sách khóa học</h2>
            <div className="course-list">
                {courses.map(course => <CourseCard key={course._id} course={course} />)}
            </div>
        </div>
    );
};

export default Courses;
