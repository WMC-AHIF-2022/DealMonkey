import React, { useState } from 'react';

import './userProfile.css';

export interface User {
  id: number,
  username: string,
  password: string,
  email: string,
  birthdate: string,
  points: number,
  level: number,
  registrationDate: string
}

const UserProfile = () => {

  // const [user, setMyObject] = useState<User | null>(null);

  // const p = sessionStorage.getItem('userProfile') as string;

  // const parsedObject = JSON.parse(p);
  // setMyObject(parsedObject);

  // const pointsBar = document.querySelector('.bar') as HTMLElement;

  // pointsBar.style.width = '20%';



  return (

    <div className="profileArea1">
      <div className="profileTable1">
        <div className="row">
          <div className="profile-nav col-md-3">
            <div className="panel">
              <div className="user-heading round">
                <a href="#">
                  <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="Profile-Picture" />
                </a>
                <h1>Amina Gabeljic</h1>
                <p>amina27gabeljic@gmail.com</p>

                <ul className="profileTable">
                  <li><a href="#" className='profileButton'>Stats</a></li>
                  <li><a href="#" className='profileButton'>Settings</a></li>
                </ul>

                <div className="points-bar">
                  <div className="bar"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="rowCurrentActivity">
            <div className="activityTitle">
              Running<img src="https://bootdey.com/img/Content/avatar/avatar3.png" width="20" height="20" className="activityImage" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserProfile;
