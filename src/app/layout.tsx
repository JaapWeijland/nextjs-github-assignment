import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Avatar, Theme, Text, Heading } from "@radix-ui/themes";
import { AnimatePresence } from "motion/react";
import { Column } from "@/components/atoms/Column";
import { Row } from "@/components/atoms/Row";
import { Page } from "@/components/templates/Page";
import { ClientProviders } from "@/app/_components/ClientProviders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reversed - Job Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme appearance="dark">
          <ClientProviders>
            <Page>
              <Column className="gap-16">
                <Row className="justify-between">
                  <Column className="gap-2 flex-1">
                    <Heading size="4">Github Inspector</Heading>
                    <Text size="2">The place to search all repos.</Text>
                  </Column>
                  <Row className="gap-2 items-center">
                    <Avatar
                      radius="full"
                      src="https://cdn.bsky.app/img/avatar/plain/did:plc:xfbg4bgv3re6knluy2um6k4m/bafkreif7sof6yftbaiwasitgrjcc4k3wn5npvjo7o2yfunhbsmqk4la6g4@jpeg"
                      fallback="JW"
                      size="3"
                    />
                    <Column>
                      <Text size="2">Jaap Weijland</Text>
                      <Text size="2" color="gray">
                        Applicant
                      </Text>
                    </Column>
                  </Row>
                </Row>
                <AnimatePresence>{children}</AnimatePresence>
              </Column>
            </Page>
          </ClientProviders>
        </Theme>
      </body>
    </html>
  );
}
