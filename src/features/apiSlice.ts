import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface Feedback {
  id: string
  text: string
  badgeLetter: string
  company: string
  upvoteCount: number
  daysAgo: number
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://bytegrad.com/course-assets/js/1/api',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  tagTypes: ['Feedback'],
  endpoints: (builder) => ({
    getComments: builder.query<Feedback[], void>({
      query: () => '/feedbacks',
      providesTags: (result) =>
        Array.isArray(result)
          ? [
              ...result.map(({ id }) => ({ type: 'Feedback' as const, id })),
              { type: 'Feedback' as const, id: 'LIST' },
            ]
          : [{ type: 'Feedback' as const, id: 'LIST' }],
    }),
    addComment: builder.mutation<
      Feedback,
      { text: string; badgeLetter: string; company: string }
    >({
      query: ({ text, badgeLetter, company }) => ({
        url: '/feedbacks',
        method: 'POST',
        body: {
          text,
          badgeLetter,
          company,
          upvoteCount: 0,
          daysAgo: 0,
        },
      }),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
    // deleteComment: builder.mutation<void, string>({
    //   query: (id) => ({
    //     url: `/feedbacks/${id}`,
    //     method: 'DELETE',
    //   }),
    //   invalidatesTags: (result, error, arg) => [{ type: 'Feedback', id: arg }],
    // }),
    // upvoteComment: builder.mutation<
    //   Feedback,
    //   { id: string; currentUpvote: number }
    // >({
    //   query: ({ id, currentUpvote }) => ({
    //     url: `/feedbacks/${id}`,
    //     method: 'PUT',
    //     body: {
    //       upvoteCount: currentUpvote + 1,
    //     },
    //   }),
    //   invalidatesTags: (result, error, arg) => [
    //     { type: 'Feedback', id: arg.id },
    //   ],
    // }),
  }),
})

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  // useDeleteCommentMutation,
  // useUpvoteCommentMutation,
} = apiSlice 