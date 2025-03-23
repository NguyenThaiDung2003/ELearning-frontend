import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <img src={course.image} alt={course.title} />
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <Link to={`/courses/${course._id}`} className="btn">Xem chi tiết</Link>
        </div>
    );
};

export default CourseCard;
