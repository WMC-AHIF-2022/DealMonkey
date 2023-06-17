import { useState, useEffect } from "react";
import Layout from "../../layout/loggedIn/layout";
import { fetchRestEndpoint } from "../../utils/client-server";

const Shop = () => {
    interface Avatar {
        avatarId:number,
        link:string,
        name:string,
        price:number,
        unlockLevel:number
    } 

    const [avatars, setAvatars] = useState<Avatar[]>([]);

    const getAllAvatars = async () => {
        try {
            const response = await fetchRestEndpoint("http://localhost:8000/api/avatars", "GET");
            const data: Avatar[] = await response.json();
            console.log(data);
            setAvatars(avatars);
        } catch(ex) {
            throw new Error("could not get avatars");
        }
    };

    useEffect(() => {
        getAllAvatars();
      });
    
    return (
        <Layout>
            <div className="bg-white">
                <div className="mx-auto max-w-7xl overflow-hidden px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
                        
                    {avatars.map((avatar:Avatar) => (
                        <a key={avatar.avatarId} href={avatar.link} className="group text-sm">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <img
                            src={avatar.link}
                            alt={avatar.name}
                            className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <h3 className="mt-4 font-medium text-gray-900">{avatar.name}</h3>
                        <p className="mt-2 font-medium text-gray-900">{avatar.price}</p>
                        </a>
                    ))}
                    </div>
                </div>
            </div>
        </Layout>
  );
};

export default Shop;