import React from 'react';
import MainLayout from '../templates/MainLayout';
import { ProductCard } from '../molecules/ProductCard';

const ProductCardDemo: React.FC = () => {
  return (
    <MainLayout>
      <div className="px-6 py-8 space-y-12">
        <h1 className="text-3xl font-bold mb-8">Product Card Component</h1>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Flat Variant (Simple)</h2>
          <div className="max-w-lg">
            <ProductCard
              productId="TOA-8GASMDUDFT"
              variant="flat"
              tags={[
                { text: "AMZ", type: "yellow" },
                { text: "P1", type: "blue" }
              ]}
              qcStatus="QC Passed:"
              qcTimestamp="2 days ago, 3:03:58 PM"
            />
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Flat Variants with Color Strips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Blue Strip</h3>
              <ProductCard
                productId="MNO-2D5RK9BX31"
                variant="flat"
                tags={[{ text: "FAST", type: "blue" }]}
                qcStatus="QC Passed:"
                qcTimestamp="1 week ago"
                colorStrip="blue"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Red Strip</h3>
              <ProductCard
                productId="STU-1C4QJ8AW20"
                variant="flat"
                tags={[{ text: "CRITICAL", type: "red" }]}
                qcStatus="QC Failed:"
                qcTimestamp="3 days ago"
                colorStrip="red"
              />
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Flat Variant with Expandable Details</h2>
          <div className="max-w-lg">
            <ProductCard
              productId="VWX-0B3PH7NZ98"
              variant="flat"
              tags={[
                { text: "EXP", type: "green" },
                { text: "P2", type: "purple" }
              ]}
              qcStatus="QC Passed:"
              qcTimestamp="Yesterday, 4:15 PM"
              colorStrip="green"
              productDetails={{
                type: "Apparel",
                status: "Active",
                createdAt: "2023-06-20",
                updatedAt: "2023-06-25"
              }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Elevated Variant (Default)</h2>
          <div className="max-w-lg">
            <ProductCard
              productId="XCM-9P3RLZHT65"
              tags={[
                { text: "AMZ", type: "yellow" },
                { text: "P1", type: "blue" },
                { text: "QC", type: "green" }
              ]}
              qcStatus="QC Passed:"
              qcTimestamp="1 day ago, 5:37:12 PM"
              colorStrip="blue"
              productDescription="This is a sample product description that shows how text appears in the card component."
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">With Product Details (Expandable)</h2>
          <div className="max-w-lg">
            <ProductCard
              productId="KLM-7B2VN5FT43"
              tags={[
                { text: "WMT", type: "purple" },
                { text: "P2", type: "red" }
              ]}
              qcStatus="QC Pending:"
              qcTimestamp="3 hours ago, 10:15:22 AM"
              colorStrip="yellow"
              productDescription="A product with expandable details section showing additional information."
              productDetails={{
                type: "Electronics",
                status: "In Review",
                createdAt: "2023-05-15",
                updatedAt: "2023-05-18"
              }}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Clip Styles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Notched</h3>
              <ProductCard
                productId="RST-6K1MP3QW21"
                tags={[{ text: "TGT", type: "green" }]}
                qcStatus="QC Failed:"
                qcTimestamp="4 days ago, 2:45:33 PM"
                clipStyle="notched"
                colorStrip="red"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Slanted</h3>
              <ProductCard
                productId="JKL-5H9BZ7TV39"
                tags={[{ text: "BBY", type: "blue" }]}
                qcStatus="QC Passed:"
                qcTimestamp="Yesterday, 8:12:47 AM"
                clipStyle="slanted"
                colorStrip="green"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Skewed Card</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-2">Elevated Skewed (-10deg)</h3>
              <ProductCard
                productId="PQR-4F8YX2SC17"
                tags={[
                  { text: "AMZ", type: "yellow" },
                  { text: "P3", type: "gray" }
                ]}
                qcStatus="QC Passed:"
                qcTimestamp="5 days ago, 1:30:10 PM"
                isSkewed={true}
                skewAngle="-10deg"
              />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Flat Skewed (-20deg)</h3>
              <ProductCard
                productId="TOA-8GASMDUDFT"
                tags={[
                  { text: "AMZ", type: "yellow" },
                  { text: "P1", type: "blue" }
                ]}
                qcStatus="QC Passed:"
                qcTimestamp="2 days ago, 3:03:58 PM"
                variant="flat"
                isSkewed={true}
                skewAngle="-20deg"
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">With Product Image</h2>
          <div className="max-w-lg">
            <ProductCard
              productId="GHI-3D7WV1RQ95"
              tags={[{ text: "Special", type: "purple" }]}
              qcStatus="QC Passed:"
              qcTimestamp="1 week ago, 9:20:05 AM"
              productImage="https://via.placeholder.com/150"
              colorStrip="purple"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default ProductCardDemo; 