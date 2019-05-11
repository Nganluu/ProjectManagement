import React, { Component } from 'react'
import { Button, InputGroupAddon, Input, InputGroup } from 'reactstrap'
import contactpic from './contact.png'
export default class contact extends Component {

  render() {
    return (

      <div style={{ textAlign: "center", verticalAlign: "middle" }}>
        <div style={{ width: "150px", height: "150px" }}>
        </div>
        <div>
          <div style={{ fontSize: "25px" }}>YOU DON'T NEED TO <b>WIN THE LOTTERY</b> TO GET A PERSONAL</div>
          <InputGroup style={{ marginLeft: "35%", width: "30%" }}>
            <Input placeholder="Enter your Email" />
            <Button addon style={{backgroundColor: "#0083ff", color: "white", touchAction: "manipulation" }} type="submit">GET EARLY ACCESS</Button>
          </InputGroup>
        </div>
        <img style={{ width: "60%" }} src={contactpic} />
        <div style={{ textAlign: "center", backgroundColor: "#989999", color: "white", fontSize: "25px" }}>
          <b>CONTACT TO PROJECT TEAM</b><br />
          {/* Ngan */}
          <div style={{ fontSize: "150px"}} className="row">
            <div className="col-md-3">
              <i className="fas fa-user-circle"></i>
              <div style={{ fontSize: "25px" }}>Lưu Thị Thanh Ngân</div>
              <div style={{ fontSize: "18px" }}><i>nganltt712@gmail.com</i></div>
            </div>
            <div className="col-md-3">
              <i className="fas fa-user-circle" ></i>
              <div style={{ fontSize: "25px" }}>Nguyễn Thị Mừng</div>
              <div style={{ fontSize: "18px" }}><i>nguyenthimung@gmail.com</i></div>
            </div>
            <div className="col-md-3">
              <i className="fas fa-user-circle" ></i>
              <div style={{ fontSize: "25px" }}>Vũ Thị Xinh</div>
              <div style={{ fontSize: "18px" }}><i>Vuxinh@gmail.com</i></div>
            </div>
            <div className="col-md-3">
              <i className="fas fa-user-circle" ></i>
              <div style={{ fontSize: "25px" }}>Nguyễn Anh Phương</div>
              <div style={{ fontSize: "18px" }}><i>anhphuong@gmail.com</i></div>
            </div>
          </div>
        </div>
        <div style={{fontSize: "25px"}}>
          <b >AVAILABLE ON</b><br/>
          <div style={{marginTop: "20px",  color: "#989999", fontSize: "70px"}}>
          <i style={{padding: "0px 30px"}} className="fab fa-windows"></i>
          <i  style={{padding: "0px 30px"}} className="fab fa-chrome"></i>
          <i style={{padding: "0px 30px"}} className="fab fa-firefox"></i>
          <i style={{padding: "0px 30px"}} className="fas fa-desktop"></i>
          <i style={{padding: "0px 30px"}} className="fas fa-mobile"></i>
          </div>
        </div>
      </div>

    )
  }
}
