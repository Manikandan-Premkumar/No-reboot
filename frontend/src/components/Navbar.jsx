export default function Navbar() {
  return (
    <nav
      className="
        bg-black
        text-white
        px-8
        py-4
        flex
        justify-between
        items-center
      "
    >
      <div>
        <h1 className="text-2xl font-bold">
          No Reboot
        </h1>

        <p className="text-sm text-gray-300">
          Config Dashboard
        </p>
      </div>

      <div className="flex gap-6">
        <button>Configs</button>
        <button>Logs</button>
        <button>Deployments</button>
      </div>
    </nav>
  )
}