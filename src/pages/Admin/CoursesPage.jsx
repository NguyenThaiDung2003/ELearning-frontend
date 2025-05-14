import React from 'react';
import './CoursesPage.css'; // Import CSS file for styling
import CourseCard from '../../component/CourseCard/CourseCard';

import plusIcon from '../../assets/plus.svg';

const CoursePage = () => {
    return (
        <div class="course-page">
            <div class="title">
                <h1>Khoá học</h1>
            </div>
            <div class="course-list-container">
                <div class="course-list">

                    <div class="add-new-card">
                        <img class="plusIcon" src={plusIcon} alt="add" />
                    </div>

                    <CourseCard
                        course={{
                            title: 'Khóa học React',
                            price: '900.000 VNĐ',
                            image: 'https://duhocvinedu.edu.vn/wp-content/uploads/2018/04/lich-su-hinh-thanh-dai-hoc-harvard-my.jpg'
                        }}
                    />


                    <CourseCard
                        course={{
                            title: 'Khóa học JavaScript',
                            price: '1.500.000 VNĐ',
                            image: 'https://datadesignsb.com/wp-content/uploads/2019/09/thiet-ke-do-hoa-hinh-anh.jpg'
                        }}
                    />

                    <CourseCard
                        course={{
                            title: 'Khóa học Lập trình Web',
                            price: '900.000 VNĐ',
                            image: 'https://itplus-academy.edu.vn/upload/071663969d40ee0e4a5c57251c1a8993/files/ha%202.jpg'
                        }}
                    />

                    <CourseCard
                        course={{
                            title: 'Khóa học gì đó khác',
                            price: '730.000 VNĐ',
                            image: 'https://digiart.academy/upload/images/khong-co-hoa-tay-2.png'
                        }}
                    />

                    <CourseCard
                        course={{
                            title: 'Khóa học Đồ hoạ',
                            price: '650.000 VNĐ',
                            image: 'https://hocdohoa.org/wp-content/uploads/2016/09/34.jpg'
                        }}
                    />

                    <CourseCard
                        course={{
                            title: 'Khóa học Đồ hoạ',
                            price: '650.000 VNĐ',
                            image: 'https://hocdohoa.org/wp-content/uploads/2016/09/34.jpg'
                        }}
                    />
                </div>
            </div>

        </div>

    );
}
export default CoursePage;