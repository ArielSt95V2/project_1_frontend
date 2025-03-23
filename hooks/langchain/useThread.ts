import {
  useGetThreadsQuery,
  useCreateThreadMutation,
  useDeleteThreadMutation,
} from '@/redux/features/langchain/langchainApiSlice';

export const useThread = () => {
  const { data: threads, isLoading: isLoadingThreads } = useGetThreadsQuery();
  const [createThreadMutation] = useCreateThreadMutation();
  const [deleteThreadMutation] = useDeleteThreadMutation();

  const createThread = async ({ title }: { title: string }) => {
    try {
      await createThreadMutation({ title });
    } catch (error) {
      console.error('Failed to create thread:', error);
      throw error;
    }
  };

  const deleteThread = async (threadId: string) => {
    try {
      await deleteThreadMutation(threadId);
    } catch (error) {
      console.error('Failed to delete thread:', error);
      throw error;
    }
  };

  return {
    threads,
    isLoadingThreads,
    createThread,
    deleteThread,
  };
}; 