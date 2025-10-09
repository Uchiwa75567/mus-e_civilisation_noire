# MCN Museum Web Application

## Description
MCN Museum is a modern web application built with Next.js and React, designed to showcase African art, culture, and history through interactive exhibitions, virtual tours, and events. The platform offers visitors an immersive experience with detailed information on artworks, exhibitions, and cultural events, enhanced by QR code interactions and multimedia content.

## Key Features
- Interactive virtual tours with 3D navigation of the museum.
- Detailed exhibition pages featuring African art and cultural heritage.
- Event management and registration for museum activities.
- Online ticketing system with multiple ticket types.
- QR code scanning and verification for artworks and visitor engagement.
- Multilingual audio guides and multimedia support for artworks.
- Contact form and email integration for visitor communication.
- Responsive design with dark/light theme support.

## Technology Stack
- **Framework:** Next.js 15 with React and TypeScript
- **Styling:** Tailwind CSS, Radix UI components
- **3D & Virtual Tours:** Three.js, @react-three/fiber, @react-three/drei
- **State Management:** React hooks and local stores
- **QR Code:** QR code generation and scanning libraries
- **Email:** Nodemailer for sending emails
- **Analytics:** Vercel Analytics
- **Other Libraries:** date-fns, recharts, lucide-react, sonner, and more

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mcn-museum
   ```

2. Install dependencies using pnpm:
   ```bash
   pnpm install
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Usage Guide

- **Home Page:** Overview of featured exhibitions, events, virtual tours, and museum stats.
- **Expositions:** Browse current and upcoming exhibitions with detailed descriptions and multimedia.
- **Evenements:** View and register for museum events and workshops.
- **Billetterie:** Purchase tickets online with different pricing options.
- **Visite Virtuelle:** Explore the museum virtually with interactive 3D maps and guided tours.
- **Scanner:** Use QR code scanner to interact with artworks and access additional content.
- **Contact:** Send messages or inquiries to the museum team via the contact form.

## Project Structure

- `app/` - Main Next.js application pages and API routes.
- `components/` - Reusable React components for UI sections and features.
- `lib/` - Utility functions, types, and mock data.
- `public/` - Static assets including images, audio, and videos.
- `styles/` - Global CSS and Tailwind configuration.
- `hooks/` - Custom React hooks for state and UI behavior.

## API Endpoints Summary

- `/api/expositions` - Fetch exhibitions data.
- `/api/oeuvres` - Fetch artworks data.
- `/api/evenements` - Fetch events data.
- `/api/billets` - Ticketing related endpoints.
- `/api/verify-qr` - QR code verification.
- `/api/send-email` - Contact form email sending.

## Contributing

Contributions are welcome! Please fork the repository and submit pull requests for improvements or bug fixes. Ensure code quality and consistency with existing styles.

## License

This project is private and not publicly licensed.

---

MCN Museum Web Application © 2024
