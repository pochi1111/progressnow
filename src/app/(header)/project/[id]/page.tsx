import { auth } from "@/auth";

export default async function ProjectPage(props: { params: { id: string } }) {
  const resolvedParams = await props.params;
  const projectId = resolvedParams.id;
  if (!projectId) {
    return <div>プロジェクトIDが指定されていません。</div>;
  }

  // プロジェクトの詳細を取得するAPIエンドポイント
  const url = `http://${process.env.API_SERVER_URL}:8000/projects/${projectId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching project: ${response.statusText}`);
    }
    const projectData = await response.json();

    if (!projectData || !projectData.id) {
      return <div>プロジェクトが見つかりません。</div>;
    }

    const session = await auth();
    if (!session || !session.user) {
      return <div>セッションが見つかりません。ログインしてください。</div>;
    }
    const id = session.user.id;
    if (projectData.admin_id !== id) {
      return (
        <div>
          <h1>権限がありません</h1>
          <p>このプロジェクトのユーザーではありません。</p>
        </div>
      );
    }

    //プロジェクトのtodoを取得
    const todosUrl = `http://${process.env.API_SERVER_URL}:8000/tasks/project/${projectId}`;
    const todosResponse = await fetch(todosUrl);
    const todosData = await todosResponse.json();
    console.log("Todos Data:", todosData);
    if (!todosResponse.ok) {
      return (
        <div>
          <h1>情報の取得に失敗しました</h1>
          <p>後ほど再試行してください。</p>
        </div>
      );
    }

    return (
      <div>
        
      </div>
    );
  } catch (error) {
    console.error("Error fetching project data:", error);
    return (
      <div>
        プロジェクトのデータをに失敗しました。後ほど再試行してください。
      </div>
    );
  }
}
