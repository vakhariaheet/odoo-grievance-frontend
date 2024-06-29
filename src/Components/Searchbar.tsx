"use client";
import { usePathname ,useRouter} from "next/navigation";


const Searchbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="flex items-center my-10 w-full">
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const search = formData.get("search") as string;
                    await router.push(`${pathname}?search=${search}`);
                }}
                className="flex w-full"
            >
                <input type="text" placeholder="Search..." name="search" className="border w-full border-gray-300 p-2 rounded-lg" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-2"
                >Search</button>
            </form>
        </div>
    )
}

export default Searchbar;