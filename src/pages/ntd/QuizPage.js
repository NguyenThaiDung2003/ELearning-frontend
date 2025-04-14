// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { API } from '../api/courseApi';

// const QuizPage = () => {
//     const { id, quizId } = useParams();
//     const [quiz, setQuiz] = useState(null);
//     const [answers, setAnswers] = useState({});

//     useEffect(() => {
//         API.get(`/courses/${id}/quiz/${quizId}`).then(response => setQuiz(response.data));
//     }, [id, quizId]);

//     const handleSubmit = async () => {
//         const result = await API.post(`/courses/${id}/quiz/${quizId}/submit`, { answers });
//         console.log(result.data);
//     };

//     if (!quiz) return <p>Đang tải...</p>;

//     return (
//         <div>
//             <h2>{quiz.title}</h2>
//             {quiz.questions.map((q, index) => (
//                 <div key={index}>
//                     <p>{q.question}</p>
//                     {q.options.map((option, i) => (
//                         <label key={i}>
//                             <input type="radio" name={`q${index}`} value={option} onChange={() => setAnswers({ ...answers, [index]: option })} />
//                             {option}
//                         </label>
//                     ))}
//                 </div>
//             ))}
//             <button onClick={handleSubmit}>Nộp bài</button>
//         </div>
//     );
// };

// export default QuizPage;




// src/pages/QuizPage.js
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function QuizPage() {
  const { id, quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5000/api/courses/${id}/quizzes/${quizId}`)
      .then(res => setQuiz(res.data));
  }, [id, quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    axios.post(`http://localhost:5000/api/quizzes/${quizId}/submit`, { answers })
      .then(res => alert(`Điểm của bạn: ${res.data.score}`));
  };

  if (!quiz) return <div>Đang tải bài kiểm tra...</div>;

  return (
    <div>
      <h2>{quiz.title}</h2>
      {quiz.questions.map((q, idx) => (
        <div key={q._id}>
          <p>{idx + 1}. {q.question}</p>
          {q.options.map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name={`q_${q._id}`}
                value={opt}
                onChange={() => handleAnswerChange(q._id, opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Nộp bài</button>
    </div>
  );
}
