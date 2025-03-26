import { useInView } from "react-intersection-observer";
import { Column } from "@/components/atoms/Column";
import { useIssuesQuery } from "@/api/queries/useIssuesQuery";
import { Card, Text } from "@radix-ui/themes";
import Link from "next/link";
import { Row } from "@/components/atoms/Row";
import { CardStackIcon } from "@radix-ui/react-icons";
import { AnimatePresence, motion } from "motion/react";
import { Spinner } from "@/components/atoms/Spinner";

export const IssuesList = ({
  repo,
  owner,
}: {
  repo: string;
  owner: string;
}) => {
  const { data, fetchNextPage, isFetchingNextPage } = useIssuesQuery({
    repo,
    owner,
  });

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
      <motion.div
        key="list"
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
                  <IssuesList.Item
                    name={item.title}
                    githubUrl={item.html_url}
                    number={item.number}
                    authorName={item.user?.login ?? "no name"}
                    commentsCount={item.comments}
                  />
                </li>
              );
            });
          })}
        </ul>
      </motion.div>
      {isFetchingNextPage && (
        <motion.div
          key={"fetching-next-page"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          <Spinner />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const IssuesListItem = ({
  name,
  number,
  githubUrl,
  authorName,
  commentsCount,
}: {
  name: string;
  number: number;
  githubUrl: string;
  authorName: string;
  commentsCount: number;
}) => {
  return (
    <Card asChild>
      <Link href={githubUrl}>
        <Column className="gap-1 px-4 py-3 cursor-pointer ">
          <Row className="justify-between">
            <Row className="gap-2">
              <Text size="2" color="gray">
                #{number}
              </Text>
              <Text size="2" color="gray">
                opened by {authorName}
              </Text>
            </Row>
            <Row>
              <Text size="2" color="gray">
                <Row className="items-center gap-2">
                  <CardStackIcon height="16" width="16" />

                  <Text size="2" color="gray">
                    {commentsCount}
                  </Text>
                </Row>
              </Text>
            </Row>
          </Row>
          <Text weight="medium">{name}</Text>
        </Column>
      </Link>
    </Card>
  );
};

IssuesList.Item = IssuesListItem;
