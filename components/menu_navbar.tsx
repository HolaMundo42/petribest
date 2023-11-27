    import React, { useEffect, useState } from "react";
    import Link from "next/link";
    import {
    ChevronDownIcon,
    ChevronRightIcon,
    UserCircleIcon,
    InboxIcon,
    PresentationChartBarIcon,
    ShoppingBagIcon,
    Cog6ToothIcon,
    PowerIcon,
    } from "@heroicons/react/24/solid";
    import { Chip } from "@material-tailwind/react";
    import { useSession, signOut } from "next-auth/react";
    import Image from "next/image"


    interface CardProps {
        name: string;
        date: string;
        colonies: number;
        imgSrc: string;
        info: string;
    }

    const Card: React.FC<CardProps> = ({ name, date, colonies, imgSrc, info }) => (
        <div className="border-2 border-slate-500 pt-2 bg-[rgb(30,30,30)] p-4 mt-0 mb-4 rounded-lg shadow-md transition-transform transform hover:scale-105 w-7/12">
        <div className="flex">
            <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 text-blue-300">{name}</h2>
            </div>

            <div className="flex-1 text-center">
                <p className="text-slate-200"><b>Date:</b> {date}</p>
            </div>

            <div className="flex-1 text-right">
                <p className="text-slate-200"><b>Colonies:</b> {colonies}</p>
            </div>
        </div>
        
        <div className="mb-5 border-b-2 border-slate-500 pl-4"></div>

        <div className="flex mb-3">
            <div className="mr-4">
                <img src={imgSrc} alt="img.jpg" className="w-60 h-40 object-cover rounded-lg" />
            </div>

            <div className="flex-1">
                <p className="text-slate-200 font-semibold mb-2 mt-0">Information: </p>
                <div className="bg-[#2B2B34] rounded-md border-solid border-2 border-slate-500 px-4 py-2 h-[75%] overflow-y-auto">
                    <p className="text-slate-200 rounded-md ml-2 mb-1">{info}</p>
                </div>
            </div>

        </div>
        </div>
    );

    const SideCards = () => {
        return (
        <div className="ml-[25em] h-full bg-red">
                    
            <div className="pt-5"></div>
                <Card
                    name="La Petriana"
                    date="2023-11-26"
                    colonies={42}
                    imgSrc="/bacteria_wp.jpg"
                    info="The pettriest!"
                />           
                <Card
                    name="Huebix"
                    date="2003-01-20"
                    colonies={24}
                    imgSrc="/huevos.jpg"
                    info="El pollo es una criatura noble que  pone huevos todos los dias. Me gusta el huevo. Me gustan los huevos, y me gustarán por siempre."
                /> 
                <Card
                    name="Pollito"
                    date="2015-07-14"
                    colonies={0}
                    imgSrc="/huevo_roto.png"
                    info="Las propiedades nutritivas del pollos son muchas ¡Por eso me encanta! :D"
                />   
            </div>
        );
    };

    interface MenuProps {}

    const Menu: React.FC<MenuProps> = () => {
    const { data: initialSession } = useSession();
    const [session, setSession] = useState(initialSession);
    const [open, setOpen] = useState(0);

    useEffect(() => {
        setSession(initialSession);
    }, [initialSession]);

    const handleOpen = (value: number) => {
        setOpen((prevOpen) => (prevOpen === value ? 0 : value));
    };

    return (
        <>
        <div style={{ backgroundColor: '#181B36' }} className="border-r-2 border-slate-200 flex-shrink-0 h-[calc(105vh-2rem)] w-1/4 pr-8 max-w-[20rem] p-4 pt-0 mt-0 mb-1 shadow-xl shadow-blue-gray-900/5 fixed flex flex-col">
            <div className="mb-2 flex items-center gap-4 p-4 ml-3">
            <Image
                src="/favicon.ico"
                width={25}
                height={25}
                alt="PL"
                className="h-8 w-8"
            />
            <div className="text-slate-200 font-normal text-xl">PetriLab</div>
            </div>
            <div className="overflow-y-auto ml-3">
            <div className="flex items-center mb-3">
                <div className="h-5 w-5">
                {session?.user?.image ? (
                    <img
                    src={session.user.image}
                    alt="user-image"
                    className="h-5 w-5 rounded-full"
                    />
                ) : (
                    <UserCircleIcon color={"white"} />
                )}
                </div>
                <div className="text-slate-200 ml-[1em] mr-auto font-normal text-lg">
                {session?.user?.name || "Profile"}
                </div>
            </div>
            <div className="flex items-center mb-3">
                <div className="h-5 w-5">
                <InboxIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] mr-auto font-normal text-lg">
                Inbox
                </div>
                <div className="ml-5 rounded-full">
                <Chip value="69" size="sm" variant="ghost" className="text-slate-200" />
                </div>
            </div>
    
            <hr className="my-2 border-blue-gray-50 mb-3" />
    
            <div
                className="flex items-center justify-between"
                onClick={() => handleOpen(1)}
            >
                <div className="mb-1 flex items-center">
                <div className="h-5 w-5">
                    <PresentationChartBarIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] font-normal text-base">
                    Dashboard
                </div>
                </div>
                <div
                className={`h-4 w-4 ml-auto transform transition-transform ${
                    open === 1 ? "rotate-180" : ""
                }`}
                >
                <ChevronDownIcon color={"white"} strokeWidth={2.5} />
                </div>
            </div>
            {open === 1 && (
                <div className="pl-5 py-1">
                <Link href="/scan" className="flex items-center mb-3 text-slate-200">
                    <div className="h-3 w-5">
                    <ChevronRightIcon color={"white"} strokeWidth={3} />
                    </div>
                    Scan Image
                </Link>
    
                <Link href="/history" className="flex items-ce  nter mb-3 text-slate-200">
                    <div className="h-3 w-5">
                    <ChevronRightIcon color={"white"} strokeWidth={3} />
                    </div>
                    My History
                </Link>
    
                <div className="flex items-center mb-3 text-slate-200">
                    <div className="h-3 w-5 mb-2">
                    <ChevronRightIcon color={"white"} strokeWidth={3} />
                    </div>
                    Projects
                </div>
                </div>
            )}
    
            <div
                className="mt-3 mb-2 flex items-center justify-between"
                onClick={() => handleOpen(2)}
            >
                <div className="flex items-center">
                <div className="h-5 w-5">
                    <ShoppingBagIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] font-normal text-base">
                    E-Commerce
                </div>
                </div>
                <div
                className={`h-4 w-4 ml-auto transform transition-transform ${
                    open === 2 ? "rotate-180" : ""
                }`}
                >
                <ChevronDownIcon color={"white"} strokeWidth={2.5} />
                </div>
            </div>
            {open === 2 && (
                <div className="pl-5 py-1 mb-2">
                <div className="flex items-center mb-2 text-slate-200">
                    <div className="h-3 w-5">
                    <ChevronRightIcon color={"white"} strokeWidth={3} />
                    </div>
                    Orders
                </div>
                <div className="flex items-center mb-2 text-slate-200">
                    <div className="h-3 w-5">
                    <ChevronRightIcon color={"white"} strokeWidth={3} />
                    </div>
                    Products
                </div>
                </div>
            )}
    
            <hr className="my-2 border-blue-gray-50" />
            </div>
            <div className="mt-auto mb-3 ml-3">
            <div className="flex items-center mb-5">
                <div className="h-5 w-5">
                <Cog6ToothIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] mr-auto font-normal text-lg">
                Settings
                </div>
            </div>
            <Link href="/login">
                <div className="flex items-center">
                <div className="h-5 w-5">
                    <PowerIcon color={"white"} />
                </div>
                <button
                    onClick={() => signOut()}
                    className="text-slate-200 ml-[1em] mr-auto font-normal text-lg"
                >
                    Log Out
                </button>
                </div>
            </Link>
            </div>
        </div>
    
        <div className="flex-auto bg-[#242533] min-h-screen pb-8">
            <SideCards />
        </div>
        </>
    );
};      

    export default Menu;
