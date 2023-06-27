import React from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Descriptions } from "antd";

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      {/*
      <h2>User Profile</h2>
      <Table responsive hover bordered striped>
        <thead>
          <tr style={{ textAlign: 'center' }}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Type</th>
            <th>Email</th>
            <th>Employee Id</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: 'center' }}>
            <td>{userInfo.firstName}</td>
            <td>{userInfo.lastName}</td>
            <td style={{ color: '#3F00FF' }}>{userInfo.userType}</td>
            <td>{userInfo.email}</td>
            <td>{userInfo.userId}</td>
          </tr>
        </tbody>
      </Table>
      
  */}
      <h3 style={{marginTop: '20px'}}>User Info</h3>
      <Descriptions layout="vertical" >
        <Descriptions.Item label="First Name" contentStyle={{fontSize: '21px'}} labelStyle={{fontSize: '18px'}}>
          {userInfo.firstName}
        </Descriptions.Item>
        <Descriptions.Item label="Last Name" contentStyle={{fontSize: '21px'}} labelStyle={{fontSize: '18px'}}>
          {userInfo.lastName}
        </Descriptions.Item>
        <Descriptions.Item label="User Id" contentStyle={{fontSize: '21px'}} labelStyle={{fontSize: '18px'}}>{userInfo.userId}</Descriptions.Item>
        <Descriptions.Item label="Email" contentStyle={{fontSize: '21px'}} labelStyle={{fontSize: '18px'}}>{userInfo.email}</Descriptions.Item>
        <Descriptions.Item label="User Type" contentStyle={{fontSize: '21px'}} labelStyle={{fontSize: '18px'}}>
          {userInfo.userType}
        </Descriptions.Item>
      </Descriptions>

      <div style={{marginTop: '40px'}}>
        <Link to={`/userProfile/${userInfo._id}/edit`}>
          <Button variant="primary">
            Edit Profile
          </Button>
        </Link>
        <Link to={"/user/editPassword"}>
          <Button variant="primary" className="my-2 mx-2">
            Edit Password
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProfileScreen;
