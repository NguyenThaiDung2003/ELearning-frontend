import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API } from '../api/courseApi';

const QuizPage = () => {
    const { id, quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        API.get(`/courses/${id}/quiz/${quizId}`).then(response => setQuiz(response.data));
    }, [id, quizId]);

    const handleSubmit = async () => {
        const result = await API.post(`/courses/${id}/quiz/${quizId}/submit`, { answers });
        console.log(result.data);
    };

    if (!quiz) return <p>Đang tải...</p>;

    return (
        <div>
            <h2>{quiz.title}</h2>
            {quiz.questions.map((q, index) => (
                <div key={index}>
                    <p>{q.question}</p>
                    {q.options.map((option, i) => (
                        <label key={i}>
                            <input type="radio" name={`q${index}`} value={option} onChange={() => setAnswers({ ...answers, [index]: option })} />
                            {option}
                        </label>
                    ))}
                </div>
            ))}
            <button onClick={handleSubmit}>Nộp bài</button>
        </div>
    );
};

export default QuizPage;
