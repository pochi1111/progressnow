"use client";
import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import { createProject } from "@/app/actions";

export function CreateProjectButton() {
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => (value.length < 1 ? "タイトルを入力してください" : null),
    },
  });

  return (
    <>
      <Button
        leftSection={<IconPlus size={16} />}
        onClick={open}
      >
        新しいリストを作成
      </Button>

      <Modal opened={opened} onClose={close} title="新しいリストを作成">
        <form onSubmit={form.onSubmit((values) => {
          createProject(values)
            .then(() => {
              close();
              form.reset();
              window.location.reload();
            })
            .catch((error) => {
              console.error("Error creating project:", error);
            });
        })}>
          <TextInput
            label="タイトル"
            placeholder="リストのタイトルを入力"
            {...form.getInputProps("title")}
          />
          <Button type="submit" fullWidth mt="md">
            作成
          </Button>
        </form>
      </Modal>
    </>
  );
}