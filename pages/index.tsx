import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
    const { data: session } = useSession();
    // useEffect(() => {
    //     session?.user &&
    //         fetch("/api/test", {
    //             method: "GET",
    //             headers: {
    //                 authorization: `bearer ${session.user.accessToken}`,
    //             },
    //         })
    //             .then((data) => data.json())
    //             .then((result) => console.log(result));
    // }, []);
    console.log({ session });
    return (
        <h1 className="w-screen mt-64 text-center font-comfortaa text-6xl text-sage-d">
            Welcome!
        </h1>
    );
}
