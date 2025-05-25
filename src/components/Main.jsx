import { useEffect, useMemo, useState } from "react";
import { useGetCommentsQuery } from "../features/apiSlice";
import Loading from "./Loading";
import { FiDelete } from "react-icons/fi";
const Main = () => {
  const { data={}, isLoading, error } = useGetCommentsQuery();
  const comments = data.feedbacks || [];
  
  const [orderbyOld,setOrderbyOld] = useState(false);

  const sortedComments = useMemo(()=>{
    return orderbyOld 
    ? [...comments].sort((a,b)=> b.daysAgo - a.daysAgo)
    : [...comments].sort((a,b)=> a.daysAgo - b.daysAgo);
  },[comments,orderbyOld])



  // console.log(comments);
  if (isLoading) return <Loading/>
  if (error) {
    return (
      <div className="bg-rose-800 text-white p-4 rounded-md mx-auto max-w-[640px]">
        Error: {error.message}
      </div>
    );
  }

  return (
    <main className="font-Karla h-[50vh] overflow-y-scroll bg-zinc-900 text-white w-[100%] sm:w-[640px] rounded-b  mx-auto pb-12">
      <div className="px-4 sm:px-8 py-6">
        <div className="flex items-baseline gap-x-6">
          <h2 className="text-2xl font-Funnel mb-6 pl-4">Set ORder by :</h2>
          <div className="flex items-center justify-baseline gap-x-2">
            <button onClick={()=>setOrderbyOld(false)} className={`p-1 w-20 rounded ${!orderbyOld ? 'border-b':'text-gray-400'}`}>Newest</button>
            <button onClick={()=>setOrderbyOld(true)} className={`p-1 w-20 rounded ${orderbyOld ? 'border-b':'text-gray-400'}`}>Oldest</button>
          </div>
        </div>
        <div className="space-y-4">
          {sortedComments?.map((comment, index) => (
            <div 
              key={index}
              className="border border-gray-800 rounded-md bg-zinc-800 p-4 shadow"
            >
              <div className="flex items-start">
                <div className="bg-white p-5 text-lg font-FunnelBold text-zinc-900 rounded-full h-8 w-8 flex items-center justify-center mr-3">
                  {comment.badgeLetter}
                </div>
                <div className="flex-grow">
                  <div className="flex items-center justify-between">
                    <h3 className="font-Funnel text-lg">{comment.company}</h3>
                    <span className="font-Inter-Light text-sm text-zinc-400">
                      {comment.daysAgo === 0 ?"NEW":comment.daysAgo+" days Ago"} 
                    </span>
                  </div>
                  <p className="font-Inter text-zinc-200 mt-2 text-sm">
                    {comment.text}
                  </p>
                  <div className="flex justify-between mt-3">
                    <button className="hover:text-red-600">
                      <FiDelete className="size-5"/>
                    </button>
                    <button className="hover:text-green-400 flex items-center text-sm font-Inter transition-all cursor-pointer hover:scale-105">
                      <span className="mr-1">{comment.upvoteCount}</span>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Main;