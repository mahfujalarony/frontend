// 1000 data entries of products for testing and development purposes
import p1 from "./../public/products/p.jpg";
import p3 from "./../public/products/p3.jpg";
import p4 from "./../public/products/p4.jpg";
import p5 from "./../public/products/p5.jpg";
import p6 from "./../public/products/p6.jpg";
import p7 from "./../public/products/p7.jpg";
import p8 from "./../public/products/p8.jpg";
import p9 from "./../public/products/p9.jpg";
import p10 from "./../public/products/p10.jpg";
import p11 from "./../public/products/p11.jpg";
import p12 from "./../public/products/p12.jpg";
import p13 from "./../public/products/p13.jpg";
import p14 from "./../public/products/p14.jpg"
import p15 from "./../public/products/p15.jpg";
import p16 from "./../public/products/p16.jpg";
import p17 from "./../public/products/p17.jpg";
import p18 from "./../public/products/p18.jpg";
import p19 from "./../public/products/p19.jpg";
import p20 from "./../public/products/p20.jpg";
import p21 from "./../public/products/p21.jpg";
import p22 from "./../public/products/p22.jpg";
import p23 from "./../public/products/p23.jpg";
import p24 from "./../public/products/p24.jpg";
import p25 from "./../public/products/p25.jpg";
import p26 from "./../public/products/p26.jpg";
import p27 from "./../public/products/p27.jpg";
import p28 from "./../public/products/p28.jpg";
import p29 from "./../public/products/p29.jpg";
import p30 from "./../public/products/p30.jpg";
import p31 from "./../public/products/p31.jpg";
import p2 from "./../public/products/p2.jpg";




export const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 59.99,
    stock: 150,
    rating: 4.5,
    description: "High-quality wireless headphones with noise cancellation.",
    imageUrl: [
        p1, p10, p17
    ],
  },
    {
    id: 2,
    name: "Smart Fitness Watch",
    category: "Wearables",
    price: 129.99,
    stock: 80,
    rating: 4.2,
    description: "Track your fitness and health metrics with this smart watch.",
    imageUrl: [
        p2, p11, p18
    ],
  },
    {
    id: 3,
    name: "4K Ultra HD TV",
    category: "Electronics",
    price: 799.99,
    stock: 40,
    rating: 4.7,
    description: "Experience stunning visuals with this 55-inch 4K UHD TV.",
    imageUrl: [
        p3, p12, p19
    ],
  },
    {
    id: 4,
    name: "Gaming Laptop",
    category: "Computers",
    price: 1199.99,
    stock: 25,
    rating: 4.6,
    description: "High-performance laptop designed for gaming and heavy tasks.",
    imageUrl: [
        p4, p13, p20
    ],
    },
    {
    id: 5,
    name: "Noise-Cancelling Earbuds",
    category: "Audio",
    price: 89.99,
    stock: 200,
    rating: 4.3,
    description: "Compact earbuds with superior sound quality and noise cancellation.",
    imageUrl: [
        p5, p14, p21
    ],
  },
    {
    id: 6,
    name: "Smart Home Speaker",
    category: "Home Automation",
    price: 49.99,
    stock: 120,
    rating: 4.4,
    description: "Voice-controlled smart speaker for your home.",
    imageUrl: [
        p6, p15, p22
    ],

    },
    {
        id: 7,
        name: "Mechanical Gaming Keyboard",
        category: "Computers",
        price: 89.99,
        stock: 60,
        rating: 4.8,
        description: "Responsive mechanical switches with customizable RGB lighting.",
        imageUrl: [
            p7, p16, p23
        ],
    },
    {
        id: 8,
        name: "Portable Power Bank 20000mAh",
        category: "Accessories",
        price: 39.99,
        stock: 300,
        rating: 4.6,
        description: "Fast charging power bank with high capacity for multiple devices.",
        imageUrl: [
            p8, p24, p25
        ],
    },
    {
        id: 9,
        name: "Ergonomic Office Chair",
        category: "Furniture",
        price: 199.99,
        stock: 35,
        rating: 4.5,
        description: "Comfortable mesh chair designed for long working hours.",
        imageUrl: [
            p9, p26, p27
        ],
    },
    {
        id: 10,
        name: "Action Camera 4K",
        category: "Cameras",
        price: 249.99,
        stock: 50,
        rating: 4.4,
        description: "Waterproof action camera capable of recording 4K video.",
        imageUrl: [
            p10, p28, p29
        ],
    },
    {
        id: 11,
        name: "Wireless Charging Pad",
        category: "Accessories",
        price: 24.99,
        stock: 180,
        rating: 4.2,
        description: "Fast wireless charger compatible with most smartphones.",
        imageUrl: [
            p11, p30, p9
        ],
    },
    {
        id: 12,
        name: "Drone with 1080p Camera",
        category: "Drones",
        price: 149.99,
        stock: 45,
        rating: 4.3,
        description: "Easy-to-fly drone with HD camera and stable flight controls.",
        imageUrl: [
            p12, p31, p10
        ],
    },
    {
        id: 13,
        name: "Smart LED Light Bulb",
        category: "Home Automation",
        price: 14.99,
        stock: 500,
        rating: 4.5,
        description: "Wi-Fi enabled color-changing bulb compatible with voice assistants.",
        imageUrl: [
            p13, p17, p3
        ],
    },
    {
        id: 14,
        name: "Professional DSLR Camera",
        category: "Cameras",
        price: 1499.99,
        stock: 15,
        rating: 4.9,
        description: "High-resolution DSLR camera for professional photography.",
        imageUrl: [
            p14, p12, p11
        ],
    },
    {
        id: 15,
        name: "Electric Toothbrush",
        category: "Personal Care",
        price: 49.99,
        stock: 100,
        rating: 4.7,
        description: "Rechargeable toothbrush with multiple cleaning modes.",
        imageUrl: [
            p15, p7, p3
        ],
    },
    {
        id: 16,
        name: "Running Shoes",
        category: "Footwear",
        price: 79.99,
        stock: 200,
        rating: 4.4,
        description: "Lightweight running shoes with superior arch support.",
        imageUrl: [
            p16, p3, p4
        ],
    },
    {
        id: 17,
        name: "Stainless Steel Water Bottle",
        category: "Kitchen",
        price: 19.99,
        stock: 400,
        rating: 4.8,
        description: "Insulated water bottle that keeps drinks cold for 24 hours.",
        imageUrl: [
            p17, p1, p7
        ],
    },
    {
        id: 18,
        name: "Coffee Maker",
        category: "Kitchen",
        price: 59.99,
        stock: 90,
        rating: 4.3,
        description: "Programmable coffee maker with 12-cup capacity.",
        imageUrl: [
            p18, p3, p4
        ],

    },
    {
        id: 19,
        name: "Yoga Mat",
        category: "Fitness",
        price: 29.99,
        stock: 150,
        rating: 4.6,
        description: "Non-slip yoga mat with extra cushioning for joints.",
        imageUrl: [
            p19, p8, p27
        ],
    },
    {
        id: 20,
        name: "Bluetooth Speaker",
        category: "Audio",
        price: 45.99,
        stock: 110,
        rating: 4.4,
        description: "Portable speaker with deep bass and waterproof design.",
        imageUrl: [
            p20, p7, p8
        ],
    },
];



// flash sale product ids
const flashSaleProductIds = [1, 5, 8, 12, 20, 3, 15, 7];


export const getFlashSaleProducts = () => {
  return products.filter(product => flashSaleProductIds.includes(product.id));
}

