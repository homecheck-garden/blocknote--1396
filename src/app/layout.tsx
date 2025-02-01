import type { Metadata } from "next";
import "../assets/css/globals.css";
import "../assets/css/react_flow/basic.css"
import "../assets/css/react_flow/node.css"
import "../assets/css/react_flow/control.css"
import "../assets/css/react_flow/context.css"
import "../assets/css/editor.css"
import "../assets/css/navigator.css"


export const metadata: Metadata = {
  title: "Thought-reactjs",
  description: "Thought-reactjs",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" />
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>
      </head>
      <body id="thought-app" className="bg-[#F7F6F3] text-[#37352F]">
        {children}
        <div id="overlay">
          <div></div>
        </div>
      </body>
    </html>
  );
}
