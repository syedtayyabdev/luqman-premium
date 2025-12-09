"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [cartOpen, setCartOpen] = useState(false);

  // Apna WhatsApp number yahan change kar do
  const WA_NUMBER = "923439070892";

  useEffect(() => {
    // GitHub se products load
    fetch("https://raw.githubusercontent.com/syedtayyabdev/luqman-premium/main/data/products.json")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => {
        // Fallback products
        setProducts([
          { id: 1, name: "MacBook Pro M3 Max", price: 3499, img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800", desc: "16\" • 48GB RAM • 1TB SSD" },
          { id: 2, name: "Dell XPS 16", price: 2799, img: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ac?w=800", desc: "Intel i9 • RTX 4070 • 4K OLED" },
          { id: 3, name: "ASUS ROG Zephyrus", price: 2599, img: "https://images.unsplash.com/photo-1611078489935-0e6e2d36e4f9?w=800", desc: "Ryzen 9 • RTX 4080 • 240Hz" },
          { id: 4, name: "Sony WH-1000XM5", price: 399, img: "https://images.unsplash.com/photo-1585298723688-7114c37c6cc8?w=800", desc: "Best Noise Cancellation" },
          { id: 5, name: "AirPods Max", price: 549, img: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=800", desc: "Spatial Audio • Luxury" },
        ]);
      });

    // Load cart
    const saved = localStorage.getItem("luqman_cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const addToCart = (p: any) => {
    const newCart = [...cart, p];
    setCart(newCart);
    localStorage.setItem("luqman_cart", JSON.stringify(newCart));
    alert(p.name + " added!");
  };

  const total = cart.reduce((a, c) => a + c.price, 0).toFixed(2);

  return (
    <>
      {/* Header */}
      <motion.header initial={{ y: -100 }} animate={{ y: 0 }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <h1 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">LUQMAN</h1>
          <button onClick={() => setCartOpen(true)} className="relative">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full w-6 h-6 flex items-center justify-center">{cart.length}</span>}
          </button>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="pt-32 pb-20 text-center">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-bold font-orbitron bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          LUQMAN ENTERPRISE
        </motion.h1>
        <p className="text-2xl mt-6 text-blue-200">Premium Laptops & Headphones in Pakistan</p>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => { setSelected(p); setCartOpen(false); }}
              className="group cursor-pointer"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500 transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <Image src={p.img} alt={p.name} width={800} height={600} className="w-full h-64 object-cover group-hover:scale-110 transition" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.name}</h3>
                  <p className="text-blue-300 text-sm mt-1">{p.desc}</p>
                  <p className="text-3xl font-bold text-orange-400 mt-4">${p.price}</p>
                  <button onClick={(e) => { e.stopPropagation(); addToCart(p); }} className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 py-3 rounded-xl font-bold hover:scale-105 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      {cartOpen && (
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setCartOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="bg-gradient-to-b from-purple-900/90 to-black/90 backdrop-blur-2xl w-full max-w-md p-8">
            <h2 className="text-4xl font-orbitron mb-8">Your Cart</h2>
            {cart.map((item, i) => (
              <div key={i} className="flex gap-4 mb-6 pb-6 border-b border-white/20">
                <Image src={item.img} alt="" width={80} height={80} className="rounded-xl" />
                <div className="flex-1">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-orange-400">${item.price}</p>
                </div>
              </div>
            ))}
            <div className="mt-8">
              <p className="text-3xl font-bold text-right text-orange-400">Total: ${total}</p>
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hello! I want to buy:\n" + cart.map(c => `• ${c.name} - $${c.price}`).join("\n") + `\n\nTotal: $${total}`)}`} target="_blank"
                className="block mt-6 text-center bg-green-500 hover:bg-green-600 py-5 rounded-2xl font-bold text-xl">
                Order on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* WhatsApp Float */}
      <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" className="fixed bottom-8 right-8 bg-green-500 p-5 rounded-full shadow-2xl z-40 hover:scale-110 transition">
        <svg className="w-10 h-10" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.088"/></svg>
      </a>
    </>
  );
  }
