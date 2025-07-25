import { auth } from "@/auth";

interface TodoItem {
  id: number;
  project_id: number;
  title: string;
  description?: string;
  due_date?: string | null;
  status: "completed" | "in_progress" | "not_started";
  updated_at: string;
  created_at: string;
}

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
          <p>URLが正しいことを確認し、後ほど再試行してください。</p>
        </div>
      );
    }

    return (
      <div>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-6">{projectData.name}</h1>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">プロジェクト詳細</h2>
            <p className="mb-2"><span className="font-medium">説明:</span> {projectData.description || "説明なし"}</p>
            <p className="mb-4"><span className="font-medium">作成日:</span> {new Date(projectData.created_at).toLocaleDateString()}</p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Todo一覧</h2>
            {todosData && todosData.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                {todosData.map((todo: TodoItem) => (
                  <li key={todo.id} className="py-4">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-3 ${todo.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div className="flex-1">
                    <h3 className="font-medium">{todo.title}</h3>
                    <p className="text-sm text-gray-600">{todo.description || "説明なし"}</p>
                    <p className="text-xs text-gray-500 mt-1">期限: {todo.due_date ? new Date(todo.due_date).toLocaleDateString() : "設定なし"}</p>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                    {todo.status === 'completed' ? '完了' : '未完了'}
                    </span>
                  </div>
                  </li>
                ))}
                </ul>
            ) : (
              <p className="text-gray-500">Todoがありません。</p>
            )}
          </div>
        </div>
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
