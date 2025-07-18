import {
  Title,
  Text,
  Container,
  Button,
  Group,
  ThemeIcon,
  Card,
  Grid,
  rem,
  SimpleGrid, // SimpleGridを追加
} from "@mantine/core";
import {
  IconArrowRight,
  IconGraph,
  IconChecklist,
  IconBrain,
} from "@tabler/icons-react";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Container size="lg" py={100}>
        <div style={{ maxWidth: rem(580), margin: "0 auto" }}>
          <Title order={1} size="h1" fw={800} ta="center">
            タスクを
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              つながりで
            </Text>
            管理する
          </Title>

          <Text c="dimmed" ta="center" size="lg" mt="md">
            Progress Now は、タスクの関連性を可視化し、
            プロジェクトの全体像を把握しながら効率的に管理できるツールです。
          </Text>

          <Group justify="center" mt={30}>
            <Button
              size="lg"
              component="a"
              href="/app"
              rightSection={<IconArrowRight size={20} />}
            >
              始める
            </Button>
          </Group>
        </div>
      </Container>

      {/* Features Section */}
      <Container size="lg" py={50}>
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Card shadow="md" radius="md" padding="xl">
            <ThemeIcon
              size={50}
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              <IconGraph size={30} />
            </ThemeIcon>
            <Text mt="md" size="lg" fw={500}>
              グラフ型タスク管理
            </Text>
            <Text c="dimmed" size="sm">
              タスク同士のつながりを可視化し、
              プロジェクトの流れを直感的に把握できます。
            </Text>
          </Card>

          <Card shadow="md" radius="md" padding="xl">
            <ThemeIcon
              size={50}
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              <IconChecklist size={30} />
            </ThemeIcon>
            <Text mt="md" size="lg" fw={500}>
              シンプルな操作性
            </Text>
            <Text c="dimmed" size="sm">
              直感的なインターフェースで、
              複雑なタスクの関係性も簡単に設定できます。
            </Text>
          </Card>

          <Card shadow="md" radius="md" padding="xl">
            <ThemeIcon
              size={50}
              radius="md"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              <IconBrain size={30} />
            </ThemeIcon>
            <Text mt="md" size="lg" fw={500}>
              全体像の把握
            </Text>
            <Text c="dimmed" size="sm">
              プロジェクトの依存関係を一目で理解し、
              効率的な作業計画を立てられます。
            </Text>
          </Card>
        </SimpleGrid>
      </Container>
    </>
  );
}
