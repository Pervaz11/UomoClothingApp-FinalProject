import React from "react";

interface InfoTabProps {
    product: any;
}

const InfoTab: React.FC<InfoTabProps> = ({ product }) => {
    if (!product) return null;

    const { measurements, size, colors, material, stock, brand } = product;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {measurements && (
                <>
                    <div className="font-semibold">Weight</div>
                    <div>{measurements.weight || "N/A"}</div>

                    <div className="font-semibold">Dimensions</div>
                    <div>
                        {measurements.length} x {measurements.width} x {measurements.height} cm
                    </div>
                </>
            )}

            <div className="font-semibold">Size</div>
            <div>{size}</div>

            <div className="font-semibold">Color</div>
            <div>{colors?.map((c: any) => c.name).join(", ")}</div>

            <div className="font-semibold">Material</div>
            <div>{material || "N/A"}</div>

            <div className="font-semibold">Stock</div>
            <div>{stock}</div>

            <div className="font-semibold">Brand</div>
            <div>{brand || "N/A"}</div>
        </div>
    );
};

export default InfoTab;
