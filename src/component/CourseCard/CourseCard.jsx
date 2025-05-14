import './CourseCard.css';
import React from 'react';

const CourseCard = ({ course }) => {
    return (
        <div className="course-card">
            <img src={course.image} alt={course.title} className="course-image" />
            <div className="course-info">
                <h2 className="course-title">{course.title}</h2>
                <p className="course-price">{course.price}</p>
            </div>
        </div>
    );
}
export default CourseCard;