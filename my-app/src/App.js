import React, { useState } from 'react';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [userId, setUserId] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const url = showSignUp
      ? 'http://localhost:9000/api/user/signup'
      : 'http://localhost:9000/api/user/login';
    const userData = {
      userId: userId,
      userNickname: nickname,
      userName: name,
      userPassword: password,
      userBirthday: birthday,
      userEmail: email,
      };
      
    const body = showSignUp
      ? JSON.stringify({ userId, nickname, name, password, birthday, email })
      : JSON.stringify({ email, password });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '서버 오류가 발생했습니다.');
      }

      console.log(showSignUp ? '회원가입 성공' : '로그인 성공', data);
      setIsLoggedIn(true);
      // 여기에서 토큰을 저장하거나 다른 필요한 작업을 수행할 수 있습니다.
    } catch (error) {
      console.error('에러:', error);
      setError(error.message || '처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId('');
    setNickname('');
    setName('');
    setPassword('');
    setBirthday('');
    setEmail('');
    // 여기에서 토큰을 제거하거나 다른 필요한 로그아웃 작업을 수행할 수 있습니다.
  };

  if (isLoggedIn) {
    return (
      <div className="container">
        <h1>환영합니다!</h1>
        <p>성공적으로 로그인되었습니다.</p>
        <button className="btn" onClick={handleLogout}>로그아웃</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{showSignUp ? '회원가입' : '로그인'}</h1>
      <form onSubmit={handleSubmit}>
        {showSignUp ? (
          <>
            <div className="input-group">
              <label htmlFor="userId">아이디</label>
              <input
                id="userId"
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="nickname">닉네임</label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="name">이름</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="birthday">생년월일 (YYYYMMDD)</label>
              <input
                id="birthday"
                type="text"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                pattern="\d{8}"
                maxLength="8"
                required
              />
            </div>
          </>
        ) : null}
        <div className="input-group">
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : (showSignUp ? '가입하기' : '로그인')}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p className="switch-text">
        {showSignUp ? '이미 계정이 있으신가요? ' : '계정이 없으신가요? '}
        <button className="link-btn" onClick={() => setShowSignUp(!showSignUp)}>
          {showSignUp ? '로그인' : '회원가입'}
        </button>
      </p>
    </div>
  );
}

export default App;