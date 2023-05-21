import React from 'react';
import { Disclosure } from '@headlessui/react'
import {
    CalendarIcon,
    ChartPieIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    WrenchScrewdriverIcon,
  } from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Habits', href: '/myhabits', icon: CalendarIcon },
    { name: 'Todos', href: '/todos', icon: DocumentDuplicateIcon},
    { name: 'Statistics', href: '/profile', icon: ChartPieIcon},
    { name: 'Settings', href: '/settings', icon: WrenchScrewdriverIcon},
  ]
  
  function classNames(...classes:any[]) {
    return classes.filter(Boolean).join(' ')
  }

const SideNavigation = () => {
    return (
        <div className="col-span-1 border-r border-gray-200">
          <nav className="flex flex-1 flex-col">
                {navigation.map((item) => (
                  <Disclosure>
                    <a href={item.href}>
                  <Disclosure.Button
                    className={classNames(
                      'flex items-center w-full text-left rounded-md gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0 text-gray-500" aria-hidden="true" />
                    {item.name}
                  </Disclosure.Button>
                  </a>
                  </Disclosure>  
                ))}
          </nav>
        </div>
    );
};

export default SideNavigation;
