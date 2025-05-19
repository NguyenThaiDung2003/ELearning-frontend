import React, { useState } from 'react';
import './CoursesPage.css';
import CourseCard from '../../component/CourseCard/CourseCard';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getCourses } from '../../api/adminAPI/adminApiRequest';

import plusIcon from '../../assets/plus.svg';

const CoursePage = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCourses();
                setCourses(data.courses);
            } catch (error) {
                console.error("Lỗi khi lấy courses:", error);
            }
        };

        fetchData();
    }, []);



    const [searchTerm, setSearchTerm] = useState('');
      const [searchKeyword, setSearchKeyword] = useState('');
    
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    const filteredCourses = courses.filter(course =>
        course.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        course.category.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    const handleSearchClick = () => {
        setSearchKeyword(searchTerm);
    };

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirst, indexOfLast);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);
    const navigate = useNavigate();


    return (
        <div className="course-page">

            

            <div className="title">
                <h1>Khoá học</h1>
            </div>

            <div className="ad-search-input-container">
                <input className="ad-search-input"
                    type="text"
                    placeholder="Tìm khóa học..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearchClick();
                        }
                    }}
                />
                <button className="ad-search-button" onClick={handleSearchClick}>Tìm</button>
            </div>
            
            <div className="course-list-container">
                <div className="course-list">

                    <div className="add-new-card card"
                        onClick={() => { navigate('/admin/courses/add'); }} >
                        <img className="plusIcon" src={plusIcon} alt="add" />
                    </div>

                    {currentCourses.map((course, idx) => (
                        <CourseCard
                            onClick={() => { navigate(`/admin/courses/edit/${course._id}`) }}
                            key={idx}
                            course={course}
                            className="card"
                        />
                    ))}


                </div>
            </div>

            <div className="pagination">
                <button
                    className="numbering"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ←
                </button>

                {[...Array(totalPages)].map((_, idx) => (
                    <button
                        className={`numbering ${currentPage === idx + 1 ? 'active' : ''}`}
                        key={idx}
                        onClick={() => setCurrentPage(idx + 1)}>
                        {idx + 1}
                    </button>
                ))}

                <button
                    className="numbering"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    →
                </button>
            </div>

        </div>

    );
}
export default CoursePage;