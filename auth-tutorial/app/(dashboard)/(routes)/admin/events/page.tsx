import { auth, signOut } from "@/auth";

const Events = async () => {
  const session = await auth();
  return (
    <div>
      Events {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className=" p-4 border bg-black text-white" type="submit">
          Signout
        </button>
      </form>
    </div>
  );
};

export default Events;
