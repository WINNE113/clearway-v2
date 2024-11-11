import {DashSidebar, Header} from "../components/index";
export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-12 bg-slate-300">
      <div className="w-full col-span-2">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      <div className="col-span-10">
        <div className="flex-row gap-2">
          <Header/>
        </div>
      </div>
    </div>
  );
}