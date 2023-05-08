import React from 'react';

import '../styles/card.css';
import { UserIcon, SunIcon, UserGroupIcon, LanguageIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

export enum IconType {
    User = "UserIcon",
    Sun = "SunIcon",
    UserGroup = "UserGroupIcon",
    Language = "LanguageIcon",
    QuestionMarkCircle = "QuestionMarkCircleIcon"
}

interface CardProps {
    text: string;
    icon: IconType;
}

const iconComponents: { [key in IconType]: React.ElementType} = {
    UserIcon: UserIcon,
    SunIcon: SunIcon,
    UserGroupIcon: UserGroupIcon,
    LanguageIcon: LanguageIcon,
    QuestionMarkCircleIcon: QuestionMarkCircleIcon
};

const Card = ({ text, icon, link }: any) => {
    return (
        <a href={link}>
        <div className="activityTitle mb-6">
            <div className="cardTop">
                <h1 className="text-lg ml-4 mb-3">{text}</h1>{icon}
            </div>
        </div>
        </a>
    );
};

export default Card;
