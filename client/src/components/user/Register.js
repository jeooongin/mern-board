import React, { useState } from "react";
import { LoginDiv } from "../../style/UserCSS";
import firebase from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [flag, setFlag] = useState(false);
  let navigate = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    setFlag(true);

    if (!name && email && pw && pwConfirm) {
      return alert("모든 값을 채워주세요");
    }

    if (pw !== pwConfirm) {
      return alert("비밀번호와 비밀번호 재확인이 같지 않습니다.");
    }

    let createdUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, pw);

    await createdUser.user.updateProfile({
      displayName: name,
    });

    console.log(createdUser.user);

    let body = {
      email: createdUser.user.multiFactor.user.email,
      displayName: createdUser.user.multiFactor.user.displayName,
      uid: createdUser.user.multiFactor.user.uid,
    };

    axios.post("/api/user/register", body).then((res) => {
      setFlag(false);
      if (res.data.success) {
        // 회원가입 성공시
        navigate("/login");
      } else {
        // 회원가입 실패시
        alert("회원가입이 실패하였습니다.");
      }
    });
  };

  return (
    <LoginDiv>
      <form>
        <label htmlFor="">이름</label>
        <input
          type="name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <label htmlFor="">이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <label htmlFor="">비밀번호</label>
        <input
          type="password"
          value={pw}
          minLength={6}
          onChange={(e) => setPw(e.currentTarget.value)}
        />
        <label htmlFor="">비밀번호 재확인</label>
        <input
          type="password"
          value={pwConfirm}
          minLength={6}
          onChange={(e) => setPwConfirm(e.currentTarget.value)}
        />
        <button disabled={flag} onClick={registerHandler}>
          회원가입
        </button>
      </form>
    </LoginDiv>
  );
};

export default Register;
