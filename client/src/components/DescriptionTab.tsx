type DescriptionTabProps = {
    description: string;
};
const DescriptionTab: React.FC<DescriptionTabProps> = ({ }) => {
    return (
        <>
            <div className="gap-10 flex flex-col">
                <h1 className="text-xl font-medium">
                    Sed do eiusmod tempor incididunt ut labore
                </h1>
                <p className="max-150 tracking-wider">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum. Sed ut
                    perspiciatis unde omnis iste natus error sit voluptatem accusantium
                    doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                    inventore veritatis et quasi architecto beatae vitae dicta sunt
                    explicabo.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
                <div>
                    <h2 className="text-lg font-semibold mb-2">Why choose product?</h2>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Create by cotton fabric with soft and smooth</li>
                        <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                        <li>Downloadable/Digital Products, Virtual Products</li>
                    </ul>

                    <h3 className="text-lg font-semibold mt-6 mb-2">Lining</h3>
                    <p>100% Polyester, Main: 100% Polyester.</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold mb-2">Sample Number List</h2>
                    <ol className="list-decimal list-inside space-y-1">
                        <li>Create Store-specific attributes on the fly</li>
                        <li>Simple, Configurable (e.g. size, color, etc.), bundled</li>
                        <li>Downloadable/Digital Products, Virtual Products</li>
                    </ol>
                </div>
            </div>
        </>
    );
};

export default DescriptionTab;
