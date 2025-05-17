import AddCourse from "./AddCourse";

const EditCourse = () => {
  const courseToEdit = {
    name: 'React cơ bản',
    description: 'Học từ đầu đến nâng cao',
    category: 'Web',
    difficulty: 'Trung bình',
    price: 500000,
    discountPrice: 250000,
    lessons: [
      { id: 1, title: 'Giới thiệu', videoUrl: '...' },
      { id: 2, title: 'JSX và Components', videoUrl: '...' }
    ]
  };

  const handleUpdate = (updatedCourse) => {
    console.log('Dữ liệu cập nhật:', updatedCourse);
    // Gọi API PUT tại đây
  };

  return (
    <AddCourse
      initialData={courseToEdit}
      mode="edit"
      onSubmit={handleUpdate}
    />
  );
};

export default EditCourse;