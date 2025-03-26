import { octokit } from "@/api/octokit";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

export const SORT_VALUES = [
  "stars",
  "forks",
  "help-wanted-issues",
  "updated",
] as const;

export type SortValue = (typeof SORT_VALUES)[number];

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { label: "Stars", value: "stars" },
  { label: "Forks", value: "forks" },
  { label: "Help Wanted Issues", value: "help-wanted-issues" },
  { label: "Updated", value: "updated" },
] as const;

export const useSearchQuery = ({
  term,
  sort,
}: {
  term: string;
  sort?: SortValue;
}) => {
  return useSuspenseInfiniteQuery({
    queryKey: ["search", term, sort],
    queryFn: async ({ pageParam }) => {
      if (!term) return { items: [] };
      const { data } = await octokit.rest.search.repos({
        q: term,
        order: "desc",
        sort: sort ?? "stars",
        page: pageParam,
        per_page: 30,
      });

      return data;
    },
    getNextPageParam: (_, allPages) => {
      return allPages.length + 1;
    },
    initialPageParam: 1,
  });
};
