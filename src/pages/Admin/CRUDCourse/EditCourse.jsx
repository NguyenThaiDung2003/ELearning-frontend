import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import AddCourse from "./AddCourse";
import { adminGetCourseById, adminUpdateCourse } from '../../../api/adminAPI/adminApiRequest';

const EditCourse = () => {
    const navigate = useNavigate();
  const { id } = useParams(); // lấy course id từ URL
  console.log("ID khóa học:", id);
  const [courseToEdit, setCourseData] = useState(null);

  const handleUpdate = async (updatedFormData) => {
  try {
    for (let pair of updatedFormData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
    const res = await adminUpdateCourse(id, updatedFormData);
    console.log("Cập nhật thành công:", res);

    navigate('/admin/courses');
  } catch (error) {
    console.error("Cập nhật thất bại:", error);
    alert("Cập nhật khóa học thất bại!");
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await adminGetCourseById(id);
        setCourseData(data); // lưu dữ liệu vào state
        console.log("Dữ liệu khóa học:", data);
      } catch (error) {
        console.error("Không thể load khóa học:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // chỉ gọi lại nếu id thay đổi

  return (
    <div>
      {courseToEdit ? (
        <AddCourse
          courseId={id}
          initialData={courseToEdit}
          mode="edit"
          onSubmit={handleUpdate}
        />
      ) : (
        <p>Đang tải dữ liệu khóa học...</p>
      )}
    </div>
  );
};

export default EditCourse;
