import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", name: "NexusTech API Server" });
  });

  // AI PC Advisor Endpoint using Gemini API
  app.post("/api/ai-advisor", async (req, res) => {
    try {
      const { userQuery, budget, useCase, preferredBrand } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // Smart fallback response if API key is not configured
        return res.json({
          recommendation: `Based on your budget of ${budget ? `$${budget}` : 'your specified amount'} for ${useCase || 'general computing'}, we recommend considering high-performance devices with at least 16GB-32GB RAM, Intel Core Ultra or AMD Ryzen 7 processors, and dedicated graphics if gaming/rendering.`,
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
