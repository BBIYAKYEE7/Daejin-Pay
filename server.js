const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5500;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // 수정된 부분
});

app.post('/update-student-info', (req, res) => { // 수정된 부분
  const { name, school, grade, room, number } = req.body;

  // 여기서 학생 정보를 데이터베이스에 저장하거나 처리하는 로직을 작성합니다.
  // 이 예시에서는 학생 정보를 그대로 응답으로 보내는 것으로 대체합니다.
  const response = {
    name,
    school,
    grade,
    room,
    number
  };

  // 학생 정보를 받아와서 처리한 후 응답으로 학생 정보 전송
  res.status(200).json(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
