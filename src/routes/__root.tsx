import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import huiwenMincho from "../assets/fonts/huiwen-mincho.woff2";
import xiaodouUtopia from "../assets/fonts/xiaodou-utopia.woff2";
import wuqiuYingyu from "../assets/fonts/wuqiuyingyuzhong.woff2";
import cormorantGaramond from "../assets/fonts/cormorant-garamond.woff2";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "../lib/theme";
import { ThemeMenu } from "../components/ThemeMenu";
import { PageTransition } from "../components/PageTransition";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">页面不存在</h2>
        <p className="mt-2 text-sm text-muted-foreground">你访问的页面不存在，或者已经被移动了。</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">页面加载失败</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          页面刚刚出了点问题。你可以重试，或者先回到首页。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            重试
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "有词可栖" },
      { name: "description", content: "给说不清的感受，一个可以停靠的词。" },
      { name: "author", content: "femAI 黑客松" },
      { property: "og:title", content: "有词可栖" },
      { property: "og:description", content: "给说不清的感受，一个可以停靠的词。" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "有词可栖" },
      { name: "twitter:description", content: "给说不清的感受，一个可以停靠的词。" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const criticalCSS = `@font-face{font-family:"Cormorant Garamond";src:url(${cormorantGaramond}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"WuQiu Hand";src:url(${wuqiuYingyu}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"Huiwen Mincho";src:url(${huiwenMincho}) format("woff2");font-weight:400;font-style:normal;font-display:swap}@font-face{font-family:"Xiaodou Utopia";src:url(${xiaodouUtopia}) format("woff2");font-weight:400;font-style:normal;font-display:swap}:root{--paper:#fff4e6;--ink:#4a2f4e;--ink-soft:#9b6b9e;--rule:#f1d4c2;--note:#ffe5d2;--seal:#ed6a8a;--card-bg:#fffaf2;--background:var(--paper);--foreground:var(--ink);--card:var(--card-bg);--card-foreground:var(--ink);--border:var(--rule)}html,body{background-color:var(--paper);color:var(--ink);font-family:"PingFang SC","Noto Serif CJK SC","Songti SC","SimSun",ui-serif,serif}`;
  return (
    <html lang="zh-CN">
      <head>
        <style dangerouslySetInnerHTML={{ __html: criticalCSS }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemeMenu />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <PageTransition>
          <Outlet />
        </PageTransition>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
