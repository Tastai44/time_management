
export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="w-full flex flex-col justify-between h-[85vh]">
        {children}
    </section>;
}