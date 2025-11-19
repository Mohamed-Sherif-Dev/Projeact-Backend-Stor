//  1 -  تقسيم مشروع الباك اند  + ال مشروع ده  تكمله علي النته عملته في المشريع السابقه

//  2- يتحتوي مشروع الباك علي 7 فولدرات اساسيه لا غني عنها هنكتبها دلوقتي وهما كا الاتي

//  Model - routes - server and app.js - controller - config - middleware - mongoose

//  REQoust => express  ==> DB MongoDb

//  اول فلدير Routes ==> URL

//  اساس المشروع ال Models ==> Schema ك مثاال ال Password + email

// اضافه الشروط ال هيا ال Function ==> Controller

//  وانا علشان اعمل ريكوست علي المشروع بتاعي واشوف الاساس بتاعو واعملو شروطو ال هو بمعني اصح الوسيط ال بين دول هو ===> middleware

// لو انا عايز استخدم حاجه من بره او عاوز اعرف حاجه ===> config

// .env

// .gitigoner

// DB

// ########################################################################################################################################################

// 1==> الـ config بيجمع كل الإعدادات (زي الـ DB URL، الـ Port، الـ API Keys) في مكان واح
// بيسهل التغيير بدل ما تدور وتعدل في الكود كله.
// •	بيزود الأمان لما تستخدمه مع ملفات .env للبيانات الحساسة.
// •	بينظم الكود ويخليه مرن بين الـ development و الـ

// 2==> الـ Controller هو العقل اللي بيستقبل الـ Request من المستخدم.
// •	بينادي الـ Service أو الـ Model عشان يجيب/يعالج البيانات.
// •	بيرجع Response مناسب للـ Frontend (JSON, HTML, …).
// •	وظيفته ينظم الكود ويفصل بين المنطق (Logic) والـ

// 3==> الـ Database هي المكان اللي بيخزن فيه التطبيق كل البيانات (Users, Products, Orders…).
// •	نوعين أساسيين: Relational (SQL) زي MySQL وPostgreSQL، و Non-Relational (NoSQL) زي MongoDB.
// •	بتخليك تقدر تعمل CRUD Operations (Create, Read, Update, Delete) على البيانات.
// •	مرتبطة بالـ Backend عن طريق ORM أو Drivers (زي Mongoose مع MongoDB أو Sequelize مع SQL

// 4==> الـ Middleware كود بيتنفذ بين الـ Request والـ Response في السيرفر.
// •	بيستخدم للتحقق (Authentication)، تسجيل الـ Logs، أو تعديل البيانات قبل ما توصل للـ Controller.
// •	في Express مثلًا: app.use(middlewareFunction) بتمرر أي طلب عليه.
// •	بيخلي الكود منظم وقابل لإعادة الاستخدام بدل ما تكتب نفس التحقق في كل Route

// 5==> الـ Model هو الطبقة اللي بتمثل شكل البيانات (Users, Posts, Orders) في قاعدة البيانات.
// •	بيحدد الـ Schema أو الـ Structure (زي الاسم، الإيميل، الباسورد).
// •	بيتواصل مع الـ DB عشان ينفذ CRUD Operations بطريقة منظمة.
// •	بيفصل منطق التعامل مع البيانات عن الـ Controller عشان الكود يبقى أنضف

// 6==> لـ Routes بتحدد العناوين (URLs) اللي المستخدم يقدر يوصلها في السيرفر.
// •	كل Route بيربط بين عنوان (مثلاً /login) و الـ Controller المناسب.
// •	بتسهل تنظيم الكود بدل ما تخلي كل حاجة في ملف واحد.
// •	في Express مثلًا: app.get("/users", userController.getAllUsers).

// 7==> الـ Server هو قلب الباك إند اللي بيستقبل الـ Requests من الـ Client.
// 	 •	بيشغل الـ Routes ويربطها مع الـ Controllers والـ DB.
// •	بيسمع على Port معين (زي 3000 أو 5000) عشان يتواصل مع المتصفح

// 8==> ملف .env بيخزن القيم الحساسة زي (DB_URL, API_KEY, JWT_SECRET) بعيد عن الكود.
// •	بيساعد في الأمان عشان ما ترفعش المعلومات دي على GitHub.
// •	بيسهل التغيير بين بيئة development و production من غير ما تعدل الكود.
// •	بتستخدم مكتبات زي dotenv في Node.js

// 9==> ملف .gitignore بيحدد الملفات أو الفولدرات اللي Git ما يرفعهاش على GitHub.
// •	بتحط فيه حاجات زي node_modules/, ملفات .env, أو أي ملفات مؤقتة.
// •	الهدف: تحافظ على الأمان وتخلي المشروع نظيف وخفيف

// 10==> ملف index.js غالبًا هو نقطة البداية (Entry Point) لأي مشروع Node.js.
// •	فيه بتستدعي الـ server, الـ routes, والـ config لأول مرة.
// •	بيمثل “المخ” اللي بيجمع كل الأجزاء (Controllers, Models, Middleware).
// •	في package.json بيتحدد كـ "main": "index.js" عشان يبدأ منه المشروع

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import express from "express";
import dotenv from "dotenv";
import { connrctToDB } from "./DB/mongoose.js";
import authrouter from "./Routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import categoryrouter from "./Routes/category.routes.js";
import productrouter from "./Routes/product.routes.js";
import blogrouter from "./Routes/blog.routes.js";
import contactrouter from "./Routes/contact.routes.js";
import offerrouter from "./Routes/offer.routes.js";
import brandrouter from "./Routes/brand.routes.js";
import wishlistrouter from "./Routes/wishlist.routes.js";
import cartrouter from "./Routes/cart.routes.js";
import orderRouter from "./Routes/order.routes.js";
import paymentRouter from "./Routes/payment.routes.js";




// use packages :
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// use middlewer
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

app.use("/api/auth" ,authrouter)
app.use("/api/category",categoryrouter )
app.use("/api/product", productrouter)
app.use("/api/blog", blogrouter)
app.use("/api/contact", contactrouter)
app.use("/api/offers", offerrouter)
app.use("/api/brand", brandrouter)
app.use('/api/wishlist', wishlistrouter)
app.use('/api/cart' , cartrouter)
app.use("/api/order", orderRouter)
app.use("/api/payment", paymentRouter)













connrctToDB()

app.listen(port, () => {
  console.log(`app is running on Port : ${port}`);
});
