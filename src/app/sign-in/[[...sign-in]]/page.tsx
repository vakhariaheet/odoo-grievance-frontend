import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <div className="container flex justify-center items-center">
    <SignIn />
  </div>
}