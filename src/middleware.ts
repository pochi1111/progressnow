import { auth } from "@/auth";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default auth(async (req: NextRequest) => {
  // セッション情報を取得
  const session = await auth();
  if (!session || !session.user) {
    if (
      req.nextUrl.pathname === "/auth/login" ||
      req.nextUrl.pathname === "/auth/signup" ||
      req.nextUrl.pathname === "/"
    ) {
      return NextResponse.next();
    }
    console.log("not authenticated");
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${req.url}`, req.url),
    );
  }

  // 認証済みの場合はアカウントが存在するか確認
  const email = session.user.email as string;
  const url = `http://${process.env.API_SERVER_URL}:8000/users/${email}`;
  const response = await fetch(url);
  if (response.status === 404) {
    // NOTE: callbackUrlを指定させる
    if (req.nextUrl.pathname === "/auth/signup") {
      return NextResponse.next();
    }
    return NextResponse.redirect(
      new URL(`/auth/signup?callbackUrl=${req.url}`, req.url),
    );
  } else if (!response.ok) {
    // その他のエラー処理
    console.error("Error fetching user data:", response.statusText);
    return NextResponse.error();
  }

  if (
    req.nextUrl.pathname === "/auth/login" ||
    req.nextUrl.pathname === "/auth/signup"
  ) {
    // ログイン済みの場合はリダイレクト
    return NextResponse.redirect(new URL("/app", req.url));
  }

  return NextResponse.next();
});

// matcherで特定のパスにのみミドルウェアを適用
export const config = {
  matcher: ["/", "/app/:path*", "/auth/:path*"],
};
