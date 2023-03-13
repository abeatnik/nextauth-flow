import "./globals.css";
import NavBar from "./NavBar";

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-beige-gradient">
                <NavBar />
                <div className="w-screen h-screen">{children}</div>
            </body>
        </html>
    );
}
