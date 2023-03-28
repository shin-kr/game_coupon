
import React, { useState, useEffect } from "react";

function List() {
  const [Fill, setFill] = useState(false);
  const [Coupon_List, setCoupon_List] = useState([]);
  const [Name, setName] = useState("");
  const [Phone_Number, setPhone_Number] = useState("");
  const [Coupon_Number, setCoupon_Number] = useState("");
  const [Timestamp, setTimestamp] = useState(0);

  useEffect(() => {
    fetch("http://127.0.0.1:3001/list", { method: "post", headers: { "content-type": "application/json", }, })
      .then((res) => res.json())
      .then((json) => { setCoupon_List(json) });
  }, []);

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
    fetch("http://127.0.0.1:3001/search", {
      method: "post", //통신방법
      headers: { "content-type": "application/json", },
      body: JSON.stringify({
        'name': Name,
        'phone_number': Phone_Number,
      }),
    }).then((res) => res.json()).then((json) => {
      if (json[0] === "ok") {
        console.log(json);
        setCoupon_Number(json[1].coupon_number); 
        setTimestamp(json[1].timestamp); 
        setFill(true);
      } else if (json[0] === "no") {
        alert("찾을 수 없습니다.\n올바르게 입력했는지 확인하고 다시 시도하십시오");
      }
    }).catch(() => { alert("서버가 불안전 합니다."); });
  }

  const fill_button_onclick = () => {
    setFill(false);
  }
  
  function year_month_day(source) {
    const year = source.getFullYear();
    const month = source.getMonth() + 1;
    const day = source.getDate();
    return [year, month, day].join('-');
  }

  return (
    <div className="box">
      <h2>발급 이력</h2>
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
      <button onClick={button_onclick}>검색</button>
      <div className={`fill`} style={{ display: Fill ? "block" : "none" }} >
        <div className="box">
          <h2>검색 결과</h2>
          <hr />
          <div >{Name}</div>
          <div >{Phone_Number}</div>
          <div className="coupon_number">{Coupon_Number}</div>
          <div >{year_month_day(new Date(Timestamp))}</div>
          <button onClick={fill_button_onclick}>닫기</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>휴대전화 번호</th>
            <th>쿠폰 번호</th>
            <th>발급 일자</th>
          </tr>
        </thead>
        <tbody>
          {Coupon_List.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.phone_number}</td>
                <td>{item.coupon_number}</td>
                <td>{year_month_day(new Date(item.timestamp))}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}


export default List;
