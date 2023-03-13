import "../styles/globals.css";
import { Comfortaa, Karla } from "next/font/google";
import type { AppProps } from "next/app";

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
        <main className={`${comfortaa.variable} ${karla.variable} font-sans`}>
            <Component {...pageProps} />
        </main>
    );
}
