
import React, { useState } from "react";

function Home() {
  const [Name, setName] = useState("");
  const [Phone_Number, setPhone_Number] = useState("");
  const [Fill, setFill] = useState(false);
  const [Coupon_Number, setCoupon_Number] = useState("");

  const Phone_Number_Change = (e) => {
    if (e.target.value.length < 12) {
      setPhone_Number(e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1$2$3`));
    }
  }

  const button_onclick = () => {
    if (Name.length === 0 || Phone_Number.length !== 11) {
      if(Name.length === 0){
        alert("이름을 정확히 입력해주세요.");
      }else if(Phone_Number.length === 0){
        alert("휴대폰 번호를 정확히 입력해주세요.");
      }else if(Phone_Number.length !== 11){
        alert("휴대폰 번호를 정확히 입력해주세요.");
      }
      return;
    }
    fetch("http://127.0.0.1:3001/add", {
      method: "post", //통신방법
      headers: { "content-type": "application/json", },
      body: JSON.stringify({
        'name': Name,
        'phone_number': Phone_Number,
      }),
    }).then((res) => res.json()).then((json) => {
      if (json[0] === "ok") {
        setCoupon_Number(json[1]);
        setFill(true);
      } else if (json[0] === "no") {
        alert("이미 발급받은 휴대전화 번호 입니다.");
      }
    }).catch(() => { alert("서버가 불안전 합니다."); });
  }

  const fill_button_onclick = () => {
    setFill(false);
  }

  return (
    <div className="box">
      <h2>쿠폰 발급</h2>
      <hr />
      <div className="registration_box">
        <div className="name_box">
          <h3>이름</h3>
          <input type="text" placeholder="홍길동" onChange={(e) => setName(e.target.value)} value={Name} />
        </div>
        <div className="number_box">
          <h3>휴대전화 번호</h3>
          <input type="text" placeholder="01011112222" onChange={(e) => Phone_Number_Change(e)} value={Phone_Number} />
        </div>
      </div>
      <button onClick={button_onclick}>발급</button>
      <div className={`fill`} style={{ display: Fill ? "block" : "none" }} >
        <div className="box">
          <h2>쿠폰 발급</h2>
          <hr />
          <div className="coupon_number">{Coupon_Number}</div>
          <button onClick={fill_button_onclick}>닫기</button>
        </div>
      </div>
    </div>
  );
}


export default Home;
