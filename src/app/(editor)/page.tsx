import Preview from "./preview";
import Footer from "./footer";

export default function EditorPage() {
  return (
    <div className="relative flex flex-1 flex-col overflow-auto">
      <div className="flex flex-1">
        <div className="flex flex-1 items-center justify-center p-32">
          <Preview />
        </div>
      </div>
      <Footer />
    </div>
  );
}
