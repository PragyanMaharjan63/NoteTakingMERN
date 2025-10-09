import Account from "./accounts";

export default function Navbar() {
  return (
    <div className="w-full bg-neutral-100 font-bold text-lg text-[var(--heading-dark)] flex justify-between p-3 rounded-xl">
      <div>Note Taking App</div>
      <div>
        <Account />
      </div>
    </div>
  );
}
