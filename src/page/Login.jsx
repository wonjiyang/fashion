import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login({ setAuthenticate }) {
  const navigate = useNavigate();

  // ✅ 입력값 및 에러 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // 이메일 형식 검사 (간단한 정규식)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
    }

    // 비밀번호 검사 (6자 이상)
    if (!password) {
      newErrors.password = '비밀번호를 입력해주세요.';
    } else if (password.length < 6) {
      newErrors.password = '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const loginUser = (event) => {
    event.preventDefault();

    if (!validate()) return; // 유효성 검사 통과 못하면 중단

    // 로그인 성공
    setAuthenticate(true);
    navigate('/');
  };

  return (
    <div className="login-sec">
      <Form className="login-content" onSubmit={loginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>로그인</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="비밀번호를 기억할까요?" />
        </Form.Group>

        <Button variant="dark" type="submit">
          로그인
        </Button>
        <Button variant="light" type="button">
          등록
        </Button>
      </Form>

      <div className="login-img-sec">
        <img
          src="https://image.hm.com/assets/hm/0c/84/0c84cc6ff05955f23e286ee1c4de5281b5a6286b.jpg?imwidth=1260"
          alt="fashion"
          className="login-img"
        />
      </div>
    </div>
  );
}

export default Login;
