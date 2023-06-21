import { useState, useEffect } from "react";
import Layout from "../../layout/loggedIn/layout";
import { fetchRestEndpoint } from "../../utils/client-server";
import SideNavigation from "../../components/sideNavigation";

const Shop = () => {
  interface Avatar {
    avatarId: number;
    link: string;
    name: string;
    price: number;
    unlockLevel: number;
  }

  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [open, setOpen] = useState(false);

  const getAllAvatars = async () => {
    try {
      const response = await fetchRestEndpoint(
        "http://localhost:8000/api/avatars",
        "GET"
      );
      const data: Avatar[] = await response.json();
      console.log(data);
      setAvatars(data);
    } catch (ex) {
      throw new Error("could not get avatars");
    }
  };

  useEffect(() => {
    getAllAvatars();
  }, []);

  /*function setOpen(isButtonFree: boolean) {
    throw new Error("Function not implemented.");
  }*/

  return (
    <Layout>
      <div className="grid grid-cols-6 h-max">
      <SideNavigation />
      
      <div className="col-span-5 px-12 mt-4">
        <div className="grid grid-cols-5 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
          {avatars.map((avatar: Avatar) => (
            <a
              key={avatar.avatarId}
              href={avatar.link}
              className="group text-sm"
            >
              <div className="overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                <img
                  src={require("../../img" + avatar.link)}
                  alt={avatar.name}
                  className="h-60 w-full object-cover object-center"
                />
              </div>
              <h3 className="mt-4 font-medium text-gray-900">{avatar.name}</h3>
              
              <div className="flex">
                <span className="mt-2 font-medium text-gray-900">{avatar.price} </span>
                <img src={require("../../img/star.png")} alt="Points" className="h-4 mt-3 pl-1"/>
              </div>
                
              <button
                onClick={() => {
                  //checken ob level so groß ist, dass man profil bild kaufen kann
                  setOpen(true);
                }}
              >
                Buy
              </button>
            </a>
          ))}
        </div>
      </div>
      </div>
    </Layout>
  );
};

export default Shop;
