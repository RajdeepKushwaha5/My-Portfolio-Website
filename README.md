# 🚀 Rajdeep Singh Kushwaha - Portfolio Website

A modern, responsive, and interactive personal portfolio website showcasing my journey as a Full Stack Web Developer and Blockchain Enthusiast. Built with cutting-edge technologies and featuring smooth animations, an AI-powered chatbot assistant, and a seamless user experience.

## ✨ Features

### 🏠 **Home Section**
- Eye-catching hero section with animated introductions
- Smooth scroll navigation
- Custom animated cursor effects
- Dark/Light theme toggle with system preference detection

### 👨‍💻 **About Section**
- Personal introduction and professional summary
- Profile image with hover effects
- Skills overview and personal interests
- Professional background highlights

### 🛠️ **Projects Section**
- Showcase of 6+ major projects including:
  - **UPCODE** - Comprehensive coding and interview platform
  - **RAG-Visualizer** - Interactive AI visualization tool
  - **EV-Adoption-Forecasting** - Machine learning predictions
  - **Code-Reviewer** - AI-powered code analysis tool
  - **AlgoRude** - Snarky DSA tutor with Gemini API
  - **AgentVerse** - Multi-agent system platform
- Live demo links and source code repositories
- Technology stack tags for each project
- Interactive hover effects and animations

### 🎯 **Skills Section**
- Technical skills with custom SVG icons
- Organized by categories:
  - **Web Development**: React, Node.js, TypeScript, MongoDB
  - **Blockchain**: Solidity, Rust, Ethereum, Solana
  - **Other Technologies**: Python, C++, Git, WebRTC
- Animated skill cards with hover effects

### 💼 **Experience Section**
- Professional internships and achievements
- **Shell-Edunet x AICTE Internship** - AI for Green Skills
- Detailed responsibilities and skills gained
- Achievement highlights and certifications

### 🤖 **AI Chatbot Assistant**
- Meet "Dobby" - Your helpful portfolio assistant
- Powered by Google Generative AI (Gemini)
- Contextual knowledge about my projects and skills
- Harry Potter inspired personality for engaging interactions

### 📱 **Responsive Design**
- Mobile-first approach
- Seamless experience across all devices
- Adaptive layouts and touch-friendly interfaces
- Progressive Web App features

### 🎨 **Interactive Elements**
- Smooth page transitions with Framer Motion
- Custom animations and micro-interactions
- Theme persistence across sessions
- Accessibility-focused design

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library

### **UI/UX**
- **Lucide React** - Beautiful, customizable icons
- **Custom SVG Components** - Hand-crafted icon system
- **Inter & Space Grotesk** - Modern typography
- **Custom Color Palette** - Carefully crafted design system

### **AI Integration**
- **Google Generative AI (@google/genai)** - Chatbot functionality
- **Custom Context System** - Portfolio-aware AI responses

### **Development Tools**
- **ESLint & TypeScript** - Code quality and type safety
- **Custom Vite Configuration** - Optimized build process
- **Environment Variable Management** - Secure API key handling

### **Deployment**
- **Vercel** - Serverless deployment platform
- **GitHub Actions** - Automated CI/CD pipeline
- **Custom Domain** - Professional web presence

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/RajdeepKushwaha5/My-Portfolio-Website.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd My-Portfolio-Website
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # Create a .env file in the root directory
   echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
   ```
   
   > Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 🌐 Deployment

This portfolio is deployed on **Vercel** with automatic deployments from the main branch.

### 🔗 **Live Demo**: [View Portfolio](https://my-portfolio-website-rajdeepkushwaha5s-projects.vercel.app/)

### Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/RajdeepKushwaha5/My-Portfolio-Website)

### Manual Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your preferred hosting platform
3. Set environment variables in your hosting platform

## 📁 Project Structure

```
My-Portfolio-Website/
├── components/
│   ├── icons/              # Custom SVG icon components
│   ├── About.tsx          # About section component
│   ├── AnimatedPet.tsx    # Interactive pet element
│   ├── Chatbot.tsx        # AI chatbot component
│   ├── CustomCursor.tsx   # Custom cursor effects
│   ├── Experience.tsx     # Experience section
│   ├── Footer.tsx         # Footer component
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero landing section
│   ├── Projects.tsx       # Projects showcase
│   └── Skills.tsx         # Skills display
├── hooks/
│   └── useTheme.tsx       # Theme management hook
├── services/
│   └── geminiService.ts   # AI service integration
├── App.tsx                # Main app component
├── index.tsx              # React entry point
├── types.ts               # TypeScript definitions
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Theme Customization
- Modify `tailwind.config` in `index.html`
- Update color palette in CSS custom properties
- Adjust typography in the font configuration

### Adding New Sections
1. Create component in `/components`
2. Import and add to `App.tsx`
3. Update navigation in `Header.tsx`

### Chatbot Customization
- Modify personality in `services/geminiService.ts`
- Update context and knowledge base
- Customize responses and behavior

## 📧 Contact

**Rajdeep Singh Kushwaha**
- **Email**: [rajdeepsingh10789@gmail.com](mailto:rajdeepsingh10789@gmail.com)
- **LinkedIn**: [Rajdeep Singh Kushwaha](https://www.linkedin.com/in/rajdeep-singh-b658a833a/)
- **GitHub**: [@RajdeepKushwaha5](https://github.com/RajdeepKushwaha5)
- **Twitter**: [@rajdeeptwts](https://x.com/rajdeeptwts)
- **Medium**: [@rajdeep01](https://medium.com/@rajdeep01)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Google Generative AI** for powering the chatbot functionality
- **Framer Motion** for beautiful animations
- **Tailwind CSS** for the utility-first CSS framework
- **Vercel** for seamless deployment experience
- **Lucide** for the beautiful icon system

---

⭐ **If you found this portfolio inspiring, please give it a star!** ⭐

**Made with ❤️ by Rajdeep Singh Kushwaha**

