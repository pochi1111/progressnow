import { Container, Group, ActionIcon, Text, Box } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

export function Footer() {
  return (
    <Box bg="black">
      <footer className="py-8 bg-dark-6">
        <Container size="lg" h="100%">
          <Group justify="space-between" h="100%" px="md">
            <Text size="sm" c="dimmed">
              © 2025 Progress Now. All rights reserved.
            </Text>

            <Group gap="xs">
              <ActionIcon
                size="lg"
                color="gray"
                variant="subtle"
                component="a"
                href="https://github.com/pochi1111/progressnow"
                target="_blank"
              >
                <IconBrandGithub size="1.05rem" />
              </ActionIcon>
            </Group>
          </Group>
        </Container>
      </footer>
    </Box>
  );
}
