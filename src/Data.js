const categories = [
  {
    id: 1,
    name: "Burgers",
    image: "https://media.istockphoto.com/id/1377372234/vi/anh/pizza-v%E1%BB%9Bi-x%C3%BAc-x%C3%ADch-salami-%E1%BB%9Bt-chu%C3%B4ng-c%C3%A0-chua-v%C3%A0-ph%C3%B4-mai-d%C6%B0a-chua-th%E1%BB%8Bt-x%C3%B4ng-kh%C3%B3i-v%C3%A0-x%C3%BAc-x%C3%ADch-tr%C3%AAn.jpg?s=612x612&w=0&k=20&c=Vdha1tfARNMaH3ra0kh8B_is_Iy5LetN_ZpM9yghZF4=",
    products: [
      {
        id: 101,
        name: "Classic Beef Burger",
        image: "/images/classic-beef-burger.jpg",
        description: "A classic beef patty with lettuce, tomato, and cheese.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [5.99, 7.99, 9.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 102,
        name: "Chicken Burger",
        image: "/images/chicken-burger.jpg",
        description: "Grilled chicken breast with lettuce, tomato, and mayo.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [5.99, 7.99, 9.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 103,
        name: "Veggie Burger",
        image: "/images/veggie-burger.jpg",
        description: "A healthy veggie patty served with fresh vegetables.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [5.99, 7.99, 9.99] // Giá tương ứng với từng kích thước
        }
      },
    ],
  },

  {
    id: 2,
    name: "Pizza",
    image: "https://cdnmedia.baotintuc.vn/Upload/pTMF1jgWpbjY1m8G1xWUsg/files/2020/03/banhmi/banh-mi-2403202%20(5).jpg",
    products: [
      {
        id: 202,
        name: "Pepperoni Pizza",
        image: "/images/pepperoni-pizza.jpg",
        description: "Classic pizza topped with pepperoni and cheese.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [8.99, 10.99, 12.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 203,
        name: "Margherita Pizza",
        image: "/images/margherita-pizza.jpg",
        description: "Pizza with tomatoes, mozzarella, and basil.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [7.99, 9.99, 11.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 204,
        name: "BBQ Chicken Pizza",
        image: "/images/bbq-chicken-pizza.jpg",
        description: "Pizza with BBQ sauce, chicken, and cheese.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [9.99, 11.99, 13.99] // Giá tương ứng với từng kích thước
        }
      },
    ],
  },

  {
    id: 3,
    name: "French Fries",
    image: "https://foodparadise.vn/uploads/Product/LMNC/Khai_vi/KT.png",
    products: [
      {
        id: 301,
        name: "Classic Fries",
        image: "https://foodparadise.vn/uploads/Product/LMNC/Khai_vi/KT.png",
        description: "Golden crispy fries.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [2.99, 3.99, 4.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 302,
        name: "Cheese Fries",
        image: "https://eatgo.vn/wp-content/uploads/2021/08/cach-lam-khoai-tay-chien.jpeg",
        description: "Fries topped with melted cheese.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [3.99, 4.99, 5.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 303,
        name: "Spicy Fries",
        image: "https://mqflavor.com/wp-content/uploads/2020/07/muoi-axit-sodium-pyrophosphate-giup-khoai-tay-co-mau-sac-dep.jpg",
        description: "Fries seasoned with a spicy blend.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [3.49, 4.49, 5.49] // Giá tương ứng với từng kích thước
        }
      },
    ],
  },

  {
    id: 6,
    name: "Burgers",
    image: "https://media.istockphoto.com/id/1377372234/vi/anh/pizza-v%E1%BB%9Bi-x%C3%BAc-x%C3%ADch-salami-%E1%BB%9Bt-chu%C3%B4ng-c%C3%A0-chua-v%C3%A0-ph%C3%B4-mai-d%C6%B0a-chua-th%E1%BB%8Bt-x%C3%B4ng-kh%C3%B3i-v%C3%A0-x%C3%BAc-x%C3%ADch-tr%C3%AAn.jpg?s=612x612&w=0&k=20&c=Vdha1tfARNMaH3ra0kh8B_is_Iy5LetN_ZpM9yghZF4=",
    products: [
      {
        id: 101,
        name: "Classic Beef Burger",
        image: "/images/classic-beef-burger.jpg",
        description: "A classic beef patty with lettuce, tomato, and cheese.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [5.99, 7.99, 9.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 102,
        name: "Chicken Burger",
        image: "/images/chicken-burger.jpg",
        description: "Grilled chicken breast with lettuce, tomato, and mayo.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [5.99, 7.99, 9.99] // Giá tương ứng với từng kích thước
        }
      },
      {
        id: 103,
        name: "Veggie Burger",
        image: "/images/veggie-burger.jpg",
        description: "A healthy veggie patty served with fresh vegetables.",
        attributes: {
          size: ["S", "M", "L"], // Kích thước S, M, L
          price: [5.99, 7.99, 9.99] // Giá tương ứng với từng kích thước
        }
      },
    ],
  },
];

export default categories;
