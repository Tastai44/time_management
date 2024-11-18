export default function HomneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="w-full flex flex-col justify-between">
        {children}
    </section>;
}