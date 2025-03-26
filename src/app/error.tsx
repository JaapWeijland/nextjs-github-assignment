"use client";

import { Column } from "@/components/atoms/Column";
import { Row } from "@/components/atoms/Row";
import { Button, Card, Heading, Text } from "@radix-ui/themes";
import { motion } from "motion/react";

export default function Error() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card>
        <Column className="gap-8 p-8">
          <Column className="justify-center gap-2">
            <Heading align={"center"}>Something is not right.</Heading>
            <Text align="center">
              An unexpected error happened. Please reload the website.
            </Text>
          </Column>
          <Row className="justify-center">
            <Button
              onClick={() => window.location.reload()}
              size="3"
              color="gray"
              variant="outline"
            >
              Refresh
            </Button>
          </Row>
        </Column>
      </Card>
    </motion.div>
  );
}
