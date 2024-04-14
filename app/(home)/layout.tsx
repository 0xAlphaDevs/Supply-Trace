import Navbar from "@/components/navbar"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <section className="flex flex-col justify-between px-8 py-4 ">
            <Navbar />

            {children}
        </section>
    )
}