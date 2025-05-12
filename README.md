# BFHL Data Processor

A React-based web application that processes arrays of strings, separating numbers and alphabets, and identifying the highest alphabetical character. Built for the Bajaj Finserv Health Limited technical assessment.

![BFHL Data Processor](https://i.ibb.co/Q3yJt5s1/Screenshot-2025-02-21-231749.png)

## 🌟 Features

- Process arrays containing both numbers and alphabets  
- Real-time data validation and error handling  
- Interactive JSON input with sample data  
- Filterable response display  
- Responsive design with a modern UI  
- Continuous deployment with Netlify  

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript  
- **Styling**: Tailwind CSS  
- **Icons**: Lucide React  
- **Form Components**: React Select  
- **Build Tool**: Vite  
- **Deployment**: Netlify  

## 🚀 Live Demo

Visit the live application: [BFHL Data Processor](https://resonant-cocada-5761dc.netlify.app/)

## 🏃‍♂️ Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Shreya20004/BFHL_BajajFinserve.git
   ```

2. Install dependencies:
   ```bash
   cd BFHL_BajajFinserve
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📝 API Endpoints

The application interacts with the following API endpoint:

- **POST** `https://bajajfinserv-08kk.onrender.com/bfhl`  
  - Request Body: `{ "data": ["string"] }`  
  - Response: 
    ```ts
    {
      is_success: boolean;
      user_id: string;
      email: string;
      roll_number: string;
      numbers: string[];
      alphabets: string[];
      highest_alphabet: string[];
    }
    ```

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server  
- `npm run build` - Build for production  
- `npm run preview` - Preview production build locally  
- `npm run lint` - Run ESLint  

### Project Structure

```
src/
├── App.tsx           # Main application component
├── main.tsx          # Application entry point
├── types.ts          # TypeScript interfaces and types
├── index.css         # Global styles
└── vite-env.d.ts     # Vite environment types
```

## 🔄 Continuous Deployment

This project is set up with continuous deployment:

1. Every push to the `main` branch triggers a new build  
2. Netlify automatically deploys the updated version  
3. The live site is updated within minutes  

## 📄 License

MIT License - feel free to use this code for your own projects!

## 👤 Author

Shreya  
- GitHub: [@Shreya20004](https://github.com/Shreya20004)
