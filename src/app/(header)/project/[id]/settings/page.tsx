export default async function SettingsPage(props: { params: { id: string } }) {
  const resolvedParams = await props.params;
  const projectId = resolvedParams.id;
  if (!projectId) {
    return <div>プロジェクトIDが指定されていません。</div>;
  }

  // プロジェクトの設定を取得するAPIエンドポイント
  const url = `http://${process.env.API_SERVER_URL}:8000/projects/${projectId}/settings`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching project settings: ${response.statusText}`,
      );
    }
    const settingsData = await response.json();

    if (!settingsData || !settingsData.id) {
      return <div>プロジェクトの設定が見つかりません。</div>;
    }

    return (
      <div>
        <h1>プロジェクト設定</h1>
        <pre>{JSON.stringify(settingsData, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    //console.error("Error fetching project settings:", error);
    return (
      <div>
        <h1>情報の取得に失敗しました</h1>
        <p>後ほど再試行してください。</p>
      </div>
    );
  }
}
