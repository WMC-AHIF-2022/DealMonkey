import Layout from "../../layout/loggedIn/layout";
import React, { useState } from "react";
import './settings.css';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import SettingsCard from "../../components/settingsCard";
import IconType from "../../components/settingsCard";
import { UserIcon, SunIcon, UserGroupIcon, LanguageIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Settings = () => {
  //BUTTONS
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

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
      <div className="settingsArea1">
        <div className="settingsTable1">
          <div className="row">
            <div className="profile-nav col-md-3">
              <div className="panel">
                <div className="user-heading round">
                  <a href="#">
                    <img src="https://i.pinimg.com/750x/bf/e9/3a/bfe93a722d06d7f29990f266109f67ea.jpg" alt="Profile-Picture" />
                  </a>
                  <h1>Grüne Viech</h1>
                  <p>grueneviech@gmail.com</p>
                  <div className="profileButtons">
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleChange}
                      aria-label="Platform"
                    >
                      <ToggleButton value="web">Stats</ToggleButton>
                      <ToggleButton value="android">Settings</ToggleButton>
                    </ToggleButtonGroup>
                  </div>
                  <div className="settingCards">
                    <SettingsCard text="Account" icon={<UserIcon className="h-6 w-6 text-black mt-1"/>} link="/account" />
                    <SettingsCard text="Theme" icon={<SunIcon className="h-6 w-6 text-black mt-1"/>} /*onCLick={toggleTheme}*/ />
                    <SettingsCard text="Membership" icon={<UserGroupIcon className="h-6 w-6 text-black mt-1"/>} link="/membership" />
                    <SettingsCard text="Language" icon={<LanguageIcon className="h-6 w-6 text-black mt-1"/>} link="language" />
                    <SettingsCard text="Help" icon={<QuestionMarkCircleIcon className="h-6 w-6 text-black mt-1"/>} link="help" />
                    <SettingsCard text="Version" icon={"1.0.0"} />
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