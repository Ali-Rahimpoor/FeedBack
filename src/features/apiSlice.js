import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
   reducerPath:"api",
   baseQuery:fetchBaseQuery({
      baseUrl:"https://bytegrad.com/course-assets/js/1/api"
   }),
     prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
   endpoints:builder=>({
      getComments:builder.query({
         query:()=>"/feedbacks"
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
         })
      })
   })
})

export const {useGetCommentsQuery,useAddCommentMutation} = apiSlice;