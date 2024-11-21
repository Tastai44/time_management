export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="w-full flex flex-col justify-between">
        {children}
    </section>;
}