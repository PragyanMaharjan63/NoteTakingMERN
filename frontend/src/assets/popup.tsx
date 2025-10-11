import Divider from "./divider";
import AutoExpandTextArea from "./textarea";

export default function Popup() {
  return (
    <div className="bg-white shadow-md z-10 p-6 rounded-lg h-[80svh] -translate-y-10 sm:translate-y-0">
      <div>
        <input
          type="text"
          placeholder="Title"
          className="text-3xl w-[70vw] font-bold outline-none"
        />
      </div>
      <Divider />
      <div>
        <AutoExpandTextArea />
      </div>
    </div>
  );
}
