import Layout from "../../layout/loggedIn/layout";
import React, { useState } from "react";
import "./settings.css";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import SettingsCard from "../../components/settingsCard";
import IconType from "../../components/settingsCard";
import {
  UserIcon,
  SunIcon,
  UserGroupIcon,
  LanguageIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/dist/hooks/useAuthUser";
import SideNavigation from "../../components/sideNavigation";

const Settings = (socket: any) => {
  //BUTTONS
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    console.log(newAlignment);
    if (newAlignment === "profile") routeChange("/profile");
    else if (newAlignment === "settings") routeChange("/settings");
  };

  let navigate = useNavigate();
  const routeChange = (path: string) => {
    navigate(path);
  };

  const auth = useAuthUser();

  //COLOR THEME
  /*
  const [colorTheme, setColorTheme] = useState('light');
  const toggleTheme = () => {
    if(colorTheme === 'light') {
      setColorTheme('dark');
    } else {
      setColorTheme('light');
    }
  };
  */

  return (
    <Layout>
      <div className="grid grid-cols-6 h-max">
        <SideNavigation />

        <div className="col-span-5 px-12 mt-4">
          <div className="settingsArea1">
            <div className="settingsTable1">
              <div className="row">
                <div className="profile-nav col-md-3">
                  <div className="panel">
                    <div className="user-heading round">
                      <a href="#">
                        <img
                          src="https://i.pinimg.com/564x/2e/60/80/2e60808c2b288e393128ebed7ee988b6.jpg"
                          alt="Profile-Picture"
                        />
                      </a>
                      <div className="username">
                        <h1>{auth()?.username}</h1>
                      </div>
                      <div className="profileButtons">
                        <ToggleButtonGroup
                          value={alignment}
                          exclusive
                          onChange={handleChange}
                          aria-label="Platform"
                        >
                          <ToggleButton value="profile">Stats</ToggleButton>
                          <ToggleButton value="settings">Settings</ToggleButton>
                        </ToggleButtonGroup>
                      </div>
                      <div className="settingCards">
                        <SettingsCard
                          text="Account"
                          icon={
                            <UserIcon className="h-6 w-6 text-black mt-1" />
                          }
                          link="/account"
                        />
                        <SettingsCard
                          text="Theme"
                          icon={
                            <SunIcon className="h-6 w-6 text-black mt-1" />
                          } /*onCLick={toggleTheme}*/
                        />
                        <SettingsCard
                          text="Membership"
                          icon={
                            <UserGroupIcon className="h-6 w-6 text-black mt-1" />
                          }
                          link="/membership"
                        />
                        <SettingsCard
                          text="Language"
                          icon={
                            <LanguageIcon className="h-6 w-6 text-black mt-1" />
                          }
                          link="language"
                        />
                        <SettingsCard
                          text="Help"
                          icon={
                            <QuestionMarkCircleIcon className="h-6 w-6 text-black mt-1" />
                          }
                          link="help"
                        />
                        <SettingsCard text="Version" icon={"1.0.0"} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
