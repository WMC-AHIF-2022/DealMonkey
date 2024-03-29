import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  PlusCircleIcon,
  HomeIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <Disclosure as="footer" className="bg-white shadow sticky-footer">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16">
          <div className="flex flex-1 items-center justify-around">
            <div className="flex flex-shrink-0 items-center">
              <a href="/dashboard">
                <HomeIcon className="mr-16 text-gray-800 border-t-2 border-orange-400 group-hover:text-black h-6 w-6 shrink-0" />
              </a>
              <a href="/myHabits">
                <PlusCircleIcon className="mr-16 text-gray-800 group-hover:text-black h-6 w-6 shrink-0" />
              </a>
              <a href="/settings">
                <WrenchScrewdriverIcon className=" text-gray-800 group-hover:text-black h-6 w-6 shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
