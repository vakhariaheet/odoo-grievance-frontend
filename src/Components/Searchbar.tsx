"use client";
import { usePathname ,useRouter} from "next/navigation";


const Searchbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const formData = new FormData(form);
                    const search = formData.get("search") as string;
                    await router.push(`${pathname}?search=${search}`);
                 }}
            >
                <input type="text" placeholder="Search..." name="search" />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default Searchbar;