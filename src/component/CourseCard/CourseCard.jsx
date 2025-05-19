import './CourseCard.css';
import React from 'react';

const CourseCard = ({ course, onClick }) => {
    const fprice = course.price.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const fdiscountPrice = course.discountPrice.toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
        
    return (
        <div className="ad-course-card" onClick={onClick}>
            <img src={course.image} alt={course.title} className="ad-course-image" />
            <div className="ad-course-info">
                <h2 className="ad-course-title">{course.name}</h2>
                <div className="ad-course-keyword">
                    <p className="ad-course-category">{course.category}</p>
                    <p className={`level ${course.level.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`}>
                        {course.level}</p>
                </div>

                <div className="ad-price">
                    <p className="ad-course-price"> {fprice}</p>
                    <p className="ad-discount-price">{fdiscountPrice}</p>
                </div>
            
            </div>
        </div>
    );
}
export default CourseCard;