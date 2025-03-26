import { SortValue, useSearchQuery } from "@/api/queries/useSearchQuery";
import { useInView } from "react-intersection-observer";
import { Column } from "@/components/atoms/Column";
import Link from "next/link";
import { Row } from "@/components/atoms/Row";
import { Card, Text } from "@radix-ui/themes";
import { StarIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";

export const RepositoryList = ({
  term,
  sort,
}: {
  term: string;
  sort: SortValue;
}) => {
  const { data, fetchNextPage } = useSearchQuery({ term, sort });

  const { ref } = useInView({
    trackVisibility: true,
    delay: 100,
    onChange: (isInView) => {
      if (isInView) {
        fetchNextPage();
      }
    },
  });

  return (
    <AnimatePresence>
      {term === "" && (
        <motion.div
          key={"no-term"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <Column className="py-4">
            <Text color="gray" align="center" size="2">
              Please enter a search term
            </Text>
          </Column>
        </motion.div>
      )}
      {data.pages.length === 1 &&
        data.pages[0].items.length === 0 &&
        term !== "" && (
          <motion.div
            key={"no-results"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <Column className="py-4">
              <Text color="gray" align="center" size="2">
                No results found
              </Text>
            </Column>
          </motion.div>
        )}
      <motion.div
        key={term + sort}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 1 }}
      >
        <ul className="flex flex-col gap-4">
          {data.pages.map((page, pageIndex) => {
            return page.items.map((item, itemIndex) => {
              return (
                <li
                  key={item.id}
                  ref={
                    pageIndex === data.pages.length - 1 && itemIndex === 0
                      ? ref
                      : undefined
                  }
                >
                  <RepositoryList.Item
                    name={item.full_name}
                    description={item.description ?? undefined}
                    author={{
                      avatarUrl: item.owner?.avatar_url ?? "",
                      name: item.owner?.name ?? "no name",
                    }}
                    stars={item.stargazers_count}
                    id={item.id.toString()}
                  />
                </li>
              );
            });
          })}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
};

const RepositoryListItem = ({
  name,
  description,
  stars,
}: {
  id: string;
  name: string;
  author: { name: string; avatarUrl: string };
  stars: number;
  description?: string;
}) => {
  const [owner, repo] = name.split("/");

  return (
    <Card asChild>
      <Link href={`/repositories/${owner}/${repo}/issues`}>
        <Column className="gap-2 px-4 py-3 cursor-pointer ">
          <Row className="justify-between">
            <Text size="2" color="gray">
              {name}
            </Text>
            <Text size="2" color="gray">
              <Row className="gap-2 items-center">
                <StarIcon height="16" width="16" />
                <Text size="2" color="gray">
                  {stars}
                </Text>
              </Row>
            </Text>
          </Row>
          <Text weight="medium">{description}</Text>
        </Column>
      </Link>
    </Card>
  );
};

RepositoryList.Item = RepositoryListItem;
