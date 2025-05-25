import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
   reducerPath:"api",
   baseQuery:fetchBaseQuery({
   baseUrl:"https://bytegrad.com/course-assets/js/1/api",   
   // for sure to have JSON api response
   prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
   }),
   tagTypes: ["Feedback"],
   endpoints:builder=>({
      getComments:builder.query({
         query:()=>"/feedbacks",
         providesTags: (result)=>
            Array.isArray(result)
         ?[...result.map(({id})=>({type:"Feedback",id})),
            {type:"Feedback",id:"LIST"}
         ]
         :[{type:"Feedback",id:"LIST"}]
      }),
      addComment:builder.mutation({
         query:({text,badgeLetter,company})=>({
            url:"/feedbacks",
            method:"POST",
            body:{
               text,badgeLetter,company,
               upvoteCount:0,
               daysAgo:0,
            }
         }),
         invalidatesTags:[{type:"Feedback",id:"LIST"}],
      }),
      // deleteComment:builder.mutation({
      //    query:(id)=>({
      //       url:`/feedbacks/${id}`,
      //       method:"DELETE",
      //    }),
      //    invalidatesTags:(result,error,arg)=>[{type:"Feedback",id:arg}]
      // }),
      // upvoteComment: builder.mutation({
      //    query:({id,currentUpvote})=>({
      //       url:`/feedbacks/${id}`,
      //       method:"PUT",
      //       body:{
      //          upvoteCount: currentUpvote+1
      //       }
      //    }),
      //    invalidatesTags:(result,error,arg)=>[{type:'Feedback',id:arg.id}]
      // })
   })
})

export const {
   useGetCommentsQuery,
   useAddCommentMutation,
   // useDeleteCommentMutation,
   // useUpvoteCommentMutation,
} = apiSlice;