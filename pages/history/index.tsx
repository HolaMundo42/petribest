import Image from 'next/image';
import { SideCards } from '../../components/menu_navbar';
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

const History = () => {
    return(
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
    <div className="text-slate-200 font-bold text-2xl ml-3 mb-3">File History</div>
    <div className="overflow-y-auto ml-3">
        <div className="mb-3 p-4 rounded-lg cursor-pointer hover:bg-slate-800">
            <div className="flex items-center">
                <div className="h-5 w-5">
                    <PresentationChartBarIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] font-normal text-base">
                    Dashboard
                </div>
            </div>
        </div>

        <div className="mb-3 p-4 rounded-lg cursor-pointer hover:bg-slate-800">
            <div className="flex items-center">
                <div className="h-5 w-5">
                    <ShoppingBagIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] font-normal text-base">
                    E-Commerce
                </div>
            </div>
        </div>

        <hr className="my-2 border-blue-gray-50" />

        <div className="mb-3 p-4 rounded-lg cursor-pointer hover:bg-slate-800">
            <div className="flex items-center">
                <div className="h-5 w-5">
                    <Cog6ToothIcon color={"white"} />
                </div>
                <div className="text-slate-200 ml-[1em] font-normal text-base">
                    Settings
                </div>
            </div>
        </div>

        <Link href="/login">
            <div className="mb-3 p-4 rounded-lg cursor-pointer hover:bg-slate-800">
                <div className="flex items-center">
                    <div className="h-5 w-5">
                        <PowerIcon color={"white"} />
                    </div>
                    <button
                        onClick={() => signOut()}
                        className="text-slate-200 ml-[1em] font-normal text-base"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </Link>
    </div>
</div>

        <SideCards></SideCards>

    </>)
}


export default History;