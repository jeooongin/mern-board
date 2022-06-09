import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UploadButtonDiv, UploadDiv, UploadForm } from "../../style/UploadCSS";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  let params = useParams();
  const navigate = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const [flag, setFlag] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    if (title === "" || content === "") {
      return alert("모든 항목을 채워주세요");
    }

    let body = {
      title: title,
      content: content,
      postNum: params.postNum,
    };

    axios
      .post("/api/post/edit", body)
      .then((res) => {
        if (res.data.success) {
          alert("글 수정이 완료되었습니다.");
          navigate(`/detail/${params.postNum}`);
        } else {
          alert("글 수정에 실패하였습니다.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cancleHandler = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  useEffect(() => {
    let body = {
      postNum: params.postNum,
    };
    axios
      .post("/api/post/detail", body)
      .then((res) => {
        if (res.data.success) {
          setPostInfo(res.data.post);
          setFlag(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setTitle(postInfo.title);
    setContent(postInfo.content);
  }, [postInfo]);

  return (
    <UploadDiv>
      {flag && (
        <UploadForm>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <label htmlFor="content">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.currentTarget.value)}
          />
          <UploadButtonDiv>
            <button className="cancel" onClick={cancleHandler}>
              취소
            </button>
            <button className="submit" onClick={submitHandler}>
              제출
            </button>
          </UploadButtonDiv>
        </UploadForm>
      )}
    </UploadDiv>
  );
};

export default Edit;
