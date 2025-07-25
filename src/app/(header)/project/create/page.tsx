import { Title, Input } from "@mantine/core";
import { useForm } from "@mantine/form"

function submitProject(values) {
  const url = `http://${process.env.API_SERVER_URL}:8000/projects`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
}

export default function createProjectPage() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      projectName: "",
    },
    validate: {
      projectName: (value) => (value.length < 3 ? "Project name must be at least 3 characters long" : null),
    },
  })
  return (
    <div className="p-8">
      <Title order={1}>新しいリストを作成</Title>
      <form onSubmit={form.onSubmit((values) => submitProject(values))}>
      </form>
      <Input.Wrapper label="プロジェクト名" required>
        <Input placeholder="Project Name"></Input>
      </Input.Wrapper>
    </div>
  );
}
