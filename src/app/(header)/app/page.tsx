import React from "react";
import { auth } from "@/auth";
import { Title, Box, Alert, Group, Stack, Card } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { CreateProjectButton } from "@/components/ui/creatProjectButton";

async function fetchUserData(email: string) {
  const userUrl = `http://${process.env.API_SERVER_URL}:8000/users/email/${email}`;
  const response = await fetch(userUrl, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Error fetching user data");
  }
  return response.json();
}

async function fetchProjects(userId: string) {
  const url = `http://${process.env.API_SERVER_URL}:8000/projects/admin/${userId}`;
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Error fetching projects");
  }
  return response.json();
}

export default async function AppPage() {
  const session = await auth();
  if (!session || !session.user) {
    return <div>Loading...</div>;
  }
  const email = session.user.email as string;
  if (!email) {
    return <div>No email found in session</div>;
  }

  let projects;
  try {
    const userData = await fetchUserData(email);
    if (!userData || !userData.id) {
      return <div>User not found</div>;
    }
    const userId = userData.id;
    projects = await fetchProjects(userId);
    if (!projects || !Array.isArray(projects)) {
      return <div>No projects found for this user</div>;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data. Please try again later.</div>;
  }

  console.log("Fetched projects:", projects);

  return (
    <Box p="20px">
      <Group justify="space-between" mb="md">
        <Title order={1}>リスト</Title>
        <CreateProjectButton />
      </Group>
      {projects.length === 0 ? (
        <Alert>
          <Group>
            <IconInfoCircle size={16} />
            <span>リストがありません。新しいリストを作成してください。</span>
          </Group>
          <Box mt="md" py="md">
            <CreateProjectButton />
          </Box>
        </Alert>
      ) : (
        <Box className="project-list">
          <Stack>
            {projects.map((project) => (
              <Card
                key={project.id}
                shadow="sm"
                padding="lg"
                radius="md"
                withBorder
                mb="sm"
                component="a"
                href={`/project/${project.id}`}
                style={{ textDecoration: "none", cursor: "pointer" }}
              >
                <Group justify="space-between">
                  <Box>
                    <Title order={3} mb="xs">
                      {project.project_name}
                    </Title>
                    <Group justify="space-between">
                      <Box size="xs" c="dimmed">
                        作成日:
                        {new Date(project.created_at)
                          .toLocaleDateString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                          .replace(/\//g, "/")}
                      </Box>
                    </Group>
                  </Box>
                </Group>
              </Card>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
}
