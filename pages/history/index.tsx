import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaSave, FaTimes, FaEdit } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Router } from 'next/router';

interface HistoryProps {}

interface HistoryItem {
  name: string;
  date: string;
  colonies: number;
  imageUrl: string;
  info: string;
}

const History: React.FC<HistoryProps> = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(0);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);
  const [selectedItemDate, setSelectedItemDate] = useState<string | null>(null);
  const [selectedItemColonies, setSelectedItemColonies] = useState<number | null>(null);
  const [selectedItemImageUrl, setSelectedItemImageUrl] = useState("/huevo_2.png");
  const [selectedItemInfo, setSelectedItemInfo] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [mockData, setMockData] = useState<HistoryItem[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/registers', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setMockData(data.data);
          if (data.data.length > 0) {
            const item = data.data[0];
            setSelectedCard(0);
            setSelectedItemName(item.name);
            setSelectedItemDate(item.date);
            setSelectedItemColonies(item.colonies);
            setSelectedItemImageUrl(item.imageUrl);
            setSelectedItemInfo(item.info);
          }
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderCardContent = (item: HistoryItem, index: number) => {
    const isSelected = index === selectedCard;

    return (
      <button
        key={index}
        className={`rounded-lg overflow-hidden mb-4 p-4 focus:outline-none ${
          isSelected ? 'border-2 border-white bg-[#1e4261]' : 'border-[1px] border-slate-400 hover:border-slate-200 bg-[#16222e] hover:bg-[#192531]'
        }`}
        onClick={() => {
          setSelectedCard(index);
          setSelectedItemName(item.name);
          setSelectedItemDate(item.date);
          setSelectedItemColonies(item.colonies);
          setSelectedItemImageUrl(item.imageUrl);
          setSelectedItemInfo(item.info);
          setIsEditMode(false)
        }}
      >
        <div className="flex justify-between">
          <div className="text-white">
            <p className="text-lg font-semibold">{item.name}</p>
          </div>
          <div className="text-white">
            <p>{item.date}</p>
          </div>
        </div>
      </button>
    );
  };

  const handleSaveChanges = () => {
    if (isEditMode) {
      // hacer put con los cambios
    }

    setIsEditMode(!isEditMode);
  };

  const handleDelete = async () => {

    window.confirm("Are you sure you want to delete this PetriDish? This is PERMANENT");
    if (selectedItemName && session) {
      const response = await fetch("../api/registers", {
        method: "DELETE",
        body: JSON.stringify({ name: selectedItemName }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
      console.log(result);
      window.location.reload()
      }
  };

  return (
    <>
      <div
        style={{ backgroundColor: '#181B36' }}
        className="border-r-2 border-slate-200 flex-shrink-0 h-[calc(105vh-2rem)] w-1/4 pr-8 max-w-[20rem] p-4 pt-0 mt-0 mb-1 shadow-xl shadow-blue-gray-900/5 fixed flex flex-col"
      >
        <div className="mb-2 flex items-center gap-4 p-4 ml-3">
          <Image src="/favicon.ico" width={25} height={25} alt="PL" className="h-8 w-8" />
          <div className="text-slate-200 font-normal text-xl">PetriLab</div>
        </div>

        <Link
          href="/scan"
          className="mt-2 mb-4 flex items-center mx-auto px-[4.5rem] py-2 bg-[#0D0F1E] rounded-lg hover:bg-[#131422]"
        >
          <div className="text-white text-2xl">New Scan</div>
        </Link>

        <div className="mb-2 flex items-center mx-auto p-4">
          <div className="text-slate-200 text-2xl">File History</div>
        </div>

        <hr className="my-2 border-blue-gray-50" />

        <div className="mt-3"></div>
        {mockData.map((item, index) => renderCardContent(item, index))}
      </div>
      <div className="flex-auto bg-[#242533] min-h-screen pb-8">
        <div className="ml-[25em] h-full">
          <div className="pt-5"></div>
          {selectedItemName && (
            <div className="text-white mt-3">
              <div className="border-2 border-slate-500 pt-2 bg-[rgb(30,30,30)] p-4 mt-0 mb-4 rounded-lg shadow-md w-11/12">
                <div className="flex">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2 text-blue-300">{selectedItemName}</h2>
                  </div>
                  
                  <div className="flex-1 text-center">
                    <p className="text-slate-200">
                      <b>Date:</b> {selectedItemDate}
                    </p>
                  </div>
                  
                  <div className="flex-1 text-right">
                    <p className="text-slate-200">
                      <b>Colonies:</b> {selectedItemColonies}
                    </p>
                  </div>
                </div>
                
                <div className="mb-5 border-b-2 border-slate-500 pl-4"></div>
                
                <div className="flex mb-3">
                  <div className="mr-4 text-white">
                    <img src={selectedItemImageUrl} alt="img.jpg" className="w-80 h-60 object-cover rounded-lg mr-5" />
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-slate-200 font-semibold mb-2 mt-0">Information: </p>
                    <div className="bg-[#2B2B34] rounded-md border-solid border-2 border-slate-500 px-4 py-2 h-[75%] overflow-y-auto">
                      <p className="text-slate-200 rounded-md ml-2 mb-1">{selectedItemInfo}</p>
                    </div>
                  </div>
                </div>
                
                {selectedItemName && (
                  <div className="flex items-center justify-between">
                    <button
                      className="flex items-center mr-2 p-2 pb-0"
                      onClick={handleSaveChanges}
                    >
                      {isEditMode ? (
                        <>
                          <FaSave className="text-green-500 cursor-pointer hover:text-green-700 text-lg" />
                          <span className="ml-2 text-lg">Save Progress</span>
                        </>
                      ) : (
                        <>
                          <FaEdit className="text-blue-500 cursor-pointer hover:text-blue-700 text-lg" />
                          <span className="ml-2 text-lg">Edit</span>
                        </>
                      )}
                    </button>
                    
                    <button className="flex items-center p-2" onClick={handleDelete}>
                      <FaTimes className="text-red-500 cursor-pointer hover:text-red-700 text-lg" />
                      <span className="ml-1 cursor-pointer hover:underline text-lg" onClick={handleDelete}>
                        Delete
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
