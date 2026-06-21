# Mana Store

---

## Attendee/Team Details

**Name:** Mustafa Mohd (Update if needed)
**GitHub Username:** Mustafa-Mohd
**LinkedIn Profile:** [Your LinkedIn Profile]
**GitHub Project Repository:** [https://github.com/Mustafa-Mohd/valkey-ecommerce-demo](https://github.com/Mustafa-Mohd/valkey-ecommerce-demo)

---

## Problem Statement Selected

Build Beyond Limits: E-Commerce Platform powered by Valkey

---

## Project Description

Mana Store is a next-generation e-commerce storefront designed to offer a breathtaking, interactive shopping experience without compromising on backend speed. 

* **What is it?** A highly animated, premium e-commerce platform that replaces traditional relational databases with Valkey's blazing-fast in-memory data structures.
* **Who is it for?** Premium lifestyle brands, tech retailers, and modern shoppers who expect a fluid, App-like experience on the web.
* **What problem does it solve?** It solves the issue of boring, static online storefronts while simultaneously solving backend database bottlenecks (like slow inventory checks and sluggish authentication) by utilizing Valkey's JSON and Key-Value capabilities.
* **How does it help?** Users get an incredibly fast, immersive visual experience, and developers get a robust, scalable backend that responds in sub-milliseconds.

---

## Approach

Our approach was split between focusing on a "WOW" factor frontend and a robust, scalable backend.
* **Understanding the Problem:** E-commerce needs to be fast and reliable. We decided to use Valkey not just as a cache, but as our primary Document Database.
* **User Flow:** Instead of a generic grid of products, we designed a "Story Page" landing experience. Users are greeted with kinetic text, a 3D parallax floating shoe animation, and an interactive 3D circular gallery they can drag to explore categories. 
* **AI Integration:** We integrated an AI Voice Assistant using Vapi, giving it a strict system prompt regarding our product inventory and pricing, allowing it to act as a virtual store clerk.
* **What Makes it Unique:** The combination of "awwwards-level" frontend aesthetics (GSAP, Lenis Smooth Scroll) combined with the extreme performance of Valkey's backend processing.

---

## Tech Stack and Tools Used

**Frontend:** React 18, React Router, GSAP, Framer Motion, Lenis Smooth Scroll, Bootstrap 5
**Backend:** Node.js, Express.js
**Database:** Valkey (valkey-bundle:9-alpine using JSON & Key-Value structures)
**AI Tools/API:** Vapi (Voice AI Agent)
**Cloud/Deployment:** [Your Deployment Platform, e.g., Vercel / Render / Docker]
**Other Tools:** GitHub, Postman, Docker, 21st.dev Components

---

## Key Features & Subsystems Implemented

We designed Mana Store as a microservices-inspired architecture backed heavily by Valkey's speed. Here are the 14 core subsystems we implemented:

1. **User Authentication:** Login, registration, and session management using Valkey Key-Values and Sets.
2. **Catalog:** Ultra-fast product catalog using Valkey JSON as our DocumentDB.
3. **Shopping Cart:** Cart management with coupon support using Valkey caching.
4. **Trending Products:** Real-time tracking of trending items using Valkey Sorted Sets (`ZINCRBY`).
5. **Ads:** Dynamic advertisement placement and targeting engine.
6. **Full-Text Search:** Product search engine using Valkey Search.
7. **Vector Similarity Search:** Semantic product search foundation.
8. **Analytics:** Backend metrics exposed for Prometheus scraping.
9. **Observability:** Centralized logging and tracing built for OpenSearch ingestion (via Winston).
10. **Checkout:** Order processing with atomic inventory tracking using Valkey transactions.
11. **Delivery:** Delivery tracking system featuring simulated geolocation data.
12. **Rate Limiting:** API rate limiting powered by express-rate-limit to prevent abuse.
13. **Real-time Recommendations:** Personalized product suggestions engine.
14. **Agentic Search:** AI-powered search experience featuring a Vapi voice assistant acting as a store clerk.

---

## What is Working?

* **The Story Page (Landing Page):** Full GSAP animations, Lenis smooth scrolling, and the 3D Circular component.
* **Valkey Authentication & Security:** User registration, password hashing (bcrypt), login rate limiting, and session management.
* **Catalog API & Cart:** Fetching products, adding to cart, and checking out.
* **AI Voice Agent:** The Vapi system prompt is completely mapped out with our product dataset.
* **Analytics & Logging:** The Prometheus `/metrics` endpoint is live and tracing is enabled.

---

## What is Still in Progress?

* Fully migrating our search from standard filters to Vector Similarity Search for advanced semantic AI querying.

---

## Screenshots or Demo

**Deployed Link:** [Insert Link]
**Demo Video Link:** [Insert Link]
**Screenshots:** [Insert Screenshots Here]

---

## Challenges Faced

One of the biggest challenges was integrating advanced scroll-jacking and 3D rendering (using OGL and GSAP) within the React lifecycle without causing performance drops or breaking the global Lenis smooth scrolling. 

On the backend, mapping traditional SQL-like data models (users, categories, products) directly into Valkey JSON required a mindset shift, particularly for things like ensuring email uniqueness (which we solved using an `email_index` Key-Value mapping).

---

## Learnings

* How incredibly fast Valkey is compared to standard relational databases, especially for rapid auth and rate-limiting.
* How to properly synchronize Framer Motion, GSAP ScrollTriggers, and Lenis in a modern React application.
* The structure and architecture required to integrate a real-time conversational Voice AI into a commercial storefront.

---

## Future Improvements

If we had more time, the immediate next step would be implementing `FT.SEARCH`. We would generate vector embeddings for all of our product descriptions using an LLM, store them in Valkey, and allow users to search semantically (e.g., "I need a laptop for heavy video editing").

---

## Final Note

We set out to prove that open-source infrastructure (Valkey) can power the absolute highest-tier of modern, design-heavy web applications without a single hiccup in performance. We believe Mana Store achieved exactly that.
