export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Ex 3: List & Dynamic Routing
                </h1>
                {children}
            </div>
        </div>
    );
}