import "./globals.css";
import type { AppProps } from "next/app";
import NavBar from "./NavBar";
import { SessionProvider } from "next-auth/react";
import { Comfortaa, Karla } from "next/font/google";

const comfortaa = Comfortaa({
    subsets: ["latin"],
    variable: "--font-comfortaa",
});

const karla = Karla({
    subsets: ["latin"],
    variable: "--font-karla",
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <main>
                <div
                    className={`${comfortaa.variable} ${karla.variable} font-sans bg-beige-gradient h-screen w-screen`}
                >
                    <NavBar />
                    <Component {...pageProps} />
                </div>
            </main>
        </SessionProvider>
    );
}
