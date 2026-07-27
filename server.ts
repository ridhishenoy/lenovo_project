import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    const uploadDir = path.join(process.cwd(), "public", "images", "products");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'prod-' + uniqueSuffix + ext);
  }
});
const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", name: "NexusTech API Server" });
  });

  // --- PRODUCT MANAGEMENT CRUD API ---
  const DATA_FILE = path.join(process.cwd(), "data", "products.json");
  
  const readProducts = () => {
    if (!fs.existsSync(DATA_FILE)) return [];
    try {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    } catch (e) {
      console.error("Error reading products:", e);
      return [];
    }
  };

  const writeProducts = (products: any) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), "utf-8");
  };

  // Get all products
  app.get("/api/products", (_req, res) => {
    res.json(readProducts());
  });

  // Create product
  app.post("/api/products", (req, res) => {
    const products = readProducts();
    const newProduct = { ...req.body, id: `prod-${Date.now()}` };
    products.unshift(newProduct); // Add to beginning
    writeProducts(products);
    res.status(201).json(newProduct);
  });

  // Update product
  app.put("/api/products/:id", (req, res) => {
    const products = readProducts();
    const index = products.findIndex((p: any) => p.id === req.params.id);
    if (index !== -1) {
      products[index] = { ...products[index], ...req.body, id: req.params.id };
      writeProducts(products);
      res.json(products[index]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  // Delete product
  app.delete("/api/products/:id", (req, res) => {
    const products = readProducts();
    const filtered = products.filter((p: any) => p.id !== req.params.id);
    if (filtered.length !== products.length) {
      writeProducts(filtered);
      res.json({ success: true });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  // Image Upload Endpoint
  app.post("/api/upload", upload.array('images', 5), (req, res) => {
    try {
      const files = req.files as Express.Multer.File[];
      const urls = files.map(file => `/images/products/${file.filename}`);
      res.json({ success: true, urls });
    } catch (error: any) {
      res.status(500).json({ error: "Upload failed", message: error.message });
    }
  });

  // --- AUTHENTICATION API ---
  const USERS_FILE = path.join(process.cwd(), "data", "users.json");

  const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) {
      // Initialize with default admin
      const defaultUsers = [{
        id: 'usr-admin-1',
        name: 'System Admin',
        email: 'admin@shenoy.com',
        password: 'admin123', // In a real app, hash this!
        phone: '+91 9876543210',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        addresses: []
      }];
      fs.writeFileSync(USERS_FILE, JSON.stringify(defaultUsers, null, 2), "utf-8");
      return defaultUsers;
    }
    try {
      return JSON.parse(fs.readFileSync(USERS_FILE, "utf-8"));
    } catch (e) {
      return [];
    }
  };

  const writeUsers = (users: any) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
  };

  app.post("/api/auth/login", (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      res.json({ success: true, user: userWithoutPassword });
    } else {
      res.status(401).json({ success: false, error: "Invalid email or password" });
    }
  });

  app.post("/api/auth/signup", (req, res) => {
    const { name, email, password } = req.body;
    const users = readUsers();
    
    if (users.find((u: any) => u.email === email)) {
      return res.status(400).json({ success: false, error: "Email already exists" });
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      password, // In a real app, hash this!
      phone: '',
      role: 'user',
      avatar: 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name) + '&background=random',
      addresses: []
    };

    users.push(newUser);
    writeUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ success: true, user: userWithoutPassword });
  });

  // --- AI ADVISOR API ---
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { userQuery, budget, useCase, preferredBrand } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.json({
          recommendation: `Based on your budget of ${budget ? '$'+budget : 'your specified amount'} for ${useCase || 'general computing'}, we recommend considering high-performance devices with at least 16GB-32GB RAM, Intel Core Ultra or AMD Ryzen 7 processors, and dedicated graphics if gaming/rendering.`,
          suggestedProducts: ['Dell XPS 16 Laptop', 'ASUS ROG Strix G18', 'Nexus Beast Extreme Desktop'],
          keyFeaturesToLookFor: ['At least 1TB PCIe 4.0 NVMe SSD', '100% sRGB/DCI-P3 Display', 'Dedicated Cooling Chamber', 'Wi-Fi 6E/7'],
          aiNote: 'AI Advisor running in fallback mode. Set GEMINI_API_KEY in secrets for custom live AI insights.'
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are NexusTech's expert Computer & Service Advisor AI.
A user is asking for hardware recommendations or tech troubleshooting advice.
User Query: "${userQuery || 'Recommend a computer setup'}"
User Budget: "${budget || 'Any'}"
Intended Workload/Use Case: "${useCase || 'General High Performance'}"
Preferred Brand: "${preferredBrand || 'Any top brand like Dell, Apple, ASUS, Lenovo, HP'}"

Provide a structured, friendly, concise expert response in JSON format with the following keys:
- "advice": string (A warm 2-3 sentence overview explaining what specs fit their exact needs)
- "suggestedSpecs": array of strings (4 key recommended component specifications)
- "topMatchCategory": string (e.g. "Gaming Laptop", "Workstation Desktop", "Ultrabook", "Color Laser Printer")
- "tips": string (A helpful maintenance or buyer tip)`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text;
      let parsedData;
      try {
        parsedData = JSON.parse(text || "{}");
      } catch (e) {
        parsedData = { advice: text };
      }

      return res.json({
        success: true,
        data: parsedData
      });
    } catch (error: any) {
      console.error("AI Advisor error:", error);
      res.status(500).json({
        error: "Failed to generate AI advice",
        message: error.message
      });
    }
  });

  // Vite development middleware vs Static Production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NexusTech Server running at http://localhost:${PORT}`);
  });
}

startServer();
