# 🍲 Blolicious – Food Blog Web App

Blolicious is a full-stack food blog application that allows users to register, log in, write blog posts, and explore content from other users. Authentication is handled with access and refresh tokens stored in cookies for secure session management.

---

## 🌐 Live Demo

Coming soon…

---

## 🚀 Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Zustand (Global State)
- Axios (with Interceptors for token refresh)
- React Hot Toast (Notifications)

### Backend
- Django
- Django REST Framework (DRF)
- Simple JWT (for access & refresh tokens)
- CORS Headers

---

## 🔐 Features

- 🔑 User registration and login (JWT-based)
- 📄 Create, edit, and delete blog posts
- 🔍 Browse other users' posts
- 🔄 Automatic access token refresh using interceptors
- 🍪 Secure HTTP-only cookie storage for tokens
- 🧭 Protected routes using a `dashboard` layout
- 🍽️ Responsive UI for food blogging

---

## 🛠️ Getting Started

### 🔧 Backend Setup (Django)

```bash
git clone https://github.com/s0m-a/blog.git
cd somablog
python -m venv env
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Make sure to configure your .env or settings.py:

Set CORS_ALLOWED_ORIGINS to your frontend URL

Set CORS_ALLOW_CREDENTIALS = True

Frontend Setup (Next.js)
cd frontend/blogify
npm install
npm run dev
```

Configure .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api

📁 Project Structure
blolicious-frontend/
│
├── app/
│   ├── dashboard/        # Authenticated user routes
│   ├── auth/             # Login & Register pages
│   └── layout.jsx        # Root layout
│
├── context/
│   └── useUserStore.js   # Zustand store for auth
│
├── components/
│   ├── AuthInterceptor.jsx
│   └── Navbar.jsx
│
├── lib/
│   └── axios.js          # Axios instance with interceptors
│
└── public/

🧪 Authentication Flow
On login, backend sets access_token and refresh_token as cookies.

Axios sends cookies with each request (withCredentials: true).

If a request returns 401, an interceptor automatically calls /refresh/.

New access_token is stored again via HTTP-only cookie.

✨ Upcoming Features
🍴 Post categories (e.g., Vegan, Dessert, etc.)
❤️ Like & Comment on posts
🔎 Search functionality
🌍 Deploy to Vercel & Render

🤝 Contributing
PRs welcome! Feel free to open issues or suggest improvements.











