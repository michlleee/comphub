import { OrganizerContainer } from "@/components/OrganizerContainer";

export default function OrganizerDashboardPage() {
  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="border-b border-gray-800 bg-gray-900/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Organizer Dashboard
                </h1>
                <p className="text-gray-400 mt-1">
                  Manage your competitions and events
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Welcome back,</p>
                  <p className="font-semibold text-orange-400">John Doe</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <OrganizerContainer />
      </div>
    </>
  );
}
