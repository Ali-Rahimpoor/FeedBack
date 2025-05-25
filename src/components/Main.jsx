import { useGetCommentsQuery } from "../features/apiSlice";
import Loading from "./Loading";

const Main = () => {
  const { data={}, isLoading, error } = useGetCommentsQuery();
  const comments = data.feedbacks || [];
  const sortedComments = [...comments].sort((a,b)=> a.daysAgo - b.daysAgo);
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
    <main className="font-Karla h-[50vh] overflow-y-scroll bg-zinc-900 text-white w-[100%] sm:w-[640px]  mx-auto pb-12">
      <div className="px-4 sm:px-8 py-6">
        {/* <h2 className="text-2xl font-Funnel mb-6">Public Feedback <span className="font-Montserrat-Light text-base">From Users</span></h2> */}
        
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
                  <div className="flex justify-end mt-3">
                    <button className="flex items-center text-sm font-Inter transition-all cursor-pointer hover:scale-105">
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