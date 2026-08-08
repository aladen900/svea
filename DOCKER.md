# Docker Deployment Guide for Svea IPTV

This project includes production-ready Docker configuration featuring a lightweight multi-stage Node.js build.

---

## 🚀 Quick Start with Docker Compose

1. **(Optional) Create a `.env` file** in the project root:
   ```bash
   APP_URL=http://localhost:3000
   ```

2. **Build and start the container**:
   ```bash
   docker compose up -d --build
   ```

3. **Access the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Stop the container**:
   ```bash
   docker compose down
   ```

---

## 🛠️ Building & Running with Docker CLI Directly

1. **Build the image**:
   ```bash
   docker build -t svea-iptv-app .
   ```

2. **Run the container**:
   ```bash
   docker run -d \
     -p 3000:3000 \
     --name svea-iptv-container \
     svea-iptv-app
   ```

3. **View logs**:
   ```bash
   docker logs -f svea-iptv-container
   ```

4. **Stop and remove container**:
   ```bash
   docker stop svea-iptv-container
   docker rm svea-iptv-container
   ```
