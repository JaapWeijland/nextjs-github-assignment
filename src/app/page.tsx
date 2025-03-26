"use client";

import { SORT_OPTIONS, SortValue } from "@/api/queries/useSearchQuery";
import { RepositoryList } from "@/app/_components/RepositoryList";
import { Column } from "@/components/atoms/Column";
import { Row } from "@/components/atoms/Row";
import { Spinner } from "@/components/atoms/Spinner";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Select, TextField } from "@radix-ui/themes";
import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, Suspense, useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get("term") ?? "");
  const [sort, setSort] = useState(SORT_OPTIONS[0].value);
  const [debouncedTerm] = useDebounce(term, 500);

  const pathname = usePathname();

  // Uncomment this section to mimick errors
  // const randomError = useRef(Math.random() > 0.9);
  // if (randomError.current) throw Error("Expected error");

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    router.push(pathname + "?" + createQueryString("term", debouncedTerm));
  }, [createQueryString, debouncedTerm, pathname, router]);

  return (
    <motion.div
      key="page-loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Column className="gap-8">
        <Column className="gap-4">
          <Row className="gap-4">
            <TextField.Root
              className="flex-1"
              placeholder="Search Github…"
              onChange={(e) => setTerm(e.target.value)}
              defaultValue={term}
              size="3"
            >
              <TextField.Slot>
                <MagnifyingGlassIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            <Select.Root
              defaultValue={SORT_OPTIONS[0].value}
              value={sort}
              onValueChange={(value: SortValue) => setSort(value)}
              size="3"
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  {SORT_OPTIONS.map((option) => (
                    <Select.Item key={option.value} value={option.value}>
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </Row>

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
            <MemoizedRepositoryList
              key={debouncedTerm + sort}
              term={debouncedTerm}
              sort={sort}
            />
          </Suspense>
        </Column>
      </Column>
    </motion.div>
  );
}

const MemoizedRepositoryList = memo(RepositoryList);
