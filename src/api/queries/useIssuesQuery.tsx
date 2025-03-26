import { octokit } from "@/api/octokit";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const useIssuesQuery = ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["issues", owner, repo],
    queryFn: async ({ pageParam }) => ({
      items: (
        await octokit.rest.issues.listForRepo({
          owner,
          repo,
          per_page: 20,
          page: pageParam,
        })
      ).data,
    }),
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
