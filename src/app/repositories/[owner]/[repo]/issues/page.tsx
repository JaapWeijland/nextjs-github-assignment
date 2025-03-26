"use client";

import { IssuesList } from "@/app/repositories/[owner]/[repo]/issues/_components/IssuesList";
import { Column } from "@/components/atoms/Column";
import { Row } from "@/components/atoms/Row";
import { Spinner } from "@/components/atoms/Spinner";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Heading, Link, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { memo, Suspense, use } from "react";

const IssuesListPage = ({
  params,
}: {
  params: Promise<{ repo: string; owner: string }>;
}) => {
  const { repo, owner } = use(params);

  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Column className="gap-6">
        <Column className="gap-2">
          <Heading>
            Issues for{" "}
            <Text color="gold">
              {owner}/{repo}
            </Text>
          </Heading>
        </Column>
        <Link onClick={() => history.back()}>
          <Text color="gray">
            <Row className="items-center gap-2 hover:underline cursor-pointer">
              <ArrowLeftIcon height="16" width="16" />
              <Text size="2" color="gray">
                back to search
              </Text>
            </Row>
          </Text>
        </Link>
        <Suspense
          fallback={
            <AnimatePresence>
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Spinner />
              </motion.div>
            </AnimatePresence>
          }
        >
          <MemoizedIssuesList key={repo + owner} repo={repo} owner={owner} />
        </Suspense>
      </Column>
    </motion.div>
  );
};

const MemoizedIssuesList = memo(IssuesList);

export default IssuesListPage;
