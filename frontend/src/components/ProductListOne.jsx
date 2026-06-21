import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../helper/CartContext'
import toast from 'react-hot-toast'

const ProductListOne = () => {
    const { addToCart, decrementFromCart, cartItems } = useCart();
    
    const getCartQty = (id) => {
        const item = cartItems.find((i) => i.id === id);
        return item ? item.qty : 0;
    };

    const mockProduct1 = { id: "mock_1", name: "Taylor Farms Broccoli Florets Vegetables", price: { amount: 14.99 }, images: ["assets/images/thumbs/product-img1.png"] };
    const mockProduct2 = { id: "mock_2", name: "Fresh Organic Apples 1kg", price: { amount: 8.99 }, images: ["assets/images/thumbs/product-img2.png"] };
    const mockProduct3 = { id: "mock_3", name: "Whole Wheat Bread Bakery", price: { amount: 4.99 }, images: ["assets/images/thumbs/product-img3.png"] };
    const mockProduct4 = { id: "mock_4", name: "Farm Fresh Eggs 1 Dozen", price: { amount: 6.99 }, images: ["assets/images/thumbs/product-img4.png"] };

    return (
        <div className="product mt-24">
            <div className="container container-lg">
                <div className="row gy-4 g-12">
                    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                        <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                            {getCartQty(mockProduct1.id) > 0 ? (
                                <div className="product-card__cart bg-white flex-align rounded-pill position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 overflow-hidden border border-main-600 shadow-sm" style={{ zIndex: 10 }}>
                                    <button onClick={(e) => { e.preventDefault(); decrementFromCart(mockProduct1.id); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">−</button>
                                    <span className="px-16 fw-bold text-heading">{getCartQty(mockProduct1.id)}</span>
                                    <button onClick={(e) => { e.preventDefault(); addToCart(mockProduct1); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">+</button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => { e.preventDefault(); addToCart(mockProduct1); }}
                                    className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 shadow-sm" style={{ zIndex: 10 }}
                                >
                                    Add <i className="ph ph-shopping-cart" />
                                </button>
                            )}
                            <Link
                                to="/product-details"
                                className="product-card__thumb flex-center"
                            >
                                <img src="assets/images/thumbs/product-img1.png" alt="" />
                            </Link>
                            <div className="product-card__content mt-12">
                                <div className="product-card__price mb-16">
                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        $28.99
                                    </span>
                                    <span className="text-heading text-md fw-semibold ">
                                        $14.99 <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                    </span>
                                </div>
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-600">4.8</span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                        <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-600">(17k)</span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                    <Link to="/product-details" className="link text-line-2">
                                        Taylor Farms Broccoli Florets Vegetables
                                    </Link>
                                </h6>
                                <div className="flex-align gap-4">
                                    <span className="text-main-600 text-md d-flex">
                                        <i className="ph-fill ph-storefront" />
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        By Lucky Supermarket
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <div
                                        className="progress w-100  bg-color-three rounded-pill h-4"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-gray-900 text-xs fw-medium mt-8">
                                        Sold: 18/35
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                        <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                            {getCartQty(mockProduct2.id) > 0 ? (
                                <div className="product-card__cart bg-white flex-align rounded-pill position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 overflow-hidden border border-main-600 shadow-sm" style={{ zIndex: 10 }}>
                                    <button onClick={(e) => { e.preventDefault(); decrementFromCart(mockProduct2.id); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">−</button>
                                    <span className="px-16 fw-bold text-heading">{getCartQty(mockProduct2.id)}</span>
                                    <button onClick={(e) => { e.preventDefault(); addToCart(mockProduct2); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">+</button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => { e.preventDefault(); addToCart(mockProduct2); }}
                                    className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 shadow-sm" style={{ zIndex: 10 }}
                                >
                                    Add <i className="ph ph-shopping-cart" />
                                </button>
                            )}
                            <Link
                                to="/product-details"
                                className="product-card__thumb flex-center"
                            >
                                <img src="assets/images/thumbs/product-img1.png" alt="" />
                            </Link>
                            <div className="product-card__content mt-12">
                                <div className="product-card__price mb-16">
                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        $28.99
                                    </span>
                                    <span className="text-heading text-md fw-semibold ">
                                        $14.99 <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                    </span>
                                </div>
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-600">4.8</span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                        <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-600">(17k)</span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                    <Link to="/product-details" className="link text-line-2">
                                        Taylor Farms Broccoli Florets Vegetables
                                    </Link>
                                </h6>
                                <div className="flex-align gap-4">
                                    <span className="text-main-600 text-md d-flex">
                                        <i className="ph-fill ph-storefront" />
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        By Lucky Supermarket
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <div
                                        className="progress w-100  bg-color-three rounded-pill h-4"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-gray-900 text-xs fw-medium mt-8">
                                        Sold: 18/35
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                        <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                            {getCartQty(mockProduct3.id) > 0 ? (
                                <div className="product-card__cart bg-white flex-align rounded-pill position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 overflow-hidden border border-main-600 shadow-sm" style={{ zIndex: 10 }}>
                                    <button onClick={(e) => { e.preventDefault(); decrementFromCart(mockProduct3.id); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">−</button>
                                    <span className="px-16 fw-bold text-heading">{getCartQty(mockProduct3.id)}</span>
                                    <button onClick={(e) => { e.preventDefault(); addToCart(mockProduct3); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">+</button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => { e.preventDefault(); addToCart(mockProduct3); }}
                                    className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 shadow-sm" style={{ zIndex: 10 }}
                                >
                                    Add <i className="ph ph-shopping-cart" />
                                </button>
                            )}
                            <Link
                                to="/product-details"
                                className="product-card__thumb flex-center"
                            >
                                <img src="assets/images/thumbs/product-img1.png" alt="" />
                            </Link>
                            <div className="product-card__content mt-12">
                                <div className="product-card__price mb-16">
                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        $28.99
                                    </span>
                                    <span className="text-heading text-md fw-semibold ">
                                        $14.99 <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                    </span>
                                </div>
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-600">4.8</span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                        <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-600">(17k)</span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                    <Link to="/product-details" className="link text-line-2">
                                        Taylor Farms Broccoli Florets Vegetables
                                    </Link>
                                </h6>
                                <div className="flex-align gap-4">
                                    <span className="text-main-600 text-md d-flex">
                                        <i className="ph-fill ph-storefront" />
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        By Lucky Supermarket
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <div
                                        className="progress w-100  bg-color-three rounded-pill h-4"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-gray-900 text-xs fw-medium mt-8">
                                        Sold: 18/35
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                        <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                            {getCartQty(mockProduct4.id) > 0 ? (
                                <div className="product-card__cart bg-white flex-align rounded-pill position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 overflow-hidden border border-main-600 shadow-sm" style={{ zIndex: 10 }}>
                                    <button onClick={(e) => { e.preventDefault(); decrementFromCart(mockProduct4.id); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">−</button>
                                    <span className="px-16 fw-bold text-heading">{getCartQty(mockProduct4.id)}</span>
                                    <button onClick={(e) => { e.preventDefault(); addToCart(mockProduct4); }} className="btn bg-main-600 text-white px-12 py-8 fw-bold">+</button>
                                </div>
                            ) : (
                                <button
                                    onClick={(e) => { e.preventDefault(); addToCart(mockProduct4); }}
                                    className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16 shadow-sm" style={{ zIndex: 10 }}
                                >
                                    Add <i className="ph ph-shopping-cart" />
                                </button>
                            )}
                            <Link
                                to="/product-details"
                                className="product-card__thumb flex-center"
                            >
                                <img src="assets/images/thumbs/product-img1.png" alt="" />
                            </Link>
                            <div className="product-card__content mt-12">
                                <div className="product-card__price mb-16">
                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        $28.99
                                    </span>
                                    <span className="text-heading text-md fw-semibold ">
                                        $14.99 <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                    </span>
                                </div>
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-600">4.8</span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                        <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-600">(17k)</span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                    <Link to="/product-details" className="link text-line-2">
                                        Taylor Farms Broccoli Florets Vegetables
                                    </Link>
                                </h6>
                                <div className="flex-align gap-4">
                                    <span className="text-main-600 text-md d-flex">
                                        <i className="ph-fill ph-storefront" />
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        By Lucky Supermarket
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <div
                                        className="progress w-100  bg-color-three rounded-pill h-4"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-gray-900 text-xs fw-medium mt-8">
                                        Sold: 18/35
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                        <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                            <Link
                                to="/cart"
                                className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
                            >
                                Add <i className="ph ph-shopping-cart" />
                            </Link>
                            <Link
                                to="/product-details"
                                className="product-card__thumb flex-center"
                            >
                                <img src="assets/images/thumbs/product-img1.png" alt="" />
                            </Link>
                            <div className="product-card__content mt-12">
                                <div className="product-card__price mb-16">
                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        $28.99
                                    </span>
                                    <span className="text-heading text-md fw-semibold ">
                                        $14.99 <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                    </span>
                                </div>
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-600">4.8</span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                        <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-600">(17k)</span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                    <Link to="/product-details" className="link text-line-2">
                                        Taylor Farms Broccoli Florets Vegetables
                                    </Link>
                                </h6>
                                <div className="flex-align gap-4">
                                    <span className="text-main-600 text-md d-flex">
                                        <i className="ph-fill ph-storefront" />
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        By Lucky Supermarket
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <div
                                        className="progress w-100  bg-color-three rounded-pill h-4"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-gray-900 text-xs fw-medium mt-8">
                                        Sold: 18/35
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
                        <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                            <Link
                                to="/cart"
                                className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 position-absolute inset-block-start-0 inset-inline-end-0 me-16 mt-16"
                            >
                                Add <i className="ph ph-shopping-cart" />
                            </Link>
                            <Link
                                to="/product-details"
                                className="product-card__thumb flex-center"
                            >
                                <img src="assets/images/thumbs/product-img1.png" alt="" />
                            </Link>
                            <div className="product-card__content mt-12">
                                <div className="product-card__price mb-16">
                                    <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                        $28.99
                                    </span>
                                    <span className="text-heading text-md fw-semibold ">
                                        $14.99 <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                                    </span>
                                </div>
                                <div className="flex-align gap-6">
                                    <span className="text-xs fw-bold text-gray-600">4.8</span>
                                    <span className="text-15 fw-bold text-warning-600 d-flex">
                                        <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-xs fw-bold text-gray-600">(17k)</span>
                                </div>
                                <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                    <Link to="/product-details" className="link text-line-2">
                                        Taylor Farms Broccoli Florets Vegetables
                                    </Link>
                                </h6>
                                <div className="flex-align gap-4">
                                    <span className="text-main-600 text-md d-flex">
                                        <i className="ph-fill ph-storefront" />
                                    </span>
                                    <span className="text-gray-500 text-xs">
                                        By Lucky Supermarket
                                    </span>
                                </div>
                                <div className="mt-12">
                                    <div
                                        className="progress w-100  bg-color-three rounded-pill h-4"
                                        role="progressbar"
                                        aria-label="Basic example"
                                        aria-valuenow={35}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    >
                                        <div
                                            className="progress-bar bg-main-600 rounded-pill"
                                            style={{ width: "35%" }}
                                        />
                                    </div>
                                    <span className="text-gray-900 text-xs fw-medium mt-8">
                                        Sold: 18/35
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ProductListOne